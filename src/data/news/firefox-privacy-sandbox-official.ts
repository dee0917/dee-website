import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 703,
    slug: "firefox-browser-ai-privacy-sandbox-2026",
    category: "安全隱私",
    themeColor: "emerald",
    title: "Firefox 瀏覽器實裝『AI 隱私沙盒』：讓用戶完全掌控 AI 數據餵食權限",
    summary: "Mozilla 宣布在 Firefox 最新版本中導入物理隔離的 AI 沙盒技術，允許用戶針對個別網站一鍵禁用 AI 存取，解決了瀏覽器 AI 隨意抓取用戶隱私的難題。",
    date: "2026-02-28",
    readTime: "3 分鐘",
    source_name: "Mozilla Blog / Wired",
    source_url: "https://blog.mozilla.org",
    tags: ["#Firefox", "#隱私保護", "#AI沙盒", "#數據主權", "#2026新功能"],
    author: "The Source",
    flash_summary: [
        "新增『AI 切換開關』，進入網銀或私密通訊頁面時 AI 將被強制離線。",
        "引入本地運算模式，讓翻譯與簡單摘要直接在本地裝置運行，數據不傳雲端。",
        "透明化日誌系統，清晰標示 AI 剛才讀取了哪些網頁字元。"
    ],
    event_breakdown: [
        {
            title: "隱私優先：反擊全知全能的 AI",
            content: "在瀏覽器 AI 氾濫的 2026 年，用戶最大的痛點是『數據被默認餵食』。Firefox 的沙盒技術提供了一種『物理斷開』的選擇，確保用戶在處理高度敏感資訊時，AI 模型處於完全盲視狀態。"
        }
    ],
    impact_analysis: [
        {
            target: "你的隱私",
            description: "你可以確信你的密碼與金融動態不會出現在大模型的訓練數據集中，實現真正的瀏覽主權。"
        }
    ],
    dee_insight: "當大廠都在想方設法多吸一點數據時，Mozilla 選擇幫用戶把門關上。這則新聞告訴我們：好工具不一定要『全能』，但一定要『聽話』。",
    action_prompt: {
        title: "自製你的瀏覽器隱私檢查表",
        description: "立刻動手加固你的 AI 隱私：",
        command: "你現在是網絡安全顧問。請幫我分析當前主流瀏覽器（如 Chrome, Edge）內建的 AI 功能會產生哪些數據外洩路徑？如果我無法切換到 Firefox，請教我如何透過插件或進階設定來達成類似的『AI 隱私沙盒』效果？"
    },
    cta_override: {
        title: "學會保護你的數據，就是保護你的財富",
        description: "隱私意識是 2026 年必備的軟實力。來實驗室學會正確的 AI 隱私設置，別讓你的資料成為別人的算力養分。",
        button_text: "開啟 AI 安全守護課程"
    }
};
