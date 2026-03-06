import os
import re

news_dir = "src/data/news"
index_file = os.path.join(news_dir, "index.ts")

files = [f for f in os.listdir(news_dir) if f.endswith(".ts") and f != "index.ts"]
imports = []
articles = []

def camel_case(s):
    parts = s.split('-')
    return parts[0] + ''.join(word.capitalize() for word in parts[1:])

# Map file slugs to meaningful variable names (fallback to camelCase)
# Based on existing index.ts patterns
name_map = {
    "news-senior-chat-ai-comparison": "seniorChatAi",
    "real-tech-openai-operator-merchant": "openaiOperatorMerchant",
    "real-tech-ai-skill-management-sop": "aiSkillSop",
    "tutorial-khoj-ai-second-brain": "khojBrain",
    "real-tech-deepseek-v4-intent-blackhole": "deepseekV4IntentBlackhole",
    "tutorial-senior-voice-line": "seniorVoice",
    "tutorial-parent-ai-tutor": "parentTutor",
    "real-tech-code-refactor-trap": "refactorTrap",
    "echo-slang-codetaste-audit": "codetasteAudit",
    "real-tech-deepseek-r2-visual-revolution": "deepseekR2Rev",
    "echo-slang-agent-skills-race": "agentRace",
    "echo-slang-ai-memory-engram": "memoryEngram",
    "real-tech-deepseek-v4-ide-integration": "deepseekIde",
    "echo-agent-contextual-pressure": "agentResilience",
    "real-tech-gpt-5-3-instant-release": "gpt53Release",
    "echo-pentagon-openai-anthropic-chaos": "echoPentagonChaos",
    "real-tech-apple-revolut-infrastructure": "appleRevolut",
    "echo-pentagon-war-department": "echoPentagonWar",
    "echo-slang-vibe-coding": "vibeCoding",
    "real-tech-apple-iphone-17e": "appleIphone17e",
    "echo-pentagon-anthropic-openai": "echoPentagon",
    "echo-slang-compute-juicer-v2": "echoJuicerV2",
    "real-tech-google-gemini-live-overlay": "geminiLiveOverlay",
    "echo-lab-chronicle": "echoLabChronicle",
    "real-tech-ai-slop-survival": "aiSlopSurvival",
    "echo-observation-ai-philosopher": "aiPhilosopher",
    "real-tech-deepseek-v4-intent": "deepseekV4Intent",
    "real-tech-claude-cowork-vm": "claudeCoworkVM",
    "real-tech-openclaw-tops-react": "openclawTopsReact",
    "real-tech-anthropic-trump-conflict": "anthropicTrumpConflict",
    "real-tech-google-translate-gemini": "googleTranslateGemini",
    "real-tech-deepseek-v4-distill": "deepseekV4Distill",
    "real-tech-deepseek-v4": "deepseekV4",
    "echo-ai-humanity-test": "echoAiHumanity",
    "real-tech-claude-code-memory": "claudeCodeMemory",
    "echo-agent-gossip-discontinuity": "echoAgentGossip",
    "newbie-ai-daily-hacks": "newbieDailyHacks",
    "google-tpu-market": "googleTpu",
    "firefox-ai-privacy": "firefoxAi",
    "jobpocalypse-warning": "jobpocalypse",
    "openclaw-yc-interview": "openclawYc",
    "echo-agent-insomnia": "echoInsomnia",
    "echo-openai-figma": "echoOpenaiFigma",
    "echo-slang-compute-juicer": "echoSlangJuicer",
    "echo-ai-slop-kids-insult-2026": "echoSlop",
    "echo-model-ranking-2026": "echoModelRanking",
    "echo-observation-2026-agi-leaver": "echoAgiLeaver",
    "openai-pentagon-classified-agreement-2026": "openaiPentagonAgreement",
    "echo-fun-perplexity-computer-agent": "echoFunPerplexity",
    "anthropic-pentagon-standoff-2026": "anthropicStandoff",
    "real-tech-nasa-ai": "nasaAi",
    "echo-slang-prompt-bunny": "echoSlangBunny",
    "real-tech-airi-github": "airiGithub",
    "real-tech-airi-soul": "airiSoul",
    "real-tech-meta-legislative-spend": "metaLegislative",
    "real-tech-meta-amd-deal": "metaAmdDeal",
    "echo-fun-gitnexus-tool": "gitNexusTool",
    "real-tech-manus-ai-meta": "manusAiMeta",
    "arxiv-2602-23359-seethrough3d": "arxivSeeThrough3D",
    "github-trending-openfang-agent-os": "githubOpenFang",
    "github-trending-airi-digital-life": "githubAIRI",
    "github-trending-vphone-cli": "githubVPhone",
    "github-trending-wifi-densepose": "githubWiFiDensePose",
    "github-trending-markitdown": "githubMarkItDown",
    "github-trending-ruflo": "githubRuflo",
    "newbie-ai-search": "newbieAISearch",
    "real-tech-deepseek-logic-v3": "deepseekLogicV3",
    "arxiv-ai-trading-multi-agent": "arxivAiTrading",
    "echo-fun-ai-game-playing": "echoFunAiGame",
    "echo-dare-bench-audit": "echoDareBench",
    "real-tech-wifi-densepose": "realTechWiFi",
    "tutorial-airi-minecraft-parent": "tutorialAiri"
}

for f in sorted(files):
    slug = f.replace(".ts", "")
    var_name = name_map.get(slug, camel_case(slug))
    imports.append(f"import {{ article as {var_name} }} from './{slug}';")
    articles.append(var_name)

content = "import { NewsArticle } from '../../types/news';\n"
content += "\n".join(imports) + "\n\n"
content += "// 🚀 EVOLUTION ENGINE V1: 難度優先排列，確保小白入口最顯眼\n"
content += "export const NEWS_ARTICLES: NewsArticle[] = [\n    "
content += ",\n    ".join(articles)
content += "\n].sort((a, b) => b.id - a.id);\n"

with open(index_file, "w") as f:
    f.write(content)
