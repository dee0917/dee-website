import { InsightArticle } from '../../types/insights';

export const insight: InsightArticle = {
    id: 512,
    category: "戰略演進",
    themeColor: "purple",
    difficulty_level: 2,
    level: -1,
    tags: ["#自動記憶", "#ClaudeCode", "#數位工藝", "#記憶主權"],
    title: "跨越遺忘曲線：Claude Code 的自動記憶進化",
    summary: "為什麼 AI 總是前一秒說好，下一秒就忘？這篇教你如何利用最新的「自動記憶」技術，讓 AI 變成一個越用越懂你的數位老戰友。",
    date: "2026.03.02",
    readTime: "4 分鐘",
    pain_point: "每次跟 AI 說話都要從頭解釋？昨天教過它的東西，今天又要重講一遍？",
    scenario: "當你正在進行多天連續的寫作或開發計畫時。",
    solution: "利用 MEMORY.md 或本地持久化機制，強迫 AI 在對話開始前先閱讀「前情提要」。",
    insight_quote: "真正強大的 AI，是你可以隨時讓它「忘記」的 AI。",
    example: {
        wrong: "「哎呀，我昨天才跟你說過我不喜歡用這個格式，你怎麼又忘了？」",
        right: "（啟動自動記憶）AI：「歡迎回來！我記得你偏好簡短的條列式回覆，且上次我們討論到一半的計畫是...」"
    },
    persona_overrides: {
        parent: {
            pain_point: "想讓 AI 幫小孩改作文，但每次都要重新輸入小孩的年級、興趣跟目前的學習進度？",
            example: {
                wrong: "「這 AI 每次都給我大學生的建議，我小孩才小三啊！」",
                right: "（啟動自動記憶）AI：「你好！我記得孩子正在學形容詞，上次那篇關於貓咪的文章我們改到一半，要繼續嗎？」"
            }
        },
        non_tech_senior: {
            pain_point: "老是記不住上次 AI 教你的步驟？每次都要翻對話紀錄翻到頭暈？",
            example: {
                wrong: "「那個...上次你教我怎麼用手機掛號，我又不小心忘了，能再講一遍嗎？」",
                right: "AI：「阿姨別擔心！我都幫您記在『筆記本』裡了。上次我們停在輸入身分證字號那一步，我們繼續吧！」"
            }
        },
        sovereign: {
            pain_point: "擔心 AI 把你的隱私記在雲端資料庫？想要擁有「記憶的開關」？",
            example: {
                wrong: "「我不敢讓 AI 記住我的習慣，怕資料外洩。」",
                right: "（使用 MEMORY.md）「所有記憶都存在我自己的電腦裡，我可以隨時修改或刪除，這才是真正的記憶主權。」"
            }
        }
    },
    steps: [
        {
            title: "什麼是「自動記憶」？(The MEMORY.md Logic)",
            body: "想像 AI 身上帶著一本隨身筆記。每當你們解決了一個難題、建立了一個習慣，它就會偷偷記下來。下次你找它時，它先翻翻筆記，就什麼都想起來了。",
            dee_tip: "在開發者世界這叫持久化，但在生活中，這叫「默契」。"
        },
        {
            title: "跨裝置接續：從電腦到手機的無縫傳送",
            body: "你在電腦上教 AI 的事，打開手機它依然記得。這不是魔法，而是透過輕量化的同步技術，讓 AI 的靈魂可以跟著你走，不再被鎖在單一螢幕裡。",
            dee_tip: "就像看 Netflix，換台裝置看，進度條還是在那裡。"
        }
    ],
    quiz: {
        question: "「自動記憶」功能最大的好處是什麼？",
        options: [
            "讓 AI 變得更會吵架",
            "省去重複解釋的時間，讓 AI 越用越懂你",
            "讓 AI 可以自動幫我花錢",
            "讓電腦跑得更快"
        ],
        answer: 1,
        explanation: "自動記憶的核心目標是建立「連續性」。它讓 AI 具備了時間感，能記住過去的脈絡，從而提供更有溫度的服務。"
    },
    skill_badge: "🧠 記憶重塑者",
    practice_kit: {
        title: "實戰演練：建立你的第一個「記憶點」",
        description: "現在就對你的 AI 說這段話，測試它的記憶潛力：",
        command: `請扮演我的「生活紀錄員」。`
    },
    content: "自動記憶技術的核心在於將短期對話上下文轉化為長期文件存儲。這不僅減少了 token 消耗，更重要的是建立了一個具備「穩定人格」的助理環境。"
};
