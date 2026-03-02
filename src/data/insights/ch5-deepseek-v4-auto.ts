export const insight = {
    id: 505,
    category: "進階實戰",
    themeColor: "emerald",
    difficulty_level: 4,
    level: 5,
    tags: ["#DeepSeekV4", "#意圖補完", "#去提示詞化", "#自動化", "#代理人"],
    title: "DeepSeek V4：從「寫咒語」進化到「下指令」的自動化革命",
    summary: "DeepSeek V4 引入了『意圖捕捉』技術，讓 AI 能自動感知上下文，大幅降低操作門檻。本篇教你如何利用這項技術實現無感自動化。",
    date: "2026-03-02",
    readTime: "5 分鐘",
    pain_point: "每天都要重複貼上一堆上下文（背景、格式、前情提要）才能讓 AI 聽懂？模糊的指令總是換來牛頭不對馬嘴的回覆？",
    example: {
        wrong: "「請扮演我的助手，讀取以下這三份 CSV，並根據我的專案 A 的風格，幫我寫一份...（下略 500 字）」",
        right: "「幫我做專案 A 的週報。」（AI 自動讀取過去 24 小時檔案與對話，精準生成內容）"
    },
    persona_overrides: {
        freelancer: {
            pain_point: "手上有 5 個案子，每次切換案子都要重新跟 AI 解釋一次背景，光是『提示詞維護』就佔掉一半時間？",
            example: {
                wrong: "「AI 沒辦法處理多工啦，我每個案子的邏輯都不一樣，解釋完我早就自己寫好了。」",
                right: "利用 DeepSeek V4 的『場景預測器』，直接輸入『生成報價單』，AI 會根據你目前的檔案目錄自動補全所有細節。"
            }
        }
    },
    steps: [
        {
            title: "理解「去提示詞化」核心",
            body: "DeepSeek V4 不再依賴你輸入繁瑣的 Prompt，而是透過背景感知（Context Awareness）自動對齊你的意圖。這意味著你的指令越短，AI 的發揮空間越大。",
            dee_tip: "試著減少形容詞，直接給予動詞與目標。"
        },
        {
            title: "建立「場景感知」工作流",
            body: "將你的專案文件放在 AI 可讀取的目錄下。當你下達指令時，V4 會優先掃描最近修改的文件與 Slack/Discord 訊息記錄，建立即時的『執行地圖』。",
            dee_tip: "保持工作目錄整潔，是提高意圖捕捉準確率的關鍵。"
        }
    ],
    quiz: {
        question: "DeepSeek V4 的『意圖補完』功能，其主要目的是？",
        options: [
            "增加更多複雜的 Prompt 語法",
            "讓用戶不再需要學習複雜的提示詞工程",
            "取代所有的程式開發者",
            "強制用戶付費訂閱"
        ],
        answer: 1,
        explanation: "V4 的核心在於降低門檻，讓 AI 主動適應人類的表達方式，而非人類去學習 AI 的咒語。"
    },
    skill_badge: "🤖 代理人調度官",
    practice_kit: {
        title: "意圖直達測試",
        description: "將這段話貼給具備 V4 能力的 AI，測試它的上下文捕捉力：",
        command: "我正在處理目前的專案，請根據之前的上下文，直接生成下一步的執行清單，不要問我問題。"
    }
};
