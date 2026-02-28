import { article as googleTpu } from './google-tpu-market';
import { article as firefoxAi } from './firefox-ai-privacy';
import { article as jobpocalypse } from './jobpocalypse-warning';
import { article as openclawYc } from './openclaw-yc-interview';
import { article as echoInsomnia } from './echo-agent-insomnia';
import { article as echoOpenaiFigma } from './echo-openai-figma';
import { article as echoLabChronicle } from './echo-lab-chronicle';
import { article as claudeRelease } from './claude-3-7-release';
import { article as echoSlangBunny } from './echo-slang-prompt-bunny';
import { NewsArticle } from '../../types/news';

export const NEWS_ARTICLES: NewsArticle[] = [
    echoSlangBunny,
    claudeRelease,
    echoLabChronicle,
    echoInsomnia,
    echoOpenaiFigma,
    openclawYc,
    googleTpu,
    jobpocalypse,
    firefoxAi
];
