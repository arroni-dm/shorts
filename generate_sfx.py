import numpy as np
import wave
import os

def generate_sfx():
    os.makedirs("public", exist_ok=True)
    
    sample_rate = 44100
    
    # 1. Whoosh (Filtered noise sweep)
    duration_whoosh = 0.25
    t_whoosh = np.linspace(0, duration_whoosh, int(sample_rate * duration_whoosh))
    noise = np.random.uniform(-1, 1, len(t_whoosh))
    # Simple volume envelope
    envelope_whoosh = np.sin(np.pi * t_whoosh / duration_whoosh)
    whoosh = noise * envelope_whoosh * 0.3
    
    with wave.open("public/sfx-whoosh.wav", "w") as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(sample_rate)
        f.writeframes((whoosh * 32767).astype(np.int16).tobytes())
        
    # 2. Pop (Warm sine pop)
    duration_pop = 0.15
    t_pop = np.linspace(0, duration_pop, int(sample_rate * duration_pop))
    freq = 440
    # Pitch drop for "pop" feel
    freq_sweep = freq * (1 + 0.5 * np.exp(-t_pop * 40))
    sine = np.sin(2 * np.pi * freq_sweep * t_pop)
    envelope_pop = np.exp(-t_pop * 30)
    pop = sine * envelope_pop * 0.5
    
    with wave.open("public/sfx-pop.wav", "w") as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(sample_rate)
        f.writeframes((pop * 32767).astype(np.int16).tobytes())

    print("SFX files generated successfully.")

if __name__ == "__main__":
    generate_sfx()
