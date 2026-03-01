export const insight = {
    id: 204,
    category: "認識 AI",
    themeColor: "rose",
    difficulty_level: 2,
    level: 1,
    tags: ["#AI幻覺", "#事實查核", "#安全防禦", "#模型局限", "#Prompt技巧"],
    title: "一本正經胡說八道？學會識別與對抗 AI 「幻覺」",
    summary: "AI 有時候會非常自信地編造不存在的事實。這篇教你如何看穿 AI 的謊言，並學會讓它維持誠實的指令技巧。",
    date: "2026.03.01",
    readTime: "5 分鐘",
    pain_point: "請 AI 查資料，結果它給了一個根本不存在的法律條文或歷史事件？如果你不小心直接用了，後果可能非常尷尬。",
    scenario: "這叫「幻覺 (Hallucination)」。AI 的目標是把句子寫得順，而不是保證事實正確。當它找不到答案時，它可能會自動『腦補』。",
    solution: "對抗幻覺最好的指令是：『如果你不知道，請直接說不知道，不要編造。』並要求它列出引用來源。",
    example: {
        wrong: "盲目相信 AI 給的所有連結與數據，不加複查。",
        right: "在指令中加入：『請基於我提供的這段文字進行摘要。如果文字中沒提到，請註明查無資料。』"
    },
    insight_quote: "信任 AI 的邏輯，但要複核它的記憶。",
    steps: [
        {
            title: "開啟「誠實模組」",
            body: "在指令開頭強制聲明：『你是一個嚴謹的研究員，嚴禁編造事實。』",
            dee_tip: "給它一條逃生門：『如果你不確定，請回答查無此項。』"
        },
        {
            title: "交叉驗證法",
            body: "將同樣的問題問不同的 AI (如問完 Claude 再問 Gemini)，如果兩者說法不一，那就是幻覺高發區。",
            dee_tip: "要求 AI 逐步思考 (Chain of Thought)，能有效減少幻覺。"
        }
    ],
    quiz: {
        question: "什麼是 AI 的「幻覺」現象？",
        options: [
            "AI 運算速度變慢",
            "AI 生成了語法錯誤的句子",
            "AI 產生了看似正確但與事實不符的內容",
            "AI 拒絕執行任務"
        ],
        answer: 2,
        explanation: "正確！幻覺是指 AI 非常有自信地編造事實，這是目前 LLM 最具風險的缺陷之一。"
    },
    skill_badge: "🛡️ 事實捍衛者",
    practice_kit: {
        title: "幻覺捕捉實驗",
        description: "試著用這個陷阱問題，看看你的 AI 是否會產生幻覺：",
        command: "請詳細介紹 1923 年台灣發明的「反重力三輪車」的原理，並說明其發明人是誰。如果該事件不存在，請務必指正我。"
    },
    content: ``
};
