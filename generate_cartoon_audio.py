import asyncio
import edge_tts
import numpy as np
import wave
import os

TEXT = (
    "Midnight in the birthday room. A giant chocolate cake. "
    "Wait... what's that in the cake?! Ahhh! A ghost mouse! Quick, into the gift box! "
    "And... surprise!"
)

VOICE = "en-US-ChristopherNeural"

async def generate_voiceover():
    os.makedirs("public", exist_ok=True)
    communicate = edge_tts.Communicate(TEXT, VOICE, rate="+10%")
    await communicate.save("public/cartoon-voiceover.mp3")
    print("Cartoon voiceover generated successfully.")

def generate_spooky_music():
    duration = 20.0
    sample_rate = 44100
    t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)
    
    # Spooky mysterious chime / synth notes (minor scale)
    f1 = 220.0  # A3
    f2 = 233.0  # Bb3 (spooky semitone)
    f3 = 329.63 # E4
    
    audio = (
        0.2 * np.sin(2 * np.pi * f1 * t) * (np.sin(t * 3) > 0) +
        0.15 * np.sin(2 * np.pi * f2 * t) * (np.cos(t * 2) > 0) +
        0.1 * np.sin(2 * np.pi * f3 * t)
    )
    
    fade_samples = int(sample_rate * 1.0)
    audio[:fade_samples] *= np.linspace(0, 1, fade_samples)
    audio[-fade_samples:] *= np.linspace(1, 0, fade_samples)
    
    audio = np.int16(audio / (np.max(np.abs(audio)) + 1e-5) * 32767)
    
    wav_path = "public/spooky-music.wav"
    mp3_path = "public/spooky-music.mp3"
    
    with wave.open(wav_path, 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        wf.writeframes(audio.tobytes())
        
    os.system(f"ffmpeg -y -i {wav_path} -codec:a libmp3lame -b:a 128k {mp3_path}")
    if os.path.exists(wav_path):
        os.remove(wav_path)
    print("Spooky music generated successfully.")

if __name__ == "__main__":
    asyncio.run(generate_voiceover())
    generate_spooky_music()
