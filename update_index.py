import os

news_dir = "src/data/news"
files = [f for f in os.listdir(news_dir) if f.endswith(".ts") and f != "index.ts" and not f.endswith(".bak")]

valid_files = []
for f in sorted(files):
    path = os.path.join(news_dir, f)
    with open(path, 'r', encoding='utf-8') as file:
        if "export const article" in file.read():
            valid_files.append(f[:-3])

with open(os.path.join(news_dir, "index.ts"), "w", encoding='utf-8') as f:
    for i, name in enumerate(valid_files):
        f.write(f"import {{ article as a{i} }} from './{name}';\n")
    
    f.write("\nexport const NEWS_LIST = [\n    ")
    f.write(", ".join([f"a{i}" for i in range(len(valid_files))]))
    f.write("\n].sort((a, b) => b.id - a.id);\n\n")
    f.write("export const NEWS_ARTICLES = NEWS_LIST;\n")
