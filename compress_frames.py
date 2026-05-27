from PIL import Image
import os

folder = "public/sequence"
files = [f for f in os.listdir(folder) if f.endswith(".webp")]
total = len(files)

for idx, fname in enumerate(sorted(files), 1):
    path = os.path.join(folder, fname)
    img = Image.open(path)
    img = img.resize((1280, 720), Image.LANCZOS)
    img.save(path, "webp", quality=60, method=6)
    print(f"[{idx}/{total}] Compressed {fname}")

print("\n✅ Done! All frames compressed.")