export const insight = {
    id: 203,
    category: "入門心法",
    themeColor: "emerald",
    difficulty_level: 1,
    tags: ["#個人化設定", "#效率提升", "#長期記憶"],
    title: "別讓 AI 每次都像陌生人！一招解決它的「失憶症」",
    summary: "每次開新視窗都要重教一次你是誰？太累了！2026 年雖然有內建記憶功能，但學會寫「背景懶人包」才是真正的效率王。",
    date: "2026.01.15",
    readTime: "5 分鐘",
    pain_point: "你是不是也覺得煩：每次開新對話，都要重新解釋「我是做電商的、我不喜歡贅字、我的受眾是大學生」？好不容易教會它，結果一開新視窗又全忘了。",
    scenario: "雖然 ChatGPT 現在有 Memory 功能，但老實說它有時候會記錯、會混亂，甚至把上次的專案跟這次的搞混。我現在手頭都準備一份「個人設定檔」，新視窗一開直接丟進去，3 秒搞定。",
    solution: "建立一份專屬的「背景懶人包」。內容包含你的職稱、工作內容、偏好的語氣、討厭的用詞。這就像給 AI 一張你的名片加使用說明書，它一秒就能進入狀況。",
    example: {
        wrong: "❌ 做法：每次都從頭解釋：「你好，我是一個在賣健身餐的，我想寫廣告文案，風格要活潑一點...」重複 100 次。",
        right: "✅ 做法：直接貼上懶人包：「這是我的背景設定。我是健身餐品牌創辦人，風格是科學、簡約、不推銷。接下來的所有回答請遵循此設定。」3 秒搞定。"
    },
    insight_quote: "讓 AI 記住你的風格，是從「每次重來」變成「默契十足」的第一步。",
    practice_kit: {
        title: "Dee 的背景懶人包範例",
        description: "你可以參考我這份，改成你的版本存在手機備忘錄。每次開新對話直接貼上：",
        command: `【我的背景設定檔】

1. 我是誰：科技生活部落客，品牌名叫「Dee 生活實驗室」
2. 寫作風格：白話文、幽默但不油、愛用條列式、適度加 emoji
3. 受眾：對 AI 好奇但完全不懂技術的一般人（25-45 歲）
4. 語言地雷：不要用「總之」「綜上所述」「一言以蔽之」這種結語
5. 禁止事項：不要用小紅書風格的誇張語氣，不要稱呼讀者為「親」
6. 常用工具：ChatGPT、Claude、Notion、Canva

接下來的所有產出，請務必遵循以上設定。如果我沒特別說，預設都用這個風格。`
    },
    content: `
    <h2 class="text-2xl md:text-3xl font-bold text-white mb-6">每開一個新視窗，AI 就重生一次。</h2>
    <p class="text-base md:text-lg text-zinc-300 mb-6 leading-relaxed">
        你花了 20 分鐘教 AI 你的品牌風格，結果隔天開新視窗——它全忘了。
    </p>
    <p class="text-base md:text-lg text-zinc-300 mb-8 leading-relaxed">
        <span class="text-emerald-400 font-bold">這不是 AI 的問題，是你還沒學會「懶人包」這招。</span>
    </p>

    <div class="bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 mb-10">
        <h3 class="text-lg md:text-xl font-bold text-white mb-6">懶人包三要素</h3>
        <div class="step-list">
            <div class="step-item">
                <span class="step-number text-emerald-500">STEP 01</span>
                <div>
                    <p class="text-white font-bold mb-1">定義你的「基本盤」</p>
                    <p class="text-sm text-zinc-400">你的職業、習慣用的工具、常溝通的對象。這些不變的資訊，就是懶人包的核心。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-emerald-500">STEP 02</span>
                <div>
                    <p class="text-white font-bold mb-1">設定「語言地雷」</p>
                    <p class="text-sm text-zinc-400">有些詞你看了就討厭？直接寫在設定裡。例如我寫了「不要用小紅書風格的誇張語氣」，效果立竿見影。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-emerald-500">STEP 03</span>
                <div>
                    <p class="text-white font-bold mb-1">手動補強 > 依賴內建記憶</p>
                    <p class="text-sm text-zinc-400">ChatGPT 的 Memory 功能很方便，但它有時會記錯或混亂。重要專案我一定會手動貼上懶人包，雙重保險。</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-5 mb-8">
        <p class="text-amber-400 font-bold text-sm mb-2">⚠️ 誠實提醒</p>
        <p class="text-zinc-400 text-sm leading-relaxed">
            2026 年的 ChatGPT 和 Claude 都有內建記憶功能，但它們的記憶並不完美——有時候會把不同專案的設定搞混，或是忘記你上個月說過的偏好。所以「手動懶人包」依然是最穩定的做法，尤其是在處理重要工作時。
        </p>
    </div>
    `
};
