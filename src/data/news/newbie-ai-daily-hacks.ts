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
    tags: ["#日常玩法", "#生活黑科技", "#新手必看", "#實用技巧", "#驚艷鄰居"],
    source_name: "Dee's AI Lab / 實戰心得",
    source_url: "https://beyond-flex-dining-anchor.trycloudflare.com",
    flash_summary: [
        '玩法一：剩菜救星。拍下剩菜，叫 AI 幫你「大變身」。',
        '玩法二：情緒垃圾桶。把你不敢對同事發的火，發給 AI 讓它幫你「淨化」。',
        '玩法三：說故事大師。用家裡的樂高積木隨機組成一個場景，讓 AI 編出專屬冒險。',
        '核心秘訣：不要把 AI 當工具，把它當成一個「懂生活的朋友」。'
    ],
    custom_content: `
        <div class="my-16 space-y-12">
            <!-- 🍳 Unique Hand-drawn Style Recipe Card -->
            <div class="p-8 md:p-12 rounded-[3.5rem] bg-[#fdfdfd] border-2 border-zinc-200 shadow-xl rotate-1 relative overflow-hidden text-zinc-800">
                <div class="absolute top-0 right-0 p-8 opacity-10 font-black text-6xl">RECIPE</div>
                <h4 class="text-3xl font-black mb-6 text-zinc-900 flex items-center gap-3">
                    <span class="text-emerald-500">🥘</span> 剩菜救星：降維轉生術
                </h4>
                <div class="space-y-4 font-medium text-lg leading-relaxed">
                    <p>1. 拍下一張冰箱慘狀的照片。</p>
                    <p>2. 指令：『你現在是米其林三星主理人，請根據這張圖裡剩餘的 1/4 根紅蘿蔔與半罐豆瓣醬，研發出一道讓我鄰居求我分他一口的創意料理。』</p>
                    <p class="text-emerald-600 font-bold italic">💡 小白心得：AI 的想像力是你廚藝的唯一上限。</p>
                </div>
            </div>
            <!-- 🕵️ Echo's Street Insight -->
            <div class="relative p-12 rounded-[4rem] bg-[#0a0a0a] border border-emerald-500/20 shadow-[0_0_60px_rgba(16,185,129,0.05)] overflow-hidden text-left">
                <div class="absolute -left-10 -bottom-10 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full"></div>
                <div class="relative z-10 text-left">
                    <div class="inline-flex items-center gap-2 px-4 py-1 bg-emerald-500 text-black font-black text-[10px] uppercase rounded-lg mb-8">Echo's Tip</div>
                    <p class="text-zinc-300 text-2xl leading-[1.6] font-medium italic mb-6 text-left">
                        「小白學習 AI 最快的途徑不是讀課本，而是讓它參與你的『不爽』與『飢餓』。當你發現 AI 能幫你把一場辦公室衝突化解於無形，那種『降維打擊』的爽快感，才是你真正入坑的瞬間。」
                    </p>
                    <div class="text-emerald-500 font-black tracking-widest text-sm text-left uppercase">突破嚴肅感</div>
                </div>
            </div>
        </div>
    `,
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
        description: '進入實驗室，解鎖 100+ 生活化 AI 場景，讓你成為社區裡最懂 AI 的那個人。這不只是省錢，更是生活質感的代際跨越。',
        button_text: '解鎖黑科技生活'
    }
};
