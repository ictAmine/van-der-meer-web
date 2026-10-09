import glob
import re

archivos_html = glob.glob('*.html')

def optimizar_img(match):
    img_tag = match.group(0)
    # Ignorar el logo y las imágenes hero (fetchpriority="high")
    if 'logo.svg' in img_tag or 'fetchpriority="high"' in img_tag:
        return img_tag
    
    # Inyectar lazy loading si no existe
    if 'loading="lazy"' not in img_tag:
        img_tag = img_tag.replace('<img ', '<img loading="lazy" ')
        
    # Inyectar decoding async si no existe
    if 'decoding="async"' not in img_tag:
        img_tag = img_tag.replace('<img ', '<img decoding="async" ')
        
    return img_tag

for archivo in archivos_html:
    with open(archivo, 'r', encoding='utf-8') as f:
        contenido = f.read()

    # Buscar todas las etiquetas <img> y aplicar la función
    nuevo_contenido = re.sub(r'<img\s+[^>]+>', optimizar_img, contenido)

    with open(archivo, 'w', encoding='utf-8') as f:
        f.write(nuevo_contenido)
        
    print(f"🚀 Imágenes optimizadas con éxito en: {archivo}")
