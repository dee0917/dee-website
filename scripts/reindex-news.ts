import fs from 'fs';
import path from 'path';

const newsDir = 'src/data/news';
const files = fs.readdirSync(newsDir)
    .filter(f => f.endsWith('.ts') && f !== 'index.ts');

const imports: string[] = [];
const variables: string[] = [];

files.forEach((file, index) => {
    const name = file.replace('.ts', '');
    imports.push(`import { article as a${index} } from './${name}';`);
    variables.push(`a${index}`);
});

const content = `${imports.join('\n')}

export const NEWS_LIST = [
    ${variables.join(', ')}
].sort((a, b) => b.id - a.id);

export const NEWS_ARTICLES = NEWS_LIST;
`;

fs.writeFileSync(path.join(newsDir, 'index.ts'), content);
console.log('index.ts updated with ' + files.length + ' articles.');
