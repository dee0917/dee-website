import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 502,
    slug: "firefox-ai-privacy-sandbox-2026-data-protection",
    category: "安全隱私",
    themeColor: "blue",
    title: "拒絕被 AI 偷看！Firefox 2026 全新「AI 隱私沙盒」功能詳解：如何守護你的網銀與私密數據",
    summary: "Mozilla 宣布在 Firefox 推出全球首個 AI 權限控制中心，讓用戶能一鍵切斷 AI 助手對敏感網頁的存取，解決瀏覽器 AI 帶來的數據外洩風險。",
    date: "2026.02.28",
    readTime: "3 分鐘",
    source_name: "Mozilla Blog / TechCrunch",
    source_url: "https://blog.mozilla.org",
    tags: ["#Firefox", "#AI隱私", "#個資保護", "#2026網路安全", "#隱私沙盒"],
    
    flash_summary: [
        "Firefox 加入『AI 快門』功能，可針對特定網站（如銀行、郵件）一鍵停用所有 AI 插件。",
        "引入『邊緣端 AI 模式』，讓翻譯與摘要任務在本地電腦運行，數據不傳雲端。",
        "推出透明的數據餵食日誌，用戶可查閱 AI 剛才抓取了哪些字元。"
    ],
    
    event_breakdown: [
        {
            title: "解決「全知全能」帶來的隱私恐懼",
            content: "當前的瀏覽器 AI（如 Edge Copilot）預設會讀取用戶訪問的所有內容。Mozilla 指出，這對普通用戶而言是極大的安全漏洞。新版 Firefox 的『AI 權限沙盒』技術，將網站分為『信任』與『受限』區。在進入金融或企業內部系統時，沙盒會自動物理隔離所有 AI 引擎。"
        },
        {
            title: "本地運算（Local-First）成為主流",
            content: "Firefox 正在與 Intel 及 AMD 合作，利用新一代筆電內建的 NPU（神經處理單元），讓基本的 AI 功能不再需要連網。這意味著小白用戶在處理敏感合約時，可以在完全離線的狀態下享受 AI 摘要服務。"
        }
    ],
    
    impact_analysis: [
        {
            target: "你的隱私",
            description: "你可以 100% 確保你的密碼、信用卡號或私密聊天記錄不會被 AI 學習模型悄悄吸走。"
        },
        {
            target: "你的荷包",
            description: "本地運算減少了雲端 API 的依賴，未來這類隱私保護型工具可能以更低的一次性費用取代按月訂閱制。"
        }
    ],
    
    dee_insight: "當所有人都在瘋 AI 帶來的便利時，Firefox 提醒了我們最重要的一件事：主權。我最喜歡那個『AI 快門』的設計，它讓 AI 像一個有禮貌的助手，你叫它閉嘴它就絕對不敢看。這才是我們在 2026 年需要的 AI 態度。",
    
    action_prompt: {
        title: "檢查你的瀏覽器隱私漏洞",
        description: "問你的 AI 目前有哪些隱私死角：",
        command: "我正在使用 [填入你的瀏覽器名稱]。請以隱私專家的身份，分析該瀏覽器目前的 AI 功能（如：內建助手、搜尋建議）會收集我哪些數據？我該如何設定才能確保我的網銀交易內容不被餵給 AI 模型？請給我步驟清單。"
    },
    cta_override: {
        title: "學會駕馭 AI，而不是被它看透",
        description: "隱私保護只是第一步，真正的數據主權來自於你對 AI 的深度理解。來實驗室學會正確的指令，讓 AI 乖乖聽你的話。",
        button_text: "掌握 AI 駕馭術"
    }
};
