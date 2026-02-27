export const insight = {
    id: 301,
    category: "提示詞工程",
    themeColor: "yellow",
    difficulty_level: 2,
    level: 2,
    tags: ["#提示詞結構", "#NanoBanana", "#萬用公式"],
    title: "香蕉也能寫提示詞？學會「Nano-Banana」公式，新手也能變大師",
    summary: "這是一個在國外爆紅的超簡單結構：角色 (N)、任務 (A)、規範 (N)、目標 (O)。只要記住這四個字，任何指令都能變神作。",
    date: "2026.02.01",
    readTime: "6 分鐘",
    pain_point: "每次要跟 AI 講話都腦袋空空，不知道要提供什麼資訊？寫出來的指令總覺得漏東漏西？",
    scenario: "我以前寫指令像在寫簡訊，只有「任務」。自從用了 Banana 公式，我發現 AI 的產出變得非常有層次。就像一根香蕉，外皮是規則，果肉是內容。",
    solution: "將指令拆解為 N-A-N-O 四部分。角色 (N) 設定權威，任務 (A) 定義行動，規範 (N) 設定界線，目標 (O) 確認結果。邏輯通了，答案就順了。",
    example: {
        wrong: "幫我寫一個關於健康飲食的文章。",
        right: "「N: 你是營養學家。A: 撰寫 500 字文章。N: 不要用醫學術語、加入 3 個早餐範例。O: 目標是讓家庭主婦看了能立刻執行。」"
    },
    insight_quote: "結構化的提示詞，是將混亂的思維轉化為精準執行的橋樑。",
    steps: [
        {
            title: "N (Node/Persona)：定義角色",
            body: "告訴 AI 它是誰。這決定了它的專業深度與語氣細節。",
            dee_tip: "我常讓它扮演「極度挑剔的奧客」，來幫我檢查企劃書的漏洞。"
        },
        {
            title: "A (Action)：明確任務",
            body: "動詞！撰寫、翻譯、生成、重排。不要讓 AI 猜它要做什麼。",
            dee_tip: "用「扮演一個翻譯家並優化這段文字」，會比單純用「翻譯」效果好非常多。"
        },
        {
            title: "N (Notes/Constraints)：設定限制",
            body: "這部分是靈魂。例如「不要用什麼字」、「格式要怎麼排」。",
            dee_tip: "設定「不要超過國中生能理解的難度」，能讓 AI 的解釋變得非常白話。"
        },
        {
            title: "O (Output/Objective)：確認目標",
            body: "這份內容最後要達成什麼目的？是要說服人？還是純資訊傳遞？",
            dee_tip: "加上「目標是讓讀者按讚」，AI 會自動在結尾加入強大的 CTA。"
        }
    ],
    quiz: {
        question: "在 Nano-Banana 公式中，哪個環節負責「設定界線與格式控制」？",
        options: [
            "N (Node)",
            "A (Action)",
            "N (Notes)",
            "O (Objective)"
        ],
        answer: 2,
        explanation: "Notes 部分是用來告知 AI 哪些事不能做，以及格式上的特殊要求。"
    },
    skill_badge: "🍌 香蕉指令王",
    practice_kit: {
        title: "Nano-Banana 萬用結構",
        description: "只要填入這四項，就是一個 90 分以上的指令：",
        command: `【角色】設定身份
【任務】你要它做什麼
【規範】限制與要求（字數/風格/不要的東西）
【目標】最後要達成的效果`
    },
    content: ``
};
