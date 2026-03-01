export const insight = {
    id: 100,
    category: "出發準備",
    themeColor: "teal",
    difficulty_level: 1,
    level: 0,
    tags: ["#什麼是AI", "#註冊教學", "#常用工具比較", "#新手懶人包", "#零基礎入門", "#ChatGPT", "#Claude", "#Gemini"],
    title: "ChatGPT、Claude、Gemini 是什麼？3 分鐘搞懂三大聊天 AI",
    summary: "聽大家都在說 AI，但到底該用哪一個？這篇用最白話的方式，帶你認識目前最熱門的三個聊天 AI，找到最適合你的那一個。",
    date: "2026.01.01",
    readTime: "3 分鐘",
    pain_point: "身邊的人都在用 AI，但你連 ChatGPT 是什麼都搞不清楚？打開網頁一堆英文，不知道從哪裡開始？覺得 AI 是工程師才會用的東西？",
    example: {
        wrong: "「AI 太難了，我又不是工程師，這不是我能用的東西。」（其實跟用 LINE 一樣簡單）",
        right: "打開 ChatGPT → 打字「你好，請用一句話介紹你自己」→ 收到回覆。恭喜，你已經在用 AI 了！"
    },
    // 身分專屬覆蓋內容
    persona_overrides: {
        office: {
            pain_point: "看著同事用 AI 幾秒鐘就回完一疊 Email，你卻還在想第一句該怎麼寫？",
            example: {
                wrong: "「AI 這種東西還是留給 IT 部門去研究吧，我手寫比較快。」",
                right: "打開 Claude → 貼上一串亂糟糟的會議草稿 → 「請幫我整理成 3 個重點」→ 搞定下班。"
            }
        },
        merchant: {
            pain_point: "做生意忙得要死，還要寫徵人啟事、想 FB 貼文？AI 聽起來就很貴，請不起工程師？",
            example: {
                wrong: "「我們做小生意的，用什麼 AI？那不是大公司在玩的嗎？」",
                right: "打開 Gemini → 「我開熱炒店，請幫我想 3 個有吸引力的招募標題」→ 秒出答案。"
            }
        },
        parent: {
            pain_point: "小孩問「為什麼天是藍色的？」，你查 Google 查到半天解釋不清楚？",
            example: {
                wrong: "「去問你老師啦，爸爸/媽媽在忙！」",
                right: "打開 ChatGPT → 「請扮演幼稚園老師，跟 5 歲小孩解釋天空為什麼是藍色的」→ 輕鬆搞定。"
            }
        },
        student: {
            pain_point: "論文讀不完、教授講的聽不懂，連文獻搜尋都要找半天？",
            example: {
                wrong: "「AI 會害我不思考吧？還是乖乖一個字一個字啃...」",
                right: "打開 Claude → 上傳 50 頁論文 → 「這篇的核心結論是什麼？有什麼缺點？」→ 快速掌握重點。"
            }
        },
        slashie: {
            pain_point: "一人創業心好累，想標題、寫腳本、回訊息全部自己來，一天 24 小時根本不夠用？",
            example: {
                wrong: "「AI 產出的東西沒靈魂，我還是自己熬夜想好了。」",
                right: "打開 ChatGPT → 「給我 10 個關於數位遊牧的短影音爆款標題」→ 靈感瞬間爆發。"
            }
        }
    },
    steps: [
        {
            title: "ChatGPT — 全球最多人用的全能選手",
            body: "OpenAI 公司出品。想像它是一間什麼都賣的自助餐：寫文章、回答問題、翻譯、寫程式，幾乎什麼都會。目前最多人用，網路上的教學也最多。免費版就很夠用。",
            dee_tip: "進入官網註冊後，就可以開始聊了！",
            external_links: [
                { label: "前往 ChatGPT 官網", url: "https://chat.openai.com" }
            ]
        },
        {
            title: "Claude — 最會聽話、最有耐心的助理",
            body: "Anthropic 公司出品。如果你打了一大段話給它，它能完整理解並照做。特別擅長讀長文、寫報告、做分析。個性比較「乖」，不太會亂編東西。",
            dee_tip: "我個人最推薦新手從 Claude 開始，因為它的回答最穩定。",
            external_links: [
                { label: "前往 Claude 官網", url: "https://claude.ai" }
            ]
        },
        {
            title: "Gemini — Google 自家的智慧大腦",
            body: "Google 出品。因為是 Google 做的，它能搜尋到最新的網路資訊。如果你常用 Google 的服務，Gemini 會特別順手。",
            dee_tip: "如果你有 Android 手機，可能已經內建了。",
            external_links: [
                { label: "前往 Gemini 官網", url: "https://gemini.google.com" }
            ]
        }
    ],
    quiz: {
        question: "以下關於三大聊天 AI 的描述，哪一個是正確的？",
        options: [
            "只有工程師才能使用 ChatGPT",
            "三個 AI 都有免費版，用瀏覽器就能打開",
            "AI 需要下載專門的軟體才能使用",
            "每次使用 AI 都要付費"
        ],
        answer: 1,
        explanation: "三個聊天 AI 都有免費版！只需要打開瀏覽器，用 Google 帳號註冊就能開始使用。不需要任何專業知識。"
    },
    skill_badge: "🚀 AI 認知啟蒙",
    practice_kit: {
        title: "三大 AI 快速體驗",
        description: "現在就打開一個 AI，把這段話複製貼上去看看它怎麼回應：",
        command: `你好！我是第一次使用聊天 AI。

請用 3 句話告訴我：
1. 你是誰？
2. 你最擅長幫人做什麼？
3. 如果我只能問你一個問題，你建議我問什麼？`
    }
};
