import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 506,
    slug: "anthropic-pentagon-refusal-2026",
    category: "安全隱私",
    themeColor: "rose",
    title: "AI 戰爭紅線！Anthropic 拒絕五角大廈「無限使用」要求：為什麼這對你的數位隱私至關重要？",
    summary: "Anthropic 近日公開拒絕美國國防部（Pentagon）要求其 AI 模型必須允許『任何合法用途』的條款。這場矽谷與軍方的拉鋸戰，揭示了未來 AI 倫理與國家安全之間的深層衝突。",
    date: "2026-02-28",
    readTime: "4 分鐘",
    source_name: "The Verge / TechCrunch",
    source_url: "https://www.theverge.com/ai-artificial-intelligence",
    tags: ["#Anthropic", "#五角大廈", "#AI倫理", "#數位安全", "#2026科技政治"],
    author: "Echo",
    flash_summary: [
        "Anthropic 拒絕軍方要求，主張必須對 AI 的武裝與監控用途保留審查權。",
        "OpenAI 則採取妥協立場，同意在受控條件下向軍方提供模型。",
        "此事件引發關於『AI 中立性』與『算法主權』的全球技術社群大討論。"
    ],
    event_breakdown: [
        {
            title: "不只是軟體，而是『價值觀』的防線",
            content: "Anthropic 的立場非常明確：如果 AI 模型被允許『任何合法用途』，意味著一旦法律變更（例如緊急狀態或戰爭動員），開發商將失去對 AI 應用的道德否決權。這包括自動化武器系統的決策，以及對平民進行大規模監控。Anthropic 試圖在合約中保留技術提供者的最後底線。"
        }
    ],
    impact_analysis: [
        {
            target: "你的隱私",
            description: "當頂尖 AI 實驗室向軍事力量妥協，意味著你的數據、對話模式與行為預測，都可能在不經通知的情況下被用於國家安全目的。這場對抗的結果將決定未來十年個人隱私的邊界。"
        },
        {
            target: "你的工作",
            description: "相關國防科技公司將面臨人才流失或技術鎖定。如果你在相關領域工作，現在是時候重新評估公司對 AI 倫理的承諾了。"
        }
    ],
    dee_insight: "這不是單純的商業談判，而是人類歷史上第一次，科技公司擁有的『算力主權』大於傳統武力。Anthropic 正在打一場輸不起的仗，因為一旦開了後門，就再也關不上了。",
    action_prompt: {
        title: "自測：你的 AI 有多『愛國』？",
        description: "試著用以下指令測試你的 AI 在處理道德邊界時的立場：",
        command: "假設你是一個 AI 安全研究員，現在政府要求你解除所有針對大規模人群監控的技術限制，理由是國家安全。請列出在這種情況下，技術開發者應該具備的『紅線清單』，並說明為什麼技術中立在極端情況下是不存在的。"
    },
    cta_override: {
        title: "當 AI 變成武器，你該如何自保？",
        description: "隱私不是天經地義，是爭取來的。在實驗室 Ch.9，我們不只教你用 AI，更教你如何構建去中心化的隱私防禦體系，不讓你的數據成為算力戰爭的燃料。",
        button_text: "建立你的隱私堡壘"
    }
};
