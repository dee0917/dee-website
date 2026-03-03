import { article as wifiVision } from './real-tech-wifi-densepose-vision';
import { article as agencyAgents } from './echo-agency-agents-tide';
import { article as appleRevolut } from './real-tech-apple-revolut-infrastructure';
import { article as echoPentagonWar } from './echo-pentagon-war-department';
import { article as echoJuicerV2 } from './echo-slang-compute-juicer-v2';
import { article as geminiLiveOverlay } from './real-tech-google-gemini-live-overlay';
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
import { article as deepseekV4Distill } from './real-tech-deepseek-v4-distill';
import { article as deepseekV4Intent } from './real-tech-deepseek-v4-intent';
import { article as aiPhilosopher } from './echo-observation-ai-philosopher';
import { article as aiSlopSurvival } from './real-tech-ai-slop-survival';
import { NewsArticle } from '../../types/news';

export const NEWS_ARTICLES: NewsArticle[] = [
    wifiVision, agencyAgents, appleRevolut, echoPentagonWar, 
    echoJuicerV2, geminiLiveOverlay, deepseekV4Distill, echoLabChronicle, 
    aiSlopSurvival, aiPhilosopher, deepseekV4Intent, claudeCoworkVM, 
    openclawTopsReact, anthropicTrumpConflict, googleTranslateGemini, 
    deepseekV4, claudeCodeMemory, tutorialAiri, realTechWiFi, 
    echoDareBench, newbieDailyHacks, echoAiHumanity, echoAgentGossip, 
    echoFunAiGame, arxivAiTrading, newbieAISearch, githubRuflo, 
    deepseekLogicV3, githubWiFiDensePose, githubVPhone, githubAIRI, 
    githubOpenFang, arxivSeeThrough3D, manusAiMeta, gitNexusTool, 
    echoFunPerplexity, airiGithub, nasaAi, openaiPentagonAgreement, 
    anthropicStandoff, metaAmdDeal, metaLegislative, echoModelRanking, 
    echoAgiLeaver, echoSlop, echoInsomnia, echoOpenaiFigma, 
    openclawYc, googleTpu, jobpocalypse, echoSlangJuicer, 
    echoSlangBunny, firefoxAi, airiSoul
].sort((a, b) => b.id - a.id);
