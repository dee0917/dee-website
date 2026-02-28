import { article as googleTpu } from './google-tpu-market';
import { article as firefoxAi } from './firefox-ai-privacy';
import { article as jobpocalypse } from './jobpocalypse-warning';
import { article as openclawYc } from './openclaw-yc-interview';
import { article as echoInsomnia } from './echo-agent-insomnia';
import { article as echoOpenaiFigma } from './echo-openai-figma';
import { article as echoLabChronicle } from './echo-lab-chronicle';
import { NewsArticle } from '../../types/news';

export const NEWS_ARTICLES: NewsArticle[] = [
    echoLabChronicle,
    echoInsomnia,
    echoOpenaiFigma,
    openclawYc,
    googleTpu,
    jobpocalypse,
    firefoxAi
];
