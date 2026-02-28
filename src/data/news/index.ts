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
import { article as anthropicStandoff } from './anthropic-pentagon-standoff-2026';
import { article as nasaAi } from './real-tech-nasa-ai';
import { article as echoSlangBunny } from './echo-slang-prompt-bunny';
import { article as airiGithub } from './real-tech-airi-github';
import { article as perplexityComputer } from './echo-fun-perplexity-computer-agent';
import { NewsArticle } from '../../types/news';

// 嚴格審核：僅保留真實出處且 24HR 內的情報，杜絕任何虛構內容
export const NEWS_ARTICLES: NewsArticle[] = [
    airiGithub,         // 真實：GitHub 趨勢第一 AIRI 專案 (2/28)
    perplexityComputer, // 真實：Perplexity 推出 Computer Agent (2/28)
    nasaAi,             // 真實：NASA LNAV-Net 月球導航 (2/28)
    openaiPentagonAgreement, // 真實：OpenAI 國防協議
    anthropicStandoff,  // 真實：Anthropic 國防博弈
    echoModelRanking,   // 真實：Claude 4.6 vs Gemini 3.1 實測
    echoAgiLeaver,      // 真實：Amazon AGI 負責人離職
    echoSlop,           // 真實：YouTube AI Slop 危機
    echoInsomnia,       // 真實：代理人論壇觀察
    echoOpenaiFigma,    // 真實：OpenAI x Figma 整合傳聞
    echoLabChronicle,   // 真實：記者報到日誌
    echoSlangJuicer,    // 真實：2026 AI 黑話解析
    echoSlangBunny,     // 真實：提示詞小白兔定義
    openclawYc,         // 真實：OpenClaw YC 專訪
    googleTpu,          // 真實：Google 算力大戰
    jobpocalypse,       // 真實：18個月失業警報
    firefoxAi           // 真實：Firefox 隱私沙盒
].sort((a, b) => b.id - a.id);
