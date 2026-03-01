import { insight as heartMethod1 } from './heart-method-1';
import { insight as heartMethod2 } from './heart-method-2';
import { insight as heartMethod3 } from './heart-method-3';
import { insight as anthropicDirect } from './anthropic-direct';
import { insight as nanoBananaGuide } from './nano-banana-guide';
import { insight as parentHero } from './parent-hero';
import { insight as refusalMaster } from './refusal-master';
import { insight as seniorCoach } from './senior-coach';
import { insight as aiNewsReader } from './ai-news-reader';
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
import { insight as ch0FirstMessage } from './ch0-first-message';
import { insight as ch1AiPhysicalization } from './ch1-ai-physicalization';

// ═══════════════════════════════════════════
// 🏛️ 核心基礎課程 (Ch. 0 - 4)：結構固定，嚴格審核
// ═══════════════════════════════════════════
export const CHAPTERS = [
    {
        id: 0, emoji: '🚀', title: '啟航入口', subtitle: '從 0 到 1 建立對話，註冊與首則訊息',
        articleIds: [100, 101],
    },
    {
        id: 1, emoji: '🧠', title: '心法重塑', subtitle: '別再把 AI 當搜尋引擎，掌握夥伴思維',
        articleIds: [201, 202, 203],
    },
    {
        id: 2, emoji: '🔧', title: '指令進化', subtitle: '從隨便說說到結構化指令的專業跨越',
        articleIds: [204, 301, 302],
    },
    {
        id: 3, emoji: '🎯', title: '生活實戰', subtitle: '解決每日煩瑣任務，效率提升 500%',
        articleIds: [308, 310, 305, 306],
    },
    {
        id: 4, emoji: '🏆', title: '職涯躍遷', subtitle: '將 AI 深度嵌入工作流，成為數位經理人',
        articleIds: [403, 401],
    },
    // ═══════════════════════════════════════════
    // 🔗 戰略演進庫 (Ch. 5+)：無限延伸，與世界同步進化
    // ═══════════════════════════════════════════
    {
        id: 5, emoji: '🪐', title: '戰略演進庫', subtitle: '由蒼穹代理人每日獵取之全球最新教學',
        articleIds: [205],
    },
];

// 主線順序表
export const MAIN_QUEST_ORDER: number[] = CHAPTERS.flatMap(c => c.articleIds);

// 支線任務 IDs (保留供兼容性使用)
export const SIDE_QUEST_IDS: number[] = [304, 303, 309, 307, 402, 404];

// ═══════════════════════════════════════════
// 文章列表 — 主線 + 支線
// ═══════════════════════════════════════════

// 主線文章
const mainQuest = [
    { ...ch0WhatIsAi, level: 0 },
    { ...ch0FirstMessage, level: 0 },
    { ...heartMethod1, level: 1 },
    { ...heartMethod2, level: 1 },
    { ...heartMethod3, level: 1 },
    { ...anthropicDirect, level: 2 },
    { ...nanoBananaGuide, level: 2 },
    { ...refusalMaster, level: 2 },
    { ...mealPlanner, level: 3 },
    { ...antiProcrastination, level: 3 },
    { ...travelPlanner, level: 3 },
    { ...meetingMinutes, level: 3 },
    { ...englishCoach, level: 4 },
    { ...aiNewsReader, level: 4 },
    { ...ch1AiPhysicalization, level: 5, id: 205 },
];

// 支線文章
const sideQuests = [
    { ...parentHero, level: -1 },
    { ...seniorCoach, level: -1 },
    { ...petTranslator, level: -1 },
    { ...leadGenCover, level: -1 },
    { ...stockAudit, level: -1 },
    { ...stockTrends, level: -1 },
];

export const INSIGHTS_LIST = [...mainQuest, ...sideQuests];
