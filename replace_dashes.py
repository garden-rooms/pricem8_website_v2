import json

file_path = 'src/data/blogPosts.json'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_content = content.replace('—', '-')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Replaced em dashes with hyphens.")
