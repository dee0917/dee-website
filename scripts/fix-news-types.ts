import fs from 'fs';
import path from 'path';

const newsDir = 'src/data/news';
const files = fs.readdirSync(newsDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

const categoryMap: Record<string, string> = {
  '技術主權': '產業脈動',
  '監管風暴': '政策法規',
  '全球通識': '實戰應用',
  '數位補課': '實戰應用',
  '私有大腦': '懶人神器',
  '深度觀察': '產業脈動',
  '戰略與觀察': '產業脈動',
  '產業巨頭': '產業脈動',
  '生意興隆': '吃瓜特報',
  '數位家教': '實戰應用'
};

const trendMap: Record<string, string> = {
  '治理轉型': '文明重塑',
  '內容革命': '文明重塑'
};

const dimensionMap: Record<string, string> = {
  '技術主權': '算力物權',
  '創意主權': '生命具現'
};

const colorMap: Record<string, string> = {
  'red': 'rose',
  'pink': 'rose'
};

files.forEach(file => {
  const filePath = path.join(newsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Fix Categories
  Object.keys(categoryMap).forEach(key => {
    content = content.replace(new RegExp(`category: "${key}"`, 'g'), `category: "${categoryMap[key]}"`);
  });

  // Fix Trends
  Object.keys(trendMap).forEach(key => {
    content = content.replace(new RegExp(`trend_cluster: "${key}"`, 'g'), `trend_cluster: "${trendMap[key]}"`);
  });

  // Fix Dimensions
  Object.keys(dimensionMap).forEach(key => {
    content = content.replace(new RegExp(`trinity_dimension: "${key}"`, 'g'), `trinity_dimension: "${dimensionMap[key]}"`);
  });

  // Fix Colors
  Object.keys(colorMap).forEach(key => {
    content = content.replace(new RegExp(`themeColor: "${key}"`, 'g'), `themeColor: "${colorMap[key]}"`);
  });

  // Fix Authors (Aether -> Echo)
  content = content.replace(/author: "Aether - Evolution Engine"/g, 'author: "Echo"');

  // Remove difficulty (both string and number)
  content = content.replace(/\s*difficulty: .*,?/g, '');

  // Remove target_persona (handles array-like syntax as well)
  content = content.replace(/\s*target_persona: \[.*\],?/g, '');
  content = content.replace(/\s*target_persona: ".*",?/g, '');

  // Specific fix for 202603120700-real-tech-openai-codex-legal-california.ts
  if (file === '202603120700-real-tech-openai-codex-legal-california.ts') {
    content = content.replace(/trinity_dimension: "技術主權"/, 'trinity_dimension: "算力物權"');
    content = content.replace(/trend_cluster: "監管風暴"/, 'trend_cluster: "政策法規"');
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${file}`);
  }
});
