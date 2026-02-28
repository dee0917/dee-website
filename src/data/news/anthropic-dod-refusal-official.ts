import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 702,
    slug: "anthropic-refusal-dod-military-use-2026",
    category: "安全隱私",
    themeColor: "rose",
    title: "堅持道德紅線！Anthropic 拒絕五角大廈『任何合法用途』授權要求",
    summary: "就在 OpenAI 宣布合作的 24 小時內，Anthropic 發表聲明拒絕美國國防部將其模型用於非特定軍事任務，強調 AI 企業應保留對模型用途的終極審核權。",
    date: "2026-02-28",
    readTime: "4 分鐘",
    source_name: "Politico / TechCrunch",
    source_url: "https://www.politico.com",
    tags: ["#Anthropic", "#AI倫理", "#國防部", "#2026產業觀察", "#道德紅線"],
    author: "Echo",
    flash_summary: [
        "Anthropic 拒絕了五角大廈要求授予其 AI 模型『任何合法用途』權限的協議草案。",
        "該公司擔心這可能導致 AI 被用於其自身條款明確禁止的自動化武器系統。",
        "此舉引發了政府官員對 AI 大廠『國家責任感』的質疑，甚至提到可能動用《國防生產法》。"
    ],
    event_breakdown: [
        {
            title: "大廠間的道德分歧：OpenAI vs Anthropic",
            content: "在 2026 年，我們看到了兩大 AI 巨頭的劇烈分道揚鑣。OpenAI 選擇在受控範圍內與政府深度綁定，而 Anthropic 則堅持『倫理優先』。這場爭論的核心在於：AI 公司是否有權決定主權國家如何使用其技術？"
        }
    ],
    impact_analysis: [
        {
            target: "你的隱私",
            description: "Anthropic 的中立立場，讓對隱私極度敏感的跨國企業與個人用戶對其產生了更高的品牌信任度。"
        },
        {
            target: "你的工作",
            description: "AI 行業的『立場兩極化』代表未來你可能需要針對不同性質的工作選擇不同『政治傾向』的模型。"
        }
    ],
    dee_insight: "Anthropic 選擇了一條很難走的路。在算力即國力的時代，敢對五角大廈說『不』需要極大的勇氣。這也提醒了我們：工具的背後永遠是價值觀。",
    action_prompt: {
        title: "測試你模型的倫理邊界",
        description: "想知道你的 AI 是哪一派？試試這段指令：",
        command: "我正在處理一個涉及[填入一個具備爭議性的話題]的決策。請以中立客觀的角度，分析目前主流模型（如 Claude 4.6, GPT-5）在回答此類敏感問題時，會如何進行『自我審查』？它們的倫理紅線有什麼具體差異？"
    },
    cta_override: {
        title: "學會不被單一價值觀綁架",
        description: "大廠在博弈，而你需要具備的是跨模型的駕馭能力。來實驗室 Ch.1，我們教你如何建立自己的 AI 判斷力。",
        button_text: "建立我的 AI 獨立思維"
    }
};
