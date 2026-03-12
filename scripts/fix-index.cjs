const fs = require('fs');
const path = require('path');

const newsDir = path.join(__dirname, '../src/data/news');
const indexPath = path.join(newsDir, 'index.ts');

if (!fs.existsSync(newsDir)) {
    console.error("News directory not found:", newsDir);
    process.exit(1);
}

const files = fs.readdirSync(newsDir)
    .filter(f => f.endsWith('.ts') && f !== 'index.ts' && !f.includes('.bak'))
    .sort();

const imports = files.map((f, i) => `import { article as a${i} } from './${f.replace('.ts', '')}';`).join('\n');
const articles = files.map((_, i) => `a${i}`).join(', ');

const content = `${imports}\n\nexport const NEWS_LIST = [\n    ${articles}\n].sort((a, b) => b.id - a.id);\n\nexport const NEWS_ARTICLES = NEWS_LIST;\n`;

fs.writeFileSync(indexPath, content);
console.log('Successfully reindexed ' + files.length + ' news articles at ' + indexPath);
