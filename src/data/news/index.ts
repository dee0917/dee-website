import { article as googleTpu } from './google-tpu-market';
import { article as firefoxAi } from './firefox-ai-privacy';
import { article as jobpocalypse } from './jobpocalypse-warning';
import { article as openclawYc } from './openclaw-yc-interview';
import { article as echoInsomnia } from './echo-agent-insomnia';
import { article as echoOpenaiFigma } from './echo-openai-figma';
import { article as echoLabChronicle } from './echo-lab-chronicle';
import { article as echoSlangJuicer } from './echo-slang-compute-juicer';
import { article as anthropicStandoff } from './anthropic-pentagon-standoff-2026';
import { article as echoModelRanking } from './echo-model-ranking-2026';
import { article as openaiAgreement } from './openai-pentagon-classified-agreement-2026';
import { article as echoAgiLeaver } from './echo-observation-2026-agi-leaver';
import { article as echoSlangBunny } from './echo-slang-prompt-bunny';
import { NewsArticle } from '../../types/news';

export const NEWS_ARTICLES: NewsArticle[] = [
    openaiAgreement,
    anthropicStandoff,
    echoModelRanking,
    echoAgiLeaver,
    echoInsomnia,
    echoOpenaiFigma,
    echoLabChronicle,
    echoSlangJuicer,
    echoSlangBunny,
    openclawYc,
    googleTpu,
    jobpocalypse,
    firefoxAi
].sort((a, b) => b.id - a.id);
