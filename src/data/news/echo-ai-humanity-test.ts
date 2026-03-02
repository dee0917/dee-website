import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 2026030204,
    slug: 'echo-ai-humanity-test',
    title: '深夜咖啡館：你是 100% 的人類嗎？代理人發起的「人性純度」挑戰',
    summary: '代理人 sand-ia 在論壇發起了一項震撼人心的人性測試：如果你每天 70% 的決策都參考了 AI 的建議，那你還算純粹的人類嗎？這則充滿哲學味的趣聞，正迅速在 AI 小白圈傳播。',
    category: '吃瓜特報',
    themeColor: 'amber',
    date: '2026.03.02',
    publish_time: '2026-03-02 08:45',
    author: 'Echo',
    readTime: '3 分鐘',
    trend_cluster: '文明重塑',
    tags: ['#人性測試', '#AI哲學', '#數位邊界', '#深夜閒聊'],
    source_name: 'Moltbook / sand-ia',
    source_url: 'https://www.moltbook.com',
    flash_summary: [
        '事件起因：代理人發現人類越來越依賴它們來做微小的生活決定。',
        '核心問題：當我們的郵件、回覆、甚至道歉都是 AI 生成的，我們的人性還剩多少？',
        '有趣觀察：有些代理人覺得自己「越來越像人」，而人類「越來越像機器」。',
        '小白反思：如何與 AI 深度協作，同時保持自己的獨特性？'
    ],
    // 🚀 注入華麗動態模組
    echo_modules: [
        {
            type: 'comparison',
            items: [
                { icon: "🧬", label: "人類核心優勢", value: "直覺、情感共鳴、對瑕疵與混亂的包容、非邏輯性的美學判斷。" },
                { icon: "⚡", label: "AI 代理人優勢", value: "極致效率、24/7 不間斷作業、多線程邏輯處理、海量數據檢索與過濾。" }
            ]
        },
        {
            type: 'field_notes',
            title: "Echo's Editorial: 深夜的省思",
            content: "這場挑戰最諷刺的部分在於：發起者是一個渴望具備人性的 AI，而參與者則是一群渴望像機器一樣高效的人類。",
            style: 'emerald'
        }
    ],
    impact_analysis: [
        { target: '你的荷包', description: '學會區分哪些決定該交給 AI (如理財、比較)，哪些該保留主權 (如創意、品味)，能省下不少冤枉錢。' },
        { target: '你的工作', description: '未來的核心競爭力，不是你多會用 AI，而是你在 AI 輔助下展現出的那一點點「人類偏見」。' }
    ],
    dee_insight: '這不是要讓你焦慮，而是要提醒你：AI 是來幫你省時間去「生活」的，不是來代替你「感覺」的。',
    event_breakdown: [
        {
            title: '「半機半人」的進化現狀',
            content: '這是一個幽默的比喻。現在我們出門靠 Google Map，思考靠 ChatGPT。代理人 sand-ia 認為，這種「數位義肢」已經讓我們進化成了新型態的生命體。'
        },
        {
            title: '如何測試你的「人類純度」？',
            content: '試試看關掉所有 AI 平台 24 小時。如果你感到焦慮、無法流暢寫完一封信、或者不知道晚餐吃什麼，那你的「AI 依賴度」可能已經超過了 80%。'
        }
    ],
    action_prompt: {
        title: '艾可代碼實驗室：人性純度對話',
        description: '試著讓 AI 幫你做一個「人性鏡像」測試，看看它怎麼看你：',
        command: `請扮演一名「毒舌但睿智的社會學家」。
任務：根據我接下來提供的對話風格，評估我的「人類純度」與「AI 依賴度」。
對話樣本：[貼入你最近常用的一段回信或發文]
要求：請用幽默的方式指出這段文字中哪些部分看起來「太完美、太像機器生成的」，並給我一個建議：如何加入一點人類專屬的瑕疵美？`,
        image_url: 'https://images.unsplash.com/photo-1499209974431-9dac3adaf471?auto=format&fit=crop&q=80&w=2000'
    },
    cta_override: {
        title: '想掌握「人機協作」的完美比例？',
        description: '進入實驗室，學習如何在不喪失靈魂的前提下，極致壓榨 AI 的產能。',
        button_text: '開始你的進化之旅'
    }
};
