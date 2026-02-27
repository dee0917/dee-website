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

// 導出所有已改寫的 4.0 豪華版文章 (共 18 篇)
export const INSIGHTS_LIST = [
    { ...heartMethod1, level: 1 },
    { ...heartMethod2, level: 1 },
    { ...heartMethod3, level: 1 },
    { ...parentHero, level: 1 },
    { ...anthropicDirect, level: 2 },
    { ...nanoBananaGuide, level: 2 },
    { ...refusalMaster, level: 2 },
    { ...seniorCoach, level: 2 },
    { ...travelPlanner, level: 2 },
    { ...meetingMinutes, level: 2 },
    { ...englishCoach, level: 2 },
    { ...mealPlanner, level: 2 },
    { ...petTranslator, level: 2 },
    { ...antiProcrastination, level: 2 },
    { ...aiNewsReader, level: 3 },
    { ...leadGenCover, level: 3 },
    { ...stockTrends, level: 3 },
    { ...stockAudit, level: 3 }
];
