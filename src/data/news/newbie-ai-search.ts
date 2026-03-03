import { NewsArticle } from '../../types/news';
export const article: NewsArticle = {
    id: 2026030109,
    slug: 'newbie-ai-search-guide',
    title: '告別傳統 Google！三招教你用 AI 搜索「一秒找答案」不被廣告騙',
    summary: '還在 Google 搜尋結果裡翻找沒營養的廣告連結嗎？2026 年最強懶人技巧：學會用 AI 進行「對話式搜索」，不管是查餐廳、比價還是規劃行程，讓 AI 幫你過濾廢話，直接給結論。',
    category: '懶人神器',
    themeColor: 'amber',
    date: '2026.03.02',
    publish_time: '2026-03-02 07:15',
    author: 'Echo',
    readTime: '3 分鐘',
    tags: ['#AI搜索', '#懶人技巧', '#新手教學', '#Perplexity', '#ChatGPT'],
    source_name: 'OpenAI / Perplexity',
    source_url: 'https://chatgpt.com',
    flash_summary: [
        '傳統搜尋：輸入關鍵字 -> 點開 5 個網站 -> 自己整理資料。',
        'AI 搜尋：直接問問題 -> AI 讀完所有網站 -> 給你精確總結並附上來源。',
        '優點：完全沒有廣告干擾，且能處理「幫我比較這三台吸塵器」這種複雜任務。',
        '推薦工具：ChatGPT Search 功能與 Perplexity AI。'
    ],
    impact_analysis: [
        { target: '你的荷包', description: '透過 AI 精確比價與尋找真實評價，避免被業配文誤導導致衝動消費。' },
        { target: '你的工作', description: '大幅縮短資料蒐集時間，原本要查 20 分鐘的資訊，現在只需 10 秒。' }
    ],
    dee_insight: '搜尋的本質是「獲取答案」，而不是「獲取連結」。AI 正在把搜尋的主權還給使用者。',
    event_breakdown: [
        {
            title: '為什麼你該放棄「關鍵字」搜尋？',
            content: '在 Google 搜尋「台北最好吃拉麵」，你會看到一堆買廣告的店家。但在 AI 搜尋輸入「請幫我整理台北評價 4.5 分以上、適合聚餐且不限時的拉麵店」，AI 會根據各大論壇的真實討論幫你篩選出真正的名單。'
        },
        {
            title: '新手必學的搜尋三部曲',
            content: '1. 定義背景：告訴 AI 你在哪裡、預算多少。2. 明確需求：你要找的是資訊還是建議。3. 要求來源：請 AI 列出它參考了哪些網站，確保它沒在胡說八道。'
        }
    ],
    action_prompt: {
        title: '立即體驗「精準搜索」',
        description: '試著把這段指令貼給你的聊天 AI，看看它與 Google 的差別：',
        command: '我想在 [你的城市] 找一家 [料理類型，如：義大利菜] 餐廳。條件：1. 必須適合 [人數] 聚餐。2. 評論中必須提到過 [某道菜，如：提拉米蘇] 很出色。3. 請列出三家並整理它們的優缺點與訂位連結。',
        image_url: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=2000'
    },
    cta_override: {
        title: '不想再被廣告耍得團團轉？',
        description: '進入實驗室，學習更多 AI 搜尋黑話，讓精準情報成為你的直覺。',
        button_text: '立即開啟搜尋革命'
    }
};
