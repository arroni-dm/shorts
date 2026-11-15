import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import {
  downloadWhisperModel,
  installWhisperCpp,
  transcribe,
  toCaptions,
} from '@remotion/install-whisper-cpp';
import { serializeSrt } from '@remotion/captions';

// টার্মিনাল থেকে অডিওর নাম নেবে, না দিলে ডিফল্ট 'iranvsusa.wav' ধরবে
const audioFileName = process.argv[2] || 'iranvsusa.wav';
const baseName = path.parse(audioFileName).name;

const whisperPath = path.join(process.cwd(), 'whisper.cpp');
const rawAudioPath = path.join(process.cwd(), 'public', audioFileName);
const temp16kPath = path.join(process.cwd(), 'public', `${baseName}-16k.wav`);
const outputSrtPath = path.join(process.cwd(), 'public', `${baseName}.srt`);

if (!fs.existsSync(rawAudioPath)) {
  console.error(`❌ ফাইল পাওয়া যায়নি: ${rawAudioPath}`);
  process.exit(1);
}

// ১. Whisper.cpp ইনস্টল ও মডেল ডাউনলোড (শুধু প্রথমবার সময় নেবে)
console.log('⏳ Whisper চেক ও সেটআপ হচ্ছে...');
await installWhisperCpp({ to: whisperPath, version: '1.5.5' });
await downloadWhisperModel({ model: 'medium', folder: whisperPath });

// ২. অডিওকে Whisper-এর উপযোগী 16kHz WAV-এ কনভার্ট করা
console.log('🔄 অডিও 16kHz ফরম্যাটে কনভার্ট হচ্ছে...');
execSync(`npx remotion ffmpeg -i "${rawAudioPath}" -ar 16000 -ac 1 "${temp16kPath}" -y`, {
  stdio: 'ignore',
});

// ৩. বাংলা ভয়েস ট্রান্সক্রাইব করা
console.log('🎙️ ভয়েস থেকে বাংলা সাবটাইটেল তৈরি হচ্ছে...');
const whisperCppOutput = await transcribe({
  model: 'medium',
  whisperPath,
  whisperCppVersion: '1.5.5',
  inputPath: temp16kPath,
  tokenLevelTimestamps: true,
  language: 'bn',
});

// ৪. .srt ফাইল সেভ ও টেম্পোরারি ফাইল ডিলিট করা
const { captions } = toCaptions({ whisperCppOutput });
const srtContent = serializeSrt({ lines: [captions] });

fs.writeFileSync(outputSrtPath, srtContent, 'utf-8');
fs.unlinkSync(temp16kPath); // অপ্রয়োজনীয় 16k ফাইল মুছে ফেলবে

console.log(`✅ সফলভাবে তৈরি হয়েছে: public/${baseName}.srt`);