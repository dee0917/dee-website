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
import { article as echoFunPerplexity } from './echo-fun-perplexity-computer-agent';
import { article as anthropicStandoff } from './anthropic-pentagon-standoff-2026';
import { article as nasaAi } from './real-tech-nasa-ai';
import { article as echoSlangBunny } from './echo-slang-prompt-bunny';
import { article as airiGithub } from './real-tech-airi-github';
import { article as airiSoul } from './real-tech-airi-soul';
import { article as metaLegislative } from './real-tech-meta-legislative-spend';
import { article as metaAmdDeal } from './real-tech-meta-amd-deal';
import { article as gitNexusTool } from './echo-fun-gitnexus-tool';
import { NewsArticle } from '../../types/news';

// 優先展示有趣、具備引流力的新聞 (Fun Ones First)
export const NEWS_ARTICLES: NewsArticle[] = [
    metaAmdDeal,       // 吃瓜特報 (Meta x AMD)
    airiSoul,          // 吃瓜特報 (AIRI Soul)
    gitNexusTool,      // 懶人神器 (GitNexus)
    metaLegislative,   // 政策法規 (Meta 立法)
    airiGithub,        // 腦洞大開
    nasaAi,            // 腦洞大開
    openaiPentagonAgreement, // 產業脈動
    anthropicStandoff, // 安全防禦
    echoFunPerplexity, // 實戰應用
    echoModelRanking,  // 產業脈動
    echoAgiLeaver,     // 職場轉型
    echoSlop,          // 產業脈動
    echoInsomnia,      // 實戰應用
    echoOpenaiFigma,   // 產業脈動
    openclawYc,        // 產業脈動
    googleTpu,         // 產業脈動
    jobpocalypse,      // 職場轉型
    echoSlangJuicer,   // 產業脈動
    echoSlangBunny,    // 產業脈動
    firefoxAi          // 安全防禦
].sort((a, b) => b.id - a.id);
