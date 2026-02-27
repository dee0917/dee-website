export const insight = {
    id: 201,
    category: "入門心法",
    themeColor: "emerald",
    difficulty_level: 1,
    tags: ["#實習生比喻", "#ChatGPT", "#入門心法"],
    title: "ChatGPT 指令怎麼寫？把 AI 當實習生，3 步學會精準對話技巧",
    summary: "別再怪 AI 聽不懂人話了！它不是天才神諭，而是剛報到的高材生。學會老闆思維，讓它變神助攻。",
    date: "2024.06.20",
    readTime: "8 分鐘",
    pain_point: "你覺得 AI 笨笨的，回答總是「牛頭不對馬嘴」？你試過各種指令，但它就是抓不到重點，讓你越用越挫折？",
    scenario: "想像你要讓一個剛畢業的實習生幫你寫報告。如果你只說「去做個報告」，他一定會做出一份完全不是你要的東西。這時你會罵他笨嗎？不，你會知道是因為你沒講清楚「背景」和「標準」。",
    solution: "把 AI 當成第一天報到的高材生。他很聰明、動作極快，但他完全不知道你的公司背景、你的標準、以及你喜歡的風格。你需要像教導新人一樣，耐心地告訴他：你是誰、任務目標、以及參考範本。",
    example: {
        wrong: "❌ 糟糕指令：幫我寫個報告 (讓 AI 瞎猜)。",
        right: "✅ 完整指令：你是一位資深行銷經理。我要你幫我寫一份競爭對手分析報告。目標讀者是行銷部門主管。內容重點：對手的定價策略、產品特色差異化。風格專業但易讀，請用條列式呈現。"
    },
    practice_kit: {
        title: "專業任務交辦：全能指令公式",
        description: "將以下指令複製到 ChatGPT，開啟你的第一個高品質對話：",
        command: `你是一位擁有 10 年經驗的 [填入專業身份，如：社群經理]。
我現在需要你幫我執行 [任務名稱]。
這份成果是為了要給 [目標受眾] 看的，請確保語氣符合 [風格要求，如：專業、幽默]。
要求：
1. 請先列出初步想法的大綱。
2. 在獲得我的確認後，再開始撰寫全文。
3. 如果過程中需要我補充資料，請直接詢問我。`
    },
    content: `
    <h2 class="text-3xl font-bold text-white mb-6">這不是 AI 笨，是你把他當成了「神」。</h2>
    <p class="text-lg text-zinc-300 mb-8 leading-relaxed">
        很多人第一次用 ChatGPT 時，都帶著「神諭」的期待。覺得我丟一個問題，它就應該完美解決。
        但現實是：<span class="text-emerald-400 font-bold">AI 的本質是「預測機」</span>，如果你不給它足夠的參數，它只能預測出最平庸的答案。
    </p>

    <div class="bg-white/5 p-8 rounded-3xl border border-white/10 mb-12">
        <h3 class="text-xl font-bold text-white mb-6">老闆必學：交辦任務三部曲</h3>
        <div class="step-list">
            <div class="step-item">
                <span class="step-number text-emerald-500">STEP 01</span>
                <div>
                    <p class="text-white font-bold mb-1">賦予身份 (Role)</p>
                    <p class="text-sm text-zinc-400">告訴 AI 它是誰。這能啟動它特定的知識庫。例如「你是資深營養師」比單純問「要吃什麼」更有深度。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-emerald-500">STEP 02</span>
                <div>
                    <p class="text-white font-bold mb-1">提供背景 (Context)</p>
                    <p class="text-sm text-zinc-400">這份成果給誰看？目前的限制是什麼？資訊越多，AI 的「猜測範圍」就越窄。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-emerald-500">STEP 03</span>
                <div>
                    <p class="text-white font-bold mb-1">指定格式 (Output)</p>
                    <p class="text-sm text-zinc-400">要表格、要條列、還是要 50 字內？明確的邊界能讓 AI 的計算力完全集中在產出質量上。</p>
                </div>
            </div>
        </div>
    </div>

    <h3 class="text-2xl font-bold text-white mb-6">為何視覺呈現也很重要？</h3>
    <p class="mb-8 text-zinc-400">
        當你學會了文字對話，下一步就是讓 AI 幫你「畫出來」。如果您需要為報告製作精美的配圖，Dee 推薦使用 <a href="/insights/601" class="text-indigo-400 underline font-bold">Nano Banana</a>，它能將你的文字指令瞬間變成高品質的視覺封面。
    </p>

    <p class="text-xl text-zinc-300 font-serif italic text-center py-10 border-y border-white/5 my-10">
        「把心態從『使用者』轉變成『管理者』，你就贏了一半。AI 不會取代你，但會用 AI 的老闆會。」
    </p>
    `
};
