import { insight as heartMethod1 } from './heart-method-1';
import { insight as heartMethod2 } from './heart-method-2';
import { insight as heartMethod3 } from './heart-method-3';
import { insight as anthropicDirect } from './anthropic-direct';
import { insight as nanoBananaGuide } from './nano-banana-guide';
import { insight as parentHero } from './parent-hero';
import { insight as refusalMaster } from './refusal-master';
import { insight as seniorCoach } from './senior-coach';
import { insight as aiNewsReader } from './ai-news-reader';
import { insight as aiMemoryMaster } from './ai-memory-master';
import { insight as leadGenCover } from './lead-gen-cover';
import { insight as travelPlanner } from './travel-planner';
import { insight as meetingMinutes } from './meeting-minutes';
import { insight as stockTrends } from './stock-trends';
import { insight as stockAudit } from './stock-audit';
import { insight as englishCoach } from './english-coach';
import { insight as mealPlanner } from './meal-planner';
import { insight as antiProcrastination } from './anti-procrastination';
import { insight as petTranslator } from './pet-translator';
import { insight as ch0WhatIsAi } from './ch0-what-is-ai';
import { insight as seniorMemoryGuide } from './senior-memory-guide';
import { insight as ch0FirstMessage } from './ch0-first-message';
import { insight as ch0AiTemper } from './ch0-ai-temper';
import { article as ch1AiInstructions } from './ch1-ai-instructions';
import { insight as ch1AiHallucination } from './ch1-ai-hallucination';
import { insight as ch1AiPhysicalization } from './ch1-ai-physicalization';
import { insight as ch3AiSocial } from './ch3-ai-social';
import { insight as ch4AiManager } from './ch4-ai-manager';
import { insight as ch5VPhoneAgent } from './ch5-vphone-agent';
import { insight as ch5WiFiDensePose } from './ch5-wifi-densepose';
import { insight as ch5LogicVerification } from './ch5-logic-verification';
import { insight as ch5MarkdownSovereignty } from './ch5-markdown-sovereignty';
import { insight as ch5MultiAgentSwarms } from './ch5-multi-agent-swarms';
import { insight as ch5SlopDefense } from './ch5-slop-defense';
import { insight as ch1AiMemorySovereignty } from './ch1-ai-memory-sovereignty';
import { insight as ch2WiFiDensePosePrivacy } from './ch2-wifi-densepose-privacy';
import { insight as ch5DeepSeekV4Auto } from './ch5-deepseek-v4-auto';

// ═══════════════════════════════════════════
// Chapter 定義 — 主線任務的學習順序 (僅限 Ch 0-4)
// ═══════════════════════════════════════════
export const CHAPTERS = [
    {
        id: 0, emoji: '🚀', title: '出發準備', subtitle: '認識三大聊天 AI，完成你的第一段對話',
        articleIds: [100, 101, 102],
    },
    {
        id: 1, emoji: '🌱', title: '認識 AI', subtitle: '建立正確心態，讓 AI 成為你的夥伴',
        articleIds: [1, 202, 203],
    },
    {
        id: 2, emoji: '🔧', title: '指令進化', subtitle: '從「隨便說說」進化到「結構化指令」',
        articleIds: [204, 210, 301],
    },
    {
        id: 3, emoji: '🎯', title: '生活實戰', subtitle: '用 AI 解決每個人都會遇到的生活問題',
        articleIds: [303, 308, 310],
    },
    {
        id: 4, emoji: '🏆', title: '進階挑戰', subtitle: '把 AI 用ใน需要更深度思考的場景',
        articleIds: [401, 402, 405],
    },
];

// 主線順序表（僅包含 Ch 0-4）
export const MAIN_QUEST_ORDER: number[] = CHAPTERS.flatMap(c => c.articleIds);

// 戰略演進與其餘支線 IDs (Chapter 5+ 轉化為自由學習庫)
export const SIDE_QUEST_IDS: number[] = [506, 504, 505, 501, 502, 503, 205, 305, 306, 304, 309, 307, 402, 404, 312, 302];

// ═══════════════════════════════════════════
// 文章列表 — 主線 + 支線
// ═══════════════════════════════════════════

// 主線文章（按 Chapter 分配 level 0-4）
const mainQuest = [
    // Chapter 0: 出發準備 (level: 0)
    { ...ch0WhatIsAi, level: 0 },
    { ...seniorMemoryGuide, level: 0 },
    { ...ch0FirstMessage, level: 0 },
    { ...ch0AiTemper, level: 0 },
    // Chapter 1: 認識 AI (level: 1)
    { ...ch1AiInstructions, level: 1 },
    { ...heartMethod2, level: 1 },
    { ...heartMethod3, level: 1 },
    // Chapter 2: 指令進化 (level: 2)
    { ...ch1AiHallucination, level: 2 },
    { ...anthropicDirect, level: 2 },
    { ...nanoBananaGuide, level: 2 },
    // Chapter 3: 生活實戰 (level: 3)
    { ...ch3AiSocial, level: 3 },
    { ...mealPlanner, level: 3 },
    { ...antiProcrastination, level: 3 },
    // Chapter 4: 進階挑戰 (level: 4)
    { ...aiNewsReader, level: 4 },
    { ...aiMemoryMaster, level: 4 },
    { ...englishCoach, level: 4 },
    { ...ch4AiManager, level: 4 },
];

// 自由學習庫 (level: -1 = 戰略演進與支線)
const sideQuests = [
    { ...ch5DeepSeekV4Auto, level: -1, category: "戰略演進" },
    { ...ch1AiMemorySovereignty, level: -1, category: "戰略演進" },
    { ...ch2WiFiDensePosePrivacy, level: -1, category: "戰略演進" },
    { ...ch5VPhoneAgent, level: -1, category: "戰略演進" },
    { ...ch5LogicVerification, level: -1, category: "戰略演進" },
    { ...ch5WiFiDensePose, level: -1, category: "戰略演進" },
    { ...ch5MarkdownSovereignty, level: -1, category: "戰略演進" },
    { ...ch5MultiAgentSwarms, level: -1, category: "戰略演進" },
    { ...ch5SlopDefense, level: -1, category: "戰略演進" },
    { ...ch1AiPhysicalization, level: -1 },
    { ...travelPlanner, level: -1 },
    { ...meetingMinutes, level: -1 },
    { ...parentHero, level: -1 },
    { ...petTranslator, level: -1 },
    { ...leadGenCover, level: -1 },
    { ...stockAudit, level: -1 },
    { ...stockTrends, level: -1 },
    { ...seniorCoach, level: -1 },
    { ...refusalMaster, level: -1 },
];

// 全部文章（主線在前，支線在後）
export const INSIGHTS_LIST = [...mainQuest, ...sideQuests].filter(i => i && i.id);
