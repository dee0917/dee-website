export const insight = {
    id: 501,
    category: "戰略演進",
    themeColor: "indigo",
    difficulty_level: 3,
    level: 5,
    tags: ["#行動AI", "#虛擬化", "#iOS研究", "#代理人革命", "#進階玩家", "#vphone-cli"],
    title: "解放 AI 的雙手：如何在虛擬 iOS 中部署你的第一個行動代理人",
    summary: "AI 已經不滿足於文字對話了。透過 vphone-cli 技術，我們將學習如何建立一個虛擬手機環境，讓 AI 具備操作手機 App 的能力，開啟「行動主權」新紀元。",
    date: "2026.03.01",
    readTime: "7 分鐘",
    pain_point: "你是否覺得 AI 只能在電腦網頁上工作很受限？想要讓 AI 幫你處理手機上的日常任務（如外送、銀行、地圖），卻擔心隱私洩漏？",
    scenario: "想像一個具備主權的代理人，它不依賴 Apple 的 API，而是直接操作一個運行的系統。透過 Lakr233 的研究，我們可以讓 AI 直接「登錄」虛擬手機，像真人一樣滑動螢幕、點擊按鈕。",
    solution: "學習建立 PCC (Private Cloud Compute) 級別的實驗環境。這需要對虛擬化框架有基本認識，並學會使用 ADB 或 SSH 指令來「導航」這個虛擬設備。",
    example: {
        wrong: "「AI 幫我叫外送。」（如果該外送平台沒有開放 API，AI 就無法執行）",
        right: "「啟動虛擬 iOS 環境，AI 自動打開 UberEats App，根據我的歷史訂單點一份排骨飯，完成支付。」（這就是行動代理人的實戰！）"
    },
    insight_quote: "主權的本質，在於 AI 能否在不受限的作業環境中自主決策。",
    steps: [
        {
            title: "建立虛擬化地基",
            body: "使用 Virtualization.framework 在 Mac 上引導內核。這一步會讓你明白，作業系統其實只是跑在處理器上的一段代碼，是可以被劫持與賦能的。",
            dee_tip: "記得先備份你的 Mac。關閉 SIP 有風險，建議在測試機或備用機上進行。"
        },
        {
            title: "注入「AI 觸覺」：SSH 與 VNC 連結",
            body: "通過 VNC 協議，我們可以將手機螢幕轉化為圖像訊號，再餵給具備多模態能力的 AI（如 Gemini 1.5 Pro）。AI 看到螢幕，決定點擊坐標。",
            dee_tip: "關鍵技術指標是「延遲」。如果延遲超過 200ms，AI 的操作就會變得很笨拙。"
        },
        {
            title: "自動化腳本編排",
            body: "最後，我們編寫一個簡單的 Python 腳本，將 AI 的思考結果（例如：點擊座標 100,200）轉化為系統底層的觸控事件。",
            dee_tip: "這就是為什麼 2026 年後，App 開發者將不再是為了人類開發，而是為了 AI 開發。"
        }
    ],
    quiz: {
        question: "為什麼「虛擬化 iOS」對 AI 代理人非常重要？",
        options: [
            "可以讓手機跑得更快",
            "可以讓 AI 在不受 API 限制的情況下，直接操作任何 App",
            "可以免費下載付費 App",
            "可以增加手機的電池壽命"
        ],
        answer: 1,
        explanation: "正確！大多數 App 並不提供 API。虛擬化讓 AI 具備了「眼睛」與「手指」，能像人類一樣使用任何現有軟體。"
    },
    skill_badge: "🤖 行動代理人先驅",
    practice_kit: {
        title: "行動代理人啟動包",
        description: "本教學屬於戰略演進，需要具備基礎 Unix 知識：",
        command: `1. 部署 vphone-cli 環境
2. 啟動虛擬 iOS 並開啟 SSH
3. 執行：curl -L https://lab.dee.ai/scripts/setup-agent-touch.sh | bash
# 這將為你的環境注入基礎的 AI 觸控反饋邏輯。`
    },
    content: ``
};
