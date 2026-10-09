import glob

menu_html = """        <!-- Botón Menú Móvil -->
        <div class="menu-toggle" id="mobile-menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
        <nav class="center-nav">"""

archivos_html = glob.glob('*.html')

for archivo in archivos_html:
    with open(archivo, 'r', encoding='utf-8') as f:
        contenido = f.read()
        
    # Solo inyecta si el archivo tiene el nav central y aún no tiene el menú móvil
    if 'id="mobile-menu"' not in contenido and '<nav class="center-nav">' in contenido:
        nuevo_contenido = contenido.replace('<nav class="center-nav">', menu_html)
        with open(archivo, 'w', encoding='utf-8') as f:
            f.write(nuevo_contenido)
        print(f"✅ Menú inyectado con éxito en: {archivo}")
    else:
        print(f"⚡ Omitido (ya actualizado o sin nav): {archivo}")
