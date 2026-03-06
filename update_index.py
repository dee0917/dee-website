import os

news_dir = "src/data/news"
files = [f for f in os.listdir(news_dir) if f.endswith(".ts") and f != "index.ts"]
files.sort()

imports = []
exports = []

for i, f in enumerate(files):
    name = f[:-3]
    imports.append(f"import {{ article as a{i} }} from './{name}';")
    exports.append(f"a{i}")

with open(os.path.join(news_dir, "index.ts"), "w") as f:
    f.write("\n".join(imports))
    f.write("\n\nexport const NEWS_LIST = [\n    " + ", ".join(exports) + "\n].sort((a, b) => b.id - a.id);\n")
    f.write("\nexport const NEWS_ARTICLES = NEWS_LIST;\n")
