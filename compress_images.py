from PIL import Image
import os
from pathlib import Path

renders_path = r"D:\Proyectos IT\Pagina Web\Boulevard Santa Rosa Web\public\renders"

def compress_image(input_path, output_path, max_width=1920, quality=75):
    """Compress image to web-friendly size"""
    img = Image.open(input_path)
    
    # Redimensionar si es muy grande
    if img.width > max_width:
        ratio = max_width / img.width
        new_height = int(img.height * ratio)
        img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
    
    # Guardar con compresion
    img.save(output_path, 'JPEG', quality=quality, optimize=True)
    
    original_size = os.path.getsize(input_path) / (1024 * 1024)
    compressed_size = os.path.getsize(output_path) / (1024 * 1024)
    reduction = ((original_size - compressed_size) / original_size) * 100
    
    print(f"{Path(input_path).name}: {original_size:.2f}MB -> {compressed_size:.2f}MB ({reduction:.1f}% reduccion)")

# Procesar todas las imagenes
for root, dirs, files in os.walk(renders_path):
    for file in files:
        if file.lower().endswith(('.jpg', '.jpeg')):
            input_file = os.path.join(root, file)
            compress_image(input_file, input_file)

print("OK - Todas las imagenes comprimidas")
