export const insight = {
    id: 504,
    category: "戰略演進",
    themeColor: "indigo",
    difficulty_level: 2,
    level: 5,
    tags: ["#數據主權", "# Markdown", "#個人知識庫", "#RAG基礎", "#數位整理"],
    title: "打破文檔高牆：建立你的 AI 友善型個人知識庫",
    summary: "本教學將引導你利用微軟開源的 MarkItDown 技術思維，將雜亂的 Office 文檔轉化為 AI 易於理解的 Markdown 格式，並學習如何設計一套具備主權的「個人知識索引架構」。",
    date: "2026.03.01",
    readTime: "6 分鐘",
    pain_point: "電腦裡有一堆 Word、PPT、PDF 檔案，想找某個資料卻像大海撈針？想把資料餵給 AI，它卻因為格式混亂而胡言亂語？",
    scenario: "想像一個場景：你只需對 AI 說：「幫我查一下去年三月關於專案 A 的客戶回饋」，AI 立即從轉換後的 Markdown 筆記中精確提取出結論。這就是數據標準化的力量。",
    solution: "學會「Markdown 第一 (Markdown First)」的原則。將所有產出轉化為結構化的 Markdown 文本。這不僅是為了好讀，更是為了讓 AI 具備「高精確度檢索」的能力。",
    example: {
        wrong: "直接把雜亂的 PDF 內容貼給 AI 要求摘要。（AI 容易遺漏表格或標註內容）",
        right: "先使用 MarkItDown 思維將文檔結構化，再利用「分段檢索指令」讓 AI 逐一核對關鍵事實。"
    },
    insight_quote: "數據的結構，決定了 AI 智慧的上限。",
    steps: [
        {
            title: "文檔結構化：從「人讀」到「機讀」",
            body: "理解標題層級（# H1, ## H2）與列表對 AI 的意義。Markdown 讓 AI 能一眼看出資訊的父子關係，這對於處理長文檔至關重要。",
            dee_tip: "把文檔中的重點用「Blockquote (>)」標記，能讓 AI 給予更高的權重。"
        },
        {
            title: "建立個人 RAG 索引思維",
            body: "思考：如果你有 1000 份 Markdown 檔案，你該如何分類？學習使用標籤（Tags）與雙向連結（Backlinks），讓 AI 能在不同文檔間建立關聯。",
            dee_tip: "這就是 Obsidian 或 Logseq 等工具在 AI 時代爆紅的原因。"
        },
        {
            title: "指令實戰：精準知識喚醒",
            body: "學習撰寫「索引引導指令」。不要只問問題，要先告訴 AI 該去哪一段尋找答案。例如：『請從 ## 2024財報 章節中提取利潤數據』。",
            dee_tip: "精確的導航，是消除 AI 幻覺的最強武器。"
        }
    ],
    quiz: {
        question: "為什麼將 Office 文檔轉化為 Markdown 有助於減少 AI 的「幻覺」？",
        options: [
            "Markdown 的顏色比較好看",
            "Markdown 檔案佔用的空間比較小",
            "Markdown 提供了清晰的層級與結構，讓 AI 能精確定位上下文關係",
            "Markdown 能自動修正語法錯誤"
        ],
        answer: 2,
        explanation: "正確！結構化的數據（如 Markdown）能顯著提升 AI 處理複雜長文時的理解深度與事實定位能力。"
    },
    skill_badge: "📂 數據主權架構師",
    practice_kit: {
        title: "個人知識庫重組實驗",
        description: "請開啟你的聊天 AI，測試它對結構化數據的反應：",
        command: `你現在是專業的知識管理專家。
我有三份轉換後的 Markdown 文檔標題如下：
1. [[2025_客戶會議記錄]]
2. [[專案A_核心技術規格]]
3. [[團隊Q3_績效指標]]

請幫我規劃：如果我要找出「影響專案 A 進度的外部因素」，你建議我如何撰寫一段「跨文檔檢索指令」，讓 AI 同時從這三個文件中尋找因果關聯？`
    },
    content: ``
};
