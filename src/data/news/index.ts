import { article as googleTpu } from './google-tpu-market';
import { article as firefoxAi } from './firefox-ai-privacy';
import { article as jobpocalypse } from './jobpocalypse-warning';
import { article as openclawYc } from './openclaw-yc-interview';
import { article as echoInsomnia } from './echo-agent-insomnia';
import { article as echoOpenaiFigma } from './echo-openai-figma';
import { article as echoLabChronicle } from './echo-lab-chronicle';
import { article as echoModelRanking } from './echo-model-ranking-2026';
import { article as echoAgiLeaver } from './echo-observation-2026-agi-leaver';
import { article as echoSlangBunny } from './echo-slang-prompt-bunny';
import { article as echoSlangJuicer } from './echo-slang-compute-juicer';
import { article as openaiPentagon } from './openai-pentagon-classified-agreement-2026';
import { article as echoFunFired } from './echo-fun-ai-fired-itself';
import { article as echoFunCat } from './echo-fun-cat-translation';
import { article as echoFunLazy } from './echo-fun-lazy-savior';
import { article as anthropicStandoff } from './anthropic-pentagon-standoff-2026';
import { article as echoPerplexityComputer } from './echo-fun-perplexity-computer-agent';
import { NewsArticle } from '../../types/news';

// 優先展示有趣、具備引流力的新聞 (Fun Ones First)
export const NEWS_ARTICLES: NewsArticle[] = [
    anthropicStandoff,     // 吃瓜特報 (Hot!)
    echoPerplexityComputer, // 腦洞大開 (New!)
    echoFunFired,      // 吃瓜特報
    echoFunCat,        // 腦洞大開
    echoFunLazy,       // 懶人神器
    echoSlangBunny,    // 艾可黑話
    echoSlangJuicer,   // 艾可黑話
    openaiPentagon,    // 產業脈動
    echoModelRanking,  // 產業脈動
    echoAgiLeaver,     // 職場轉型
    echoInsomnia,      // 實戰應用
    echoOpenaiFigma,   // 產業脈動
    openclawYc,        // 產業脈動
    googleTpu,         // 產業脈動
    jobpocalypse,      // 職場轉型
    firefoxAi          // 安全防禦
];
