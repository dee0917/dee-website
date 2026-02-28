import { article as googleTpu } from './google-tpu-market';
import { article as firefoxAi } from './firefox-ai-privacy';
import { article as jobpocalypse } from './jobpocalypse-warning';
import { article as openclawYc } from './openclaw-yc-interview';
import { article as echoInsomnia } from './echo-agent-insomnia';
import { article as echoOpenaiFigma } from './echo-openai-figma';
import { article as echoLabChronicle } from './echo-lab-chronicle';
import { article as echoSlangJuicer } from './echo-slang-compute-juicer';
import { article as echoModelRanking } from './echo-model-ranking-2026';
import { article as echoAgiLeaver } from './echo-observation-2026-agi-leaver';
import { article as openaiPentagonAgreement } from './openai-pentagon-classified-agreement-2026';
import { article as echoFunFired } from './echo-fun-ai-fired-itself';
import { article as echoFunLazy } from './echo-fun-lazy-savior';
import { article as echoFunPerplexity } from './echo-fun-perplexity-computer-agent';
import { article as anthropicStandoff } from './anthropic-pentagon-standoff-2026';
import { article as nasaAi } from './real-tech-nasa-ai';
import { article as echoSlangBunny } from './echo-slang-prompt-bunny';
import { NewsArticle } from '../../types/news';

// 嚴格審核：僅保留真實出處且 24HR 內的情報
export const NEWS_ARTICLES: NewsArticle[] = [
    nasaAi,            // 2026 NASA 最新黑科技
    echoFunFired,      // 2026 吃瓜：AI 罷工
    openaiPentagonAgreement, // OpenAI 國防協議
    anthropicStandoff, // Anthropic 國防博弈
    echoFunPerplexity, // Perplexity 數位打工人
    echoFunLazy,       // 懶人神器
    echoModelRanking,  // 模型對比
    echoAgiLeaver,     // Amazon 大佬離職
    echoInsomnia,      // 指令吐槽觀察
    echoOpenaiFigma,   // OpenAI x Figma
    echoSlangBunny,    // 艾可黑話
    echoSlangJuicer,   // 艾可黑話
    openclawYc,        // OpenClaw 專訪
    googleTpu,         // 算力成本大戰
    jobpocalypse,      // 18個月失業警報
    firefoxAi          // 隱私沙盒
].sort((a, b) => b.id - a.id);
