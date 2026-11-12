import asyncio
import edge_tts
import os
import wave
import contextlib

TEXT = (
    "ElevenLabs-কে বিদায় জানান! "
    "এখন আর সাবস্ক্রিপশনের জন্য টাকা খরচ না করেই এআই ব্যবহার করে ভয়েস ক্লোন, ভিডিও ডাবিং এবং অডিওবুক তৈরি করতে পারবেন। "
    "আর হ্যাঁ, পুরো সিস্টেমটি আপনার নিজের ডিভাইসেই লোকালি চালানো যায়। "
    "এটির নাম ভয়েস স্টুডিও। এটি একটি ওপেন সোর্স এআই টুল। "
    "সবচেয়ে আকর্ষণীয় বিষয়গুলো হলো— এটি ব্যবহার করার জন্য আলাদা ডেডিকেটেড জিপিইউ থাকা বাধ্যতামূলক নয়, সিপিইউ দিয়েও চালানো যায়। "
    "তবে সিপিইউ-তে প্রসেসিং হতে তুলনামূলক বেশি সময় লাগবে। "
    "এটি সম্পূর্ণ ফ্রি এবং ওপেন সোর্স। এর লাইসেন্স হলো এজিপিএল থ্রি পয়েন্ট জিরো। "
    "গিটহাব রিপোজিটরির লিংক কমেন্টে দেওয়া হয়েছে।"
)

VOICE = "bn-BD-PradeepNeural"

async def generate_voiceover():
    os.makedirs("public", exist_ok=True)
    communicate = edge_tts.Communicate(TEXT, VOICE, rate="+5%")
    output_path = "public/voicestudio-voice.mp3"
    await communicate.save(output_path)
    
    # Get duration using ffprobe or wave if converted, or mutagen/pydub/etc.
    # We can use ffmpeg to get duration or inspect file size/duration.
    print(f"Voiceover generated successfully at {output_path}.")

if __name__ == "__main__":
    asyncio.run(generate_voiceover())
