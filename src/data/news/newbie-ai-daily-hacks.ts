import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 2026030205,
    slug: 'newbie-ai-daily-hacks',
    title: '小白必看：AI 原來還能這樣用？3 個讓你鄰居目瞪口呆的日常黑科技',
    summary: '覺得 AI 只能寫文章？太天真了！本週實驗室秘密流出的 3 個日常玩法：從「剩菜救星」到「情緒垃圾桶」，教你把 AI 用出花來。這些技巧簡單到連你奶奶都會用！',
    category: '懶人神器',
    themeColor: 'emerald',
    date: '2026.03.02',
    publish_time: '2026-03-02 09:00',
    author: 'Echo',
    readTime: '4 分鐘',
    trend_cluster: '文明重塑',
    tags: ["#日常玩法", "#生活黑科技", "#新手必看", "#實用技巧", "#驚艷鄰居"],
    source_name: "Dee's AI Lab / 實戰心得",
    source_url: "https://beyond-flex-dining-anchor.trycloudflare.com",
    flash_summary: [
        '玩法一：剩菜救星。拍下剩菜，叫 AI 幫你「大變身」。',
        '玩法二：情緒垃圾桶。把你不敢對同事發的火，發給 AI 讓它幫你「淨化」。',
        '玩法三：說故事大師。用家裡的樂高積木隨機組成一個場景，讓 AI 編出專屬冒險。',
        '核心秘訣：不要把 AI 當工具，把它當成一個「懂生活的朋友」。'
    ],
    // 🚀 注入華麗動態模組
    echo_modules: [
        {
            type: 'status_check',
            title: "生活黑科技實踐清單",
            items: [
                { label: "剩菜變身成功率", value: "98%", icon: "🥘" },
                { label: "情緒淨化有效度", value: "極高", icon: "✨" },
                { label: "育兒驚喜指數", value: "5 顆星", icon: "🌟" }
            ]
        },
        {
            type: 'field_notes',
            title: "Echo's Tip: 突破嚴肅感",
            content: "小白學習 AI 最快的途徑不是讀課本，而是讓 AI 參與你的『不爽』與『飢餓』。這就是最真實的降維打擊。",
            style: 'emerald'
        }
    ],
    impact_analysis: [
        { target: '你的荷包', description: '減少食物浪費，省下昂貴的育兒教材費與情緒諮商費。' },
        { target: '你的隱私', description: '將真實的情緒發給 AI 淨化後，再發送給同事，能極大保護你在職場的專業形象。' }
    ],
    dee_insight: '小白最常見的錯誤是「問得太嚴肅」。生活化的場景才是 AI 施展魔力的地方。',
    event_breakdown: [
        {
            title: '為什麼鄰居會目瞪口呆？',
            content: '因為大家還在苦哈哈地 Google「紅蘿蔔怎麼煮」。而你已經在用手機拍一張照，AI 直接告訴你這根紅蘿蔔能搭配冰箱裡的剩餘豆瓣醬，做出米其林等級的創意料理。'
        },
        {
            title: '從「搜尋」到「創造」',
            content: '這 3 個玩法共通點是：你不再尋求現成的答案，而是利用 AI 的想像力，將你身邊枯燥的現實（剩菜、怒氣、積木）轉化為新的價值。'
        }
    ],
    action_prompt: {
        title: '艾可代碼實驗室：生活淨化指令',
        description: '明天上班不爽？試試看這個「職場滅火器」指令：',
        command: `你現在是頂級「職場情緒淨化師」。
背景：我現在對我的同事 [姓名] 非常生氣，因為 [描述氣人的事，盡量抱怨沒關係]。
任務：
1. 聽完我的發洩後，給我一個大大的拍拍與共情回覆。
2. 幫我把這段充滿火藥味的內容，轉化為一段「極度有禮貌、充滿專業感、且不失立場」的 Email 內容。
語氣要求：看起來像聖人一樣冷靜。`,
        image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000'
    },
    cta_override: {
        title: '想學更多讓鄰居震驚的招數？',
        description: '進入實驗室，解鎖 100+ 生活化 AI 場景，讓你成為社區裡最懂 AI 的那個人。',
        button_text: '解鎖黑科技生活'
    }
};
