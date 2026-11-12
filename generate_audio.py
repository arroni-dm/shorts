import asyncio
import edge_tts
import numpy as np
import wave
import os

TEXT = (
    "3 Mind-blowing science facts about our universe. Prepare to question reality. "
    "Fact 01: Time Dilation. Time moves slower where gravity is strongest. "
    "Your feet literally age slower than your head. "
    "Fact 02: Quantum Entanglement. Two particles can instantly communicate across the entire universe, defying the speed of light. "
    "Fact 03: Neutron Stars. A teaspoon of a neutron star weighs 6 billion tons—equal to Mount Everest. "
    "Subscribe for more science! New facts every day."
)

VOICE = "en-US-ChristopherNeural"

async def generate_voiceover():
    os.makedirs("public", exist_ok=True)
    communicate = edge_tts.Communicate(TEXT, VOICE)
    await communicate.save("public/voiceover.mp3")
    print("Voiceover generated successfully.")

def generate_bg_music():
    # Generate 30 seconds of ambient synth chord (sine waves with reverb-like harmonics) at 44100 Hz
    duration = 30.0
    sample_rate = 44100
    t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)
    
    # Frequencies for a deep space ambient chord (C minor / F minor pad)
    f1 = 130.81 # C3
    f2 = 196.00 # G3
    f3 = 261.63 # C4
    f4 = 311.13 # Eb4
    
    # Generate warm pad sound with slow modulation
    audio = (
        0.2 * np.sin(2 * np.pi * f1 * t) +
        0.15 * np.sin(2 * np.pi * f2 * t + np.sin(t * 0.5)) +
        0.15 * np.sin(2 * np.pi * f3 * t) +
        0.1 * np.sin(2 * np.pi * f4 * t + np.cos(t * 0.3))
    )
    
    # Apply fade in and fade out
    fade_samples = int(sample_rate * 2.0)
    audio[:fade_samples] *= np.linspace(0, 1, fade_samples)
    audio[-fade_samples:] *= np.linspace(1, 0, fade_samples)
    
    # Normalize to 16-bit PCM
    audio = np.int16(audio / np.max(np.abs(audio)) * 32767)
    
    wav_path = "public/bg-music.wav"
    mp3_path = "public/bg-music.mp3"
    
    with wave.open(wav_path, 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        wf.writeframes(audio.tobytes())
        
    # Convert wav to mp3 using ffmpeg if available, or keep wav/copy
    os.system(f"ffmpeg -y -i {wav_path} -codec:a libmp3lame -b:a 128k {mp3_path}")
    if os.path.exists(wav_path):
        os.remove(wav_path)
    print("Background music generated successfully.")

if __name__ == "__main__":
    asyncio.run(generate_voiceover())
    generate_bg_music()
