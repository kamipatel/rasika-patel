from PIL import Image
import os

files = ['001.png', '002.png', '003.png', '004.png', '005.png', '006.png']
for f in files:
    try:
        path = f'./public/projects/herdup/{f}'
        img = Image.open(path).convert("RGBA")
        bbox = img.getbbox()
        
        # let's just inspect some center pixels to find the phone height?
        # actually bounding box of non-transparent is enough if they have transparent padding
        print(f"{f}: size {img.size}, bbox: {bbox}")
    except Exception as e:
        print(e)
