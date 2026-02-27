export const insight = {
    id: 201,
    category: "入門心法",
    themeColor: "emerald",
    difficulty_level: 1,
    tags: ["#提示詞技巧", "#新手必看", "#對話邏輯"],
    title: "別再把 AI 當 Google 用！3 招讓它變成你的超強分身",
    summary: "為什麼你問 AI 問題總是被敷衍？因為你把它當搜尋引擎，而不是可以交辦任務的夥伴。換個說法，效率直接翻倍。",
    date: "2026.01.06",
    readTime: "5 分鐘",
    pain_point: "你是不是也遇過：請 ChatGPT 寫封信，結果它寫出一堆「親愛的、誠摯地」這種機器人罐頭文，最後你還是得自己重寫？",
    scenario: "以前的我總是用「關鍵字」問 AI，就像在餵 Google，結果拿到的都是沒靈魂的官方回答，根本不能直接用。",
    solution: "現在我都把 AI 當成「剛到職的聰明實習生」。我不只下指令，我還會給他身份、給他範例，並告訴他我最終要拿這份資料做什麼。",
    example: {
        wrong: "❌ 做法：「幫我寫一封跟老闆請假的 email。」結果 AI 給了一封像公文的東西，你看完比自己寫還累。",
        right: "✅ 做法：「你現在是我的私人助理，我明天要去日本玩想請假。請用我的口吻（輕鬆但有禮貌）寫一封信給老闆，記得提到我已經把工作交接給小明了。」"
    },
    insight_quote: "AI 不是答案機，而是你的數位分身。你給的細節越多，它就越像另一個你。",
    practice_kit: {
        title: "實習生交辦模板",
        description: "下次請 AI 幫忙時，試著把這三個空填滿，保證效果完全不同：",
        command: `你現在是我的 [角色，例如：私人助理 / 行銷文案手 / 英文老師]。

我要請你幫我 [具體任務，例如：寫一封請假信 / 整理會議重點 / 翻譯這段文字]。

這份成果是要給 [對象，例如：老闆 / 客戶 / 我自己] 看的。

風格請保持 [風格描述，例如：輕鬆有禮 / 專業簡潔 / 幽默口語]。

如果資訊不夠，請直接問我，不要自己猜。`
    },
    content: `
    <h2 class="text-2xl md:text-3xl font-bold text-white mb-6">你跟 AI 說話的方式，決定了它有多聰明。</h2>
    <p class="text-base md:text-lg text-zinc-300 mb-6 leading-relaxed">
        我第一次用 ChatGPT 的時候，問它：「幫我寫個自我介紹。」
    </p>
    <p class="text-base md:text-lg text-zinc-300 mb-6 leading-relaxed">
        它給了我一段像維基百科的東西。我心想：<span class="text-emerald-400 font-bold">「這什麼鬼？AI 根本沒用嘛。」</span>
    </p>
    <p class="text-base md:text-lg text-zinc-300 mb-8 leading-relaxed">
        後來我才發現，問題不在 AI，而在我。我把它當成 Google，但它其實更像一個「剛報到的聰明實習生」——你不告訴它你是誰、要給誰看、什麼風格，它當然只能給你最安全、最無聊的答案。
    </p>

    <div class="bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 mb-10">
        <h3 class="text-lg md:text-xl font-bold text-white mb-6">讓 AI 從「工讀生」變「分身」的 3 招</h3>
        <div class="step-list">
            <div class="step-item">
                <span class="step-number text-emerald-500">STEP 01</span>
                <div>
                    <p class="text-white font-bold mb-1">賦予身份：別讓它盲猜</p>
                    <p class="text-sm text-zinc-400">告訴 AI 它現在是誰——行銷高手？挑剔的總編？溫柔的客服？身份決定了它說話的深度和語氣。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-emerald-500">STEP 02</span>
                <div>
                    <p class="text-white font-bold mb-1">給出情境：這封信要給誰看？</p>
                    <p class="text-sm text-zinc-400">寫給老闆跟寫給同事，語氣差超多。加一句「這是要給誰看的」，AI 就不會亂寫。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-emerald-500">STEP 03</span>
                <div>
                    <p class="text-white font-bold mb-1">明確限制：不要什麼？要多長？</p>
                    <p class="text-sm text-zinc-400">我常說「不要用太浮誇的成語」或「控制在 200 字內」。給它框架，它才不會寫出長篇大論。</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5 mb-8">
        <p class="text-emerald-400 font-bold text-sm mb-2">💡 Dee 的真心話</p>
        <p class="text-zinc-400 text-sm leading-relaxed">
            我現在每次用 AI 前，都會花 10 秒想一下：「我要它扮演誰？給誰看？什麼風格？」光是這 10 秒，就能省下後面 10 分鐘的來回修改。
        </p>
    </div>
    `
};
