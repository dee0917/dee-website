export const insight = {
    id: 202,
    category: "入門心法",
    themeColor: "emerald",
    difficulty_level: 1,
    tags: ["#優化對話", "#迭代技巧", "#實戰案例"],
    title: "AI 回答太爛？試試「打桌球互動法」，60 分瞬間變 100 分",
    summary: "別期待 AI 能一次到位。好答案是「聊」出來的，不是下指令下出來的。學會這招，你會發現 AI 其實超聽話。",
    date: "2026.01.10",
    readTime: "5 分鐘",
    pain_point: "你是不是也試了一次，發現 AI 答非所問，就心灰意冷地關掉視窗，覺得「AI 根本沒傳說中那麼神」？",
    scenario: "我之前請 AI 幫我寫週報，第一版超像公文。我沒放棄，我回它：「太嚴肅了，加點口語，並強調這週我的專案超標 10%」。第二版就完全是我要的東西。",
    solution: "把對話當成打桌球。它打過來一個普通的答案，你加點旋球（回饋）打回去。來回三回合，答案就會精準到讓你驚訝。重點是——AI 不會累、不會生氣、更不會覺得你煩。",
    example: {
        wrong: "❌ 做法：回答不滿意就直接放棄，或是一直重複貼上一模一樣的指令祈禱奇蹟。",
        right: "✅ 做法：「剛剛這段不錯，但第二點太長了，幫我縮減成一句話。另外口吻改幽默一點，像跟朋友聊天那樣。」"
    },
    insight_quote: "AI 不會累、不會生氣、更不會覺得你煩。盡情地壓榨它，直到你滿意為止。",
    practice_kit: {
        title: "打桌球修正指令",
        description: "當 AI 給出 60 分的答案時，直接貼上這句來調整：",
        command: `你剛才的回答已經完成了大概 60%。

請針對以下部分進行修改：
1. [指出哪裡不好，例如：第二段太囉唆，請縮短一半]
2. [指出風格問題，例如：語氣太正式，改成像朋友聊天]
3. [指出缺少什麼，例如：請多加一個生活化的例子]

保留目前好的部分，只改需要調整的地方。`
    },
    content: `
    <h2 class="text-2xl md:text-3xl font-bold text-white mb-6">第一次回答只有 60 分，很正常。</h2>
    <p class="text-base md:text-lg text-zinc-300 mb-6 leading-relaxed">
        很多人看到不滿意的回答就關掉視窗。拜託不要！
    </p>
    <p class="text-base md:text-lg text-zinc-300 mb-8 leading-relaxed">
        最精彩的內容，通常在<span class="text-emerald-400 font-bold">第三、第四次對話</span>才出現。就像打桌球——發球只是開始，來回接殺才是精彩的部分。
    </p>

    <div class="bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 mb-10">
        <h3 class="text-lg md:text-xl font-bold text-white mb-6">打桌球三步驟</h3>
        <div class="step-list">
            <div class="step-item">
                <span class="step-number text-emerald-500">STEP 01</span>
                <div>
                    <p class="text-white font-bold mb-1">發球：先求有，再求好</p>
                    <p class="text-sm text-zinc-400">第一球通常是試探。先看 AI 懂不懂你的大方向。不滿意很正常，這只是暖身。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-emerald-500">STEP 02</span>
                <div>
                    <p class="text-white font-bold mb-1">接球：精準吐槽，哪裡不好直接說</p>
                    <p class="text-sm text-zinc-400">「這段太囉唆」、「語氣太正式」、「這點不符合我的情況」。你回饋越具體，AI 進化就越快。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-emerald-500">STEP 03</span>
                <div>
                    <p class="text-white font-bold mb-1">殺球：要求多版本，二選一最快</p>
                    <p class="text-sm text-zinc-400">我常說「給我三種不同的標題」或「給我一個正式版和一個口語版」。從中挑最好的來改，省時又省力。</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5 mb-8">
        <p class="text-emerald-400 font-bold text-sm mb-2">📌 真實案例：週報改造記</p>
        <p class="text-zinc-400 text-sm leading-relaxed">
            第一版：AI 給了一份像政府公文的週報。❌<br/>
            我回它：「太嚴肅了，用口語，並強調專案超標 10%。」<br/>
            第二版：語氣好多了，但忘了加數據。<br/>
            我再說：「請把超標 10% 的具體數字放在第一段。」<br/>
            第三版：✅ 完美！直接交給主管。<br/><br/>
            整個過程不到 3 分鐘。
        </p>
    </div>
    `
};
