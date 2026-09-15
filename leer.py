import json
import re

with open('textos_viejos.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

for p in data:
    title = p['title']['rendered']
    # Limpiar las etiquetas HTML del texto
    content = re.sub('<[^<]+?>', '', p['content']['rendered'])
    
    print(f'\n--- {title} ---')
    print(f'{content[:300]}...\n')
