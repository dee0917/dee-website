import axios from 'axios';
import fs from 'fs';
import path from 'path';

// GitHub 趨勢監控腳本 - 模組 A 核心
// 負責監控熱門開源專案並自動觸發艾可撰稿

const GITHUB_API = 'https://api.github.com/search/repositories';
const TARGET_DIR = '/root/.openclaw/workspace/projects/dee-website/src/data/news';

async function monitorGitHubTrending() {
    console.log('--- 艾可 GitHub 監控啟動 ---');
    try {
        const response = await axios.get(GITHUB_API, {
            params: {
                q: 'created:>2026-02-25 stars:>500',
                sort: 'stars',
                order: 'desc'
            },
            headers: {
                'User-Agent': 'OpenClaw-Echo-Monitor'
            }
        });

        const topRepo = response.data.items[0];
        if (!topRepo) return;

        const slug = `github-trending-${topRepo.name.toLowerCase()}`;
        const filePath = path.join(TARGET_DIR, `${slug}.ts`);

        if (fs.existsSync(filePath)) {
            console.log(`情報 ${topRepo.name} 已存在，跳過。`);
            return;
        }

        console.log(`偵測到新爆款專案: ${topRepo.full_name}, 星數: ${topRepo.stargazers_count}`);
        
        // 這裡會觸發 OpenClaw 的 agentTurn 來執行撰稿邏輯
        // 腳本會輸出一個信號供主程序捕捉
        console.log(`SIGNAL:NEW_REPO_DETECTED:${topRepo.full_name}`);

    } catch (error: any) {
        console.error('監控失敗:', error.message);
    }
}

monitorGitHubTrending();
