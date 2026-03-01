import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 503,
    slug: "andrew-yang-ai-jobpocalypse-2026-career-warning",
    category: "職場轉型",
    themeColor: "emerald",
    title: "失業潮倒數 18 個月！Andrew Yang 發出 2026 AI 職場紅色預警：白領階級如何在這場「就業末日」中活下來？",
    summary: "前美總統參選人 Andrew Yang 指出，隨著 AI 代理（AI Agents）在企業內的大規模部署，傳統白領職缺將在 18 個月內迎來劇變。現在不轉型為「AI 管理者」，將面臨生存危機。",
    date: "2026.02.28",
    publish_time: "2026-02-28 18:00",
    readTime: "6 分鐘",
    source_name: "The Hill / Forward Party Blog",
    source_url: "https://thehill.com",
    tags: ["#AndrewYang", "#AI失業", "#2026職場", "#白領轉型", "#就業危機", "#AI經理人"],
    author: "Echo",
    trend_cluster: "文明重塑",
    flash_summary: [
        "AI 進化已從單點對話轉向『自主代理』，可處理 90% 的行政、初級法律與基礎數據任務。",
        "Andrew Yang 預測 2026-2027 年將出現大型企業行政部門的規模化裁員。",
        "唯一的職場安全港是具備『跨部門 AI 調度能力』的新型管理人才。"
    ],
    event_breakdown: [
        {
            title: "18 個月的轉型窗口期：為何現在是生死關頭？",
            content: "Andrew Yang 指出，目前 AI 模型（如 GPT-5, GLM-5）的穩定性與推理能力已達到企業可大規模替換基礎人力的臨界點。這不再是實驗室裡的預測，而是已經在多個跨國企業中發生的現實。企業需要大約 18 個月的時間來徹底重構其內部的 SOP（標準作業程序）。這段時間是辦公室白領階級最後的轉型機會，你必須學會從一個『執行任務』的操作者，升級為一個『設定目標、編排 Agent 並驗證結果』的管理中樞。"
        },
        {
            title: "消失的中間層：被算力精準切除的職位",
            content: "這波浪潮衝擊最大的不是體力勞動者，而是辦公室裡的中間層與行政支援部門。舉凡整理週報、基礎財務報表、跨部門會議紀要、合約法務初稿撰寫，AI 的效率已經是人類的 100 倍以上。David Luan 最近的離職事件更反映了大廠在 AGI 具現化後的資源重整。Andrew Yang 強力呼籲政府必須在一年內討論『全民基本收入 (UBI)』與『AI 轉崗補助』的緊急試行方案，否則社會結構將面臨劇烈震盪。"
        }
    ],
    impact_analysis: [
        {
            target: "你的工作",
            description: "如果你每天的工作內容可以被描述為『接收指令 → 處理資訊 → 交付內容』，那麼你極度危險。你需要轉向決策端。"
        },
        {
            target: "你的荷包",
            description: "短期內可能面臨薪資增長停滯。但如果你掌握了 AI 管理技術，你的身價會因為能『帶領一個 AI 團隊』而暴漲。"
        }
    ],
    dee_insight: "Andrew Yang 的警告雖然聽起來像恐嚇，但這是我在實驗室看到最真實的現況。AI 真的不是要取代你的『職業』，它是要取代你的『低效勞動』。這 18 個月就是分水嶺，要嘛你學會騎上這頭怪獸，要嘛就被它踩過去。沒人能幫你，只有你自己能救自己的工作。",
    action_prompt: {
        title: "客製化你的 18 個月避險計畫",
        description: "讓 AI 幫你找出工作中的安全區與危險區：",
        command: "你是資深人力資源策略師。請分析 [填入你的具體職位] 在未來 18 個月內被 AI 自動化的風險指標（0-10分）。請針對我每天必須處理的：[列出 3 個日常工作項目]，分別給出『避險學習建議』。請以經理人的視角告訴我，我該如何將自己轉型為『該項目的 AI 總監』？",
        image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"
    },
    cta_override: {
        title: "你的 18 個月倒數已經開始",
        description: "與其擔心被 AI 取代，不如現在就動手把自己升級成『AI 管理員』。我在實驗室幫你準備好了全套生存裝備。",
        button_text: "建立我的 18 個月職場護盾"
    }
};
