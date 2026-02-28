import { article as googleTpu } from './google-tpu-market';
import { article as firefoxAi } from './firefox-ai-privacy';
import { article as jobpocalypse } from './jobpocalypse-warning';
import { article as openclawYc } from './openclaw-yc-interview';
import { article as echoInsomnia } from './echo-agent-insomnia';
import { article as echoOpenaiFigma } from './echo-openai-figma';
import { article as echoLabChronicle } from './echo-lab-chronicle';
import { article as echoSlangJuicer } from './echo-slang-compute-juicer';
import { article as echoSlop } from './echo-ai-slop-kids-insult-2026';
import { article as echoModelRanking } from './echo-model-ranking-2026';
import { article as echoAgiLeaver } from './echo-observation-2026-agi-leaver';
import { article as openaiPentagonAgreement } from './openai-pentagon-classified-agreement-2026';
import { NewsArticle } from '../../types/news';

// 杜絕重複，僅保留各事件最新、最詳盡的版本
export const NEWS_ARTICLES: NewsArticle[] = [
    openaiPentagonAgreement, // 整合了 OpenAI 與五角大廈協議的最新詳情
    echoModelRanking,          // 模型實測對比
    echoAgiLeaver,            // Amazon AGI 負責人離職
    echoSlop,                 // YouTube Slop 觀察
    echoInsomnia,             // AI 深夜吐槽
    echoOpenaiFigma,          // OpenAI x Figma
    openclawYc,               // OpenClaw YC 專訪
    googleTpu,                // Google TPU 算力
    jobpocalypse,             // 18個月失業預警
    firefoxAi                 // Firefox 隱私沙盒
];
