import glob
import re

archivos_html = glob.glob('*.html')

for archivo in archivos_html:
    with open(archivo, 'r', encoding='utf-8') as f:
        contenido = f.read()

    # 1. Eliminar el HTML/CSS/JS basura que teníamos repetido abajo en cada página
    contenido = re.sub(r'<!-- SISTEMA.*?-->\s*', '', contenido, flags=re.IGNORECASE)
    contenido = re.sub(r'<style>\s*#pro-lightbox.*?</style>\s*', '', contenido, flags=re.DOTALL)
    contenido = re.sub(r'<div id="pro-lightbox">.*?</div>\s*', '', contenido, flags=re.DOTALL)
    contenido = re.sub(r'<script>.*?pro-lightbox.*?</script>\s*', '', contenido, flags=re.DOTALL)

    # 2. Inyectar el enlace a main.js para que todas las páginas tengan "cerebro"
    if '<script src="main.js"></script>' not in contenido:
        contenido = contenido.replace('</body>', '    <script src="main.js"></script>\n</body>')

    with open(archivo, 'w', encoding='utf-8') as f:
        f.write(contenido)
        
    print(f"✅ Limpiado y conectado: {archivo}")
