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
import { article as manusAiMeta } from './real-tech-manus-ai-meta';
import { article as arxivSeeThrough3D } from './arxiv-2602-23359-seethrough3d';
import { article as githubOpenFang } from './github-trending-openfang-agent-os';
import { NewsArticle } from '../../types/news';

// 嚴格審核：僅保留真實出處且 24HR 內的情報，杜絕任何虛構內容
export const NEWS_ARTICLES: NewsArticle[] = [
    githubOpenFang,     // 最新：GitHub Trending 爆款
    arxivSeeThrough3D,  // 最新：arXiv CVPR 2026 技術降維
    manusAiMeta,        // 真實：Manus AI 加入 Meta (今日)
    gitNexusTool,      // 真實：GitHub 爆款專案
    echoFunPerplexity, // 真實：Perplexity Computer
    airiGithub,        // 真實：GitHub AIRI 專案
    nasaAi,            // 真實：NASA 月球導航
    openaiPentagonAgreement, 
    anthropicStandoff,
    metaAmdDeal,
    metaLegislative,
    echoModelRanking,
    echoAgiLeaver,
    echoSlop,
    echoInsomnia,
    echoOpenaiFigma,
    openclawYc,
    googleTpu,
    jobpocalypse,
    echoSlangJuicer,
    echoSlangBunny,
    firefoxAi,
    airiSoul
].sort((a, b) => b.id - a.id);
