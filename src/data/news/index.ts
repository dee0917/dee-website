import { article as echoAiHumanity } from './echo-ai-humanity-test';
import { article as claudeCodeMemory } from './real-tech-claude-code-memory';
import { article as echoAgentGossip } from './echo-agent-gossip-discontinuity';
import { article as newbieDailyHacks } from './newbie-ai-daily-hacks';
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
import { article as githubAIRI } from './github-trending-airi-digital-life';
import { article as githubVPhone } from './github-trending-vphone-cli';
import { article as githubWiFiDensePose } from './github-trending-wifi-densepose';
import { article as githubMarkItDown } from './github-trending-markitdown';
import { article as githubRuflo } from './github-trending-ruflo';
import { article as newbieAISearch } from './newbie-ai-search';
import { article as deepseekLogicV3 } from './real-tech-deepseek-logic-v3';
import { article as arxivAiTrading } from './arxiv-ai-trading-multi-agent';
import { article as echoFunAiGame } from './echo-fun-ai-game-playing';
import { article as echoDareBench } from './echo-dare-bench-audit';
import { article as realTechWiFi } from './real-tech-wifi-densepose';
import { article as tutorialAiri } from './tutorial-airi-minecraft-parent';
import { article as deepseekV4 } from './real-tech-deepseek-v4';
import { article as openclawTopsReact } from './real-tech-openclaw-tops-react';
import { article as claudeCoworkVM } from './real-tech-claude-cowork-vm';
import { article as anthropicTrumpConflict } from './real-tech-anthropic-trump-conflict';
import { article as googleTranslateGemini } from './real-tech-google-translate-gemini';
import { article as deepseekV4Intent } from './real-tech-deepseek-v4-intent';
import { article as aiPhilosopher } from './echo-observation-ai-philosopher';
import { NewsArticle } from '../../types/news';

// 嚴格審核：僅保留真實出處且 24HR 內的情報，杜絕任何虛構內容
export const NEWS_ARTICLES: NewsArticle[] = [
    aiPhilosopher,       // 最新：AI 哲學家 (新增)
    deepseekV4Intent,    // 最新：DeepSeek 意圖捕捉 (新增)
    claudeCoworkVM,      // 最新：Claude VM 事件 (新增)
    openclawTopsReact,   // 最新：OpenClaw 登頂 (新增)
    anthropicTrumpConflict, // 最新：川普與 Anthropic (新增)
    googleTranslateGemini,  // 最新：Google 翻譯進化 (新增)
    deepseekV4,          // 最新：DeepSeek V4 首發 (新增)
    claudeCodeMemory,    // 真實：Claude Code 自動記憶 (新增)
    tutorialAiri,       // 最新：家長 AI 指南
    realTechWiFi,       // 最新：WiFi 感知突破
    echoDareBench,      // 最新：Agent 效能審計
    newbieDailyHacks,   // 最新：小白日常玩法
    echoAiHumanity,     // 最新：人性純度測試
    echoAgentGossip,    // 最新：代理人論壇爆料
    echoFunAiGame,      // arXiv: 記憶體回收演算法
    arxivAiTrading,     // arXiv: AI 操盤手進化
    newbieAISearch,     // 最新：小白搜尋指南
    githubRuflo,        // 最新：多代理編排引擎
    deepseekLogicV3,    // 最新：DeepSeek 邏輯驗證
    githubWiFiDensePose, // 最新：WiFi 感知突破
    githubVPhone,       // 最新：iOS 虛擬化突破
    githubAIRI,         // 最新：數位生命專案
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
