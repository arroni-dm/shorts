import asyncio
import edge_tts
import os

TEXT = (
    "ইন্টারনেট আপনাকে তথ্য দিতে পারে, কিন্তু বই আপনাকে প্রজ্ঞা দেয়। "
    "গুগলে সার্চ দিয়ে তিন মিনিটে একটা বিষয় জেনে নেওয়া, আর একটা বইয়ের তিনশো পৃষ্ঠা পড়ে গভীর জ্ঞান অর্জন করার মধ্যে বিশাল পার্থক্য রয়েছে। "
    "স্কিমিং বা তথ্য সংগ্রহের যুগে আমাদের গভীরে যাওয়ার অভ্যাস ক্রমশ কমে যাচ্ছে। "
    "মনস্তাত্ত্বিক বিকাশ এবং চিন্তার পরিধি বাড়াতে, ইন্টারনেটের রিলস বা শর্টসের চেয়ে বই পড়ার অভ্যাস বহুগুণ এগিয়ে। "
    "তাই আজ থেকেই প্রতিদিন অন্তত দশ পৃষ্ঠা বই পড়ার অভ্যাস শুরু করুন।"
)

VOICE = "bn-BD-PradeepNeural"

async def generate_voiceover():
    os.makedirs("public", exist_ok=True)
    communicate = edge_tts.Communicate(TEXT, VOICE, rate="-3%")
    await communicate.save("public/book-wisdom-voice.mp3")
    print("Book wisdom voiceover generated successfully.")

if __name__ == "__main__":
    asyncio.run(generate_voiceover())
