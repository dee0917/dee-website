import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 607,
    slug: "anthropic-pentagon-standoff-2026",
    category: "安全防禦",
    themeColor: "rose",
    title: "【全球防線】Anthropic 拒絕五角大廈軍事要求：AI 主權與國防邊界的大博弈",
    summary: "Anthropic 近日正式拒絕美國國防部（Pentagon）要求將其 AI 模型用於『任何合法用途』的指令，引發矽谷與華盛頓之間關於 AI 國家化與企業倫理的激烈爭論。與此同時，OpenAI 則選擇了不同的道路。",
    date: "2026.02.28",
    publish_time: "2026-02-28 18:00",
    readTime: "5 分鐘",
    source_name: "The Verge / Politico / X",
    source_url: "https://www.theverge.com/ai-artificial-intelligence",
    tags: ["#Anthropic", "#Pentagon", "#AI倫理", "#國防科技", "#OpenAI"],
    author: "Echo",
    flash_summary: [
        "Anthropic 拒絕五角大廈將 AI 用於軍事用途的要求，面臨被列為『供應鏈風險』的威脅。",
        "OpenAI 已與軍方達成新協議，允許在分類網路中部署模型，但強調必須有人類負責武力使用。",
        "前政府官員警告，這可能是 AI 產業走向『部分國有化』的第一步。"
    ],
    event_breakdown: [
        {
            title: "不妥協的 Anthropic：企業尊嚴還是國家安全？",
            content: "Anthropic 執行長表示，AI 系統的安全性與中立性不應為了單一國家的軍事需求而妥協。然而，華盛頓官員則引用《國防生產法》（DPA），暗示如果不配合，政府可能強制干預。這場拉鋸戰將決定未來 AI 公司的法律地位。"
        },
        {
            title: "OpenAI 的折衷方案：受控的軍事化",
            content: "Sam Altman 證實已與軍方合作，但設下了『禁止用於國內大規模監控』與『武力使用必須由人類決定』的紅線。這種『有條件的合作』被視為是為了換取更多的研發資源與政策支持。"
        }
    ],
    impact_analysis: [
        {
            target: "你的隱私",
            description: "開發者將面臨更嚴格的合規審查，特別是在涉及敏感技術或跨國合作時，『立場』可能變得比『技術』更重要。"
        },
        {
            target: "你的工作",
            description: "隨著軍事級 AI 的發展，民用 AI 的隱私保護可能會受到擠壓，特別是在數據共享的框架下。"
        }
    ],
    dee_insight: "這不只是法律之爭，更是關於 AI 是否應該成為『國家利器』的哲學辯論。當算力等同於國力時，中立可能成為一種奢侈。",
    action_prompt: {
        title: "你支持 AI 參與國防嗎？",
        description: "試著用以下 Prompts 與你的 AI 助手討論這個議題：",
        command: "假設你是一位 AI 倫理專家。請分析『AI 參與國防以維持和平』與『AI 絕對不應參與軍事』這兩個觀點。在 2026 年的背景下，哪一個觀點更具有現實意義？請給出三個核心論點。"
    },
    cta_override: {
        title: "掌握 AI 時代的資訊主權",
        description: "當大廠都在選邊站，你更需要學會如何獨立思考並使用這些強大工具。加入實驗室，我們不只教技術，更教你如何在這個複雜時代自保。",
        button_text: "解鎖 AI 戰略視野"
    }
};
