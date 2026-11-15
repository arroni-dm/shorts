import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';

// .env ফাইল থেকে API Keys পড়া
if (fs.existsSync('.env')) {
  const envLines = fs.readFileSync('.env', 'utf-8').split('\n');
  for (const line of envLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...vals] = trimmed.split('=');
    if (key) {
      process.env[key.trim()] = vals.join('=').trim();
    }
  }
}

const SB_PUBLIC = process.env.STORYBLOCKS_PUBLIC_KEY;
const SB_PRIVATE = process.env.STORYBLOCKS_PRIVATE_KEY;
const PIXABAY_KEY = process.env.PIXABAY_API_KEY;
const COVERR_KEY = process.env.COVERR_API_KEY;

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('ব্যবহারবিধি: node fetch-clips.mjs "tanker.mp4:oil tanker" "hero.mp4:[sb] missile launch"');
  process.exit(0);
}

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

// Storyblocks API v2 (HMAC-SHA256 Authentication)
function signStoryblocks(resource) {
  const expires = Math.floor(Date.now() / 1000) + 300;
  const hmac = crypto.createHmac('sha256', SB_PRIVATE + expires);
  hmac.update(resource);
  return { expires, hmac: hmac.digest('hex') };
}

async function fetchFromStoryblocks(query) {
  if (!SB_PUBLIC || !SB_PRIVATE) return null;

  const searchResource = '/api/v2/videos/search';
  const auth = signStoryblocks(searchResource);
  const searchUrl = `https://api.storyblocks.com${searchResource}?APIKEY=${encodeURIComponent(SB_PUBLIC)}&EXPIRES=${auth.expires}&HMAC=${auth.hmac}&keywords=${encodeURIComponent(query)}&num_results=3&project_id=shorts&user_id=roni`;

  const res = await fetch(searchUrl);
  if (!res.ok) {
    console.warn(`⚠️ Storyblocks Search Error (${res.status})`);
    return null;
  }

  const data = await res.json();
  if (!data.results || data.results.length === 0) return null;

  const videoId = data.results[0].id;
  const dlResource = `/api/v2/videos/stock-item/download/${videoId}`;
  const dlAuth = signStoryblocks(dlResource);
  const dlUrl = `https://api.storyblocks.com${dlResource}?APIKEY=${encodeURIComponent(SB_PUBLIC)}&EXPIRES=${dlAuth.expires}&HMAC=${dlAuth.hmac}&project_id=shorts&user_id=roni`;

  const dlRes = await fetch(dlUrl);
  if (!dlRes.ok) {
    console.warn(`⚠️ Storyblocks Download Limit/Error (${dlRes.status})`);
    return null;
  }

  const dlData = await dlRes.json();
  const mp4Url = dlData.MP4?.['1080p'] || dlData.MP4?.['720p'] || dlData.MOV?.['1080p'];
  if (!mp4Url) return null;

  return { url: mp4Url, source: 'Storyblocks', info: '1080p' };
}

async function fetchFromCoverr(query) {
  if (!COVERR_KEY) return null;
  const url = `https://api.coverr.co/videos?query=${encodeURIComponent(query)}&page_size=3&urls=true`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${COVERR_KEY}` },
  });
  if (!res.ok) return null;

  const data = await res.json();
  if (!data.hits || data.hits.length === 0) return null;

  const hit = data.hits[0];
  const videoUrl = hit.urls?.mp4_download || hit.urls?.mp4 || hit.urls?.mp4_preview;
  if (!videoUrl) return null;

  return { url: videoUrl, source: 'Coverr', info: `${hit.width || 'HD'}x${hit.height || ''}` };
}

async function fetchFromPixabay(query) {
  if (!PIXABAY_KEY) return null;
  const url = `https://pixabay.com/api/videos/?key=${encodeURIComponent(PIXABAY_KEY)}&q=${encodeURIComponent(query)}&per_page=3`;
  const res = await fetch(url);
  if (!res.ok) return null;

  const data = await res.json();
  if (!data.hits || data.hits.length === 0) return null;

  const videos = data.hits[0].videos;
  const chosen = videos.medium || videos.large || videos.small || videos.tiny;
  if (!chosen || !chosen.url) return null;

  return { url: chosen.url, source: 'Pixabay', info: `${chosen.width}x${chosen.height}` };
}

async function downloadClip(fileName, query) {
  console.log(`🔍 খুঁজছি: "${query}" -> public/${fileName}`);

  let result = null;
  if (query.toLowerCase().startsWith('[sb]')) {
    const cleanQuery = query.replace(/\[sb\]/i, '').trim();
    result = (await fetchFromStoryblocks(cleanQuery)) || (await fetchFromCoverr(cleanQuery)) || (await fetchFromPixabay(cleanQuery));
  } else {
    result = (await fetchFromCoverr(query)) || (await fetchFromPixabay(query));
  }

  if (!result) {
    console.warn(`⚠️ "${query}" এর জন্য কোথাও ভিডিও পাওয়া যায়নি।`);
    return;
  }

  const videoRes = await fetch(result.url);
  const destPath = path.join(publicDir, fileName);
  await pipeline(videoRes.body, fs.createWriteStream(destPath));
  console.log(`✅ [${result.source}] সেভ হয়েছে: public/${fileName} (${result.info})`);
}

for (const arg of args) {
  const [fileName, ...queryParts] = arg.split(':');
  const query = queryParts.join(':').trim();
  if (fileName && query) {
    await downloadClip(fileName.trim(), query);
  }
}