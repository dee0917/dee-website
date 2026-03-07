import os
import re

news_dir = "src/data/news"
index_file = os.path.join(news_dir, "index.ts")

files = [f for f in os.listdir(news_dir) if f.endswith(".ts") and f != "index.ts"]
files.sort()

imports = []
articles = []

for i, filename in enumerate(files):
    var_name = f"a{i}"
    module_name = filename[:-3]
    imports.append(f"import {{ article as {var_name} }} from './{module_name}';")
    articles.append(var_name)

content = "\n".join(imports) + "\n\n"
content += "export const NEWS_LIST = [\n    " + ", ".join(articles) + "\n].sort((a, b) => b.id - a.id);\n\n"
content += "export const NEWS_ARTICLES = NEWS_LIST;\n"

with open(index_file, "w") as f:
    f.write(content)

print(f"Successfully reindexed {len(files)} articles.")
