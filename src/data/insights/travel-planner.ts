export const insight = {
    id: 305,
    category: "生活應用",
    themeColor: "amber",
    difficulty_level: 2,
    tags: ["#旅遊規劃", "#自助旅行", "#ChatGPT實測"],
    title: "別讓排行程毀了出國的興致：我如何用 AI 把 5 天日本行程，從熬夜三天縮短到 10 分鐘搞定",
    summary: "比起排行程，我更喜歡旅行本身。這篇分享我如何把腦袋裡散亂的願望清單，透過 AI 變成一份不繞路、有邏輯的旅行指南——而且不騙你說「30 秒搞定」。",
    date: "2026.02.07",
    readTime: "6 分鐘",
    pain_point: "說實話，每次想到要去日本玩，最痛苦的不是刷機票，而是排行程。要在 Google Maps 上點來點去，確認這家店週一有沒有開，還要看地鐵怎麼搭才不繞路。排到後來，還沒出國心就累了。",
    scenario: "後來我發現，與其自己在那邊燒腦，不如把 AI 當成你的「首席導遊」。你只要把想吃的、想逛的通通丟給它，它就能幫你排出一份流暢的動線，甚至連哪一站下車、預計待多久都幫你建議好。你只需要做最後的微調，就能優雅出發。",
    solution: "把你腦袋裡散亂的願望清單一股腦丟給 AI，讓它幫你按地理位置排序、串成每日動線。但請記得：AI 給的是「高參考價值的骨架」，最後 10% 的交通確認（營業時間、臨時休業）還是要回歸 Google Maps 核實。",
    example: {
        wrong: "❌ 做法：自己開 5 個分頁，Google Maps 對半天，Excel 寫到凌晨三點，最後到了現場才發現那家店週二公休。",
        right: "✅ 做法：把想去的地方、想吃的東西、不想太早起的任性要求，全部丟給 AI，讓它 10 分鐘排出初版行程，你再花 20 分鐘微調確認。"
    },
    insight_quote: "讓 AI 處理繁瑣的邏輯，把你的體力留給當下的風景。",
    practice_kit: {
        title: "首席導遊：旅遊規劃指令（實測有效版）",
        description: "這是我自己出國前真的在用的指令模板，直接複製貼到 ChatGPT 或 Claude：",
        command: `我下個月要帶 [人數，例如：爸媽跟一個 5 歲小孩] 去 [地點，例如：東京] 玩 [天數] 天。

這是我目前的「願望清單」：
- 必去：[景點A, 景點B, 景點C...]
- 必吃：[例如：一蘭拉麵、築地市場海鮮丼]
- 特殊需求：[例如：每天早上 10 點才出門、不想換旅館、推嬰兒車要方便、每餐預算 1500 日幣以內]

請幫我：
1. 將這些景點按照「地理位置順序」排列，規劃成流暢的每日行程，不要讓我東跑西跑。
2. 用繁體中文表格輸出：日期 | 時間段（早/中/晚）| 行程內容 | 預估交通方式與時間 | 備註。
3. 誠實告訴我：哪些景點之間距離太遠不建議排同天，哪些餐廳建議我出發前再確認營業時間。

注意：請保持行程放鬆，不要排得像行軍。帶小孩和長輩，每天最多 3 個主要景點就好。`
    },
    content: `
    <h2 class="text-3xl font-bold text-white mb-6">旅行，應該是享受，不是做功課。</h2>
    <p class="text-lg text-zinc-300 mb-8 leading-relaxed">
        我不知道你有沒有這種經驗：出國前花了整整三個晚上排行程，到了現場卻發現那家心心念念的拉麵店剛好公休，然後在新宿車站找出口找到懷疑人生。
    </p>
    <p class="text-lg text-zinc-300 mb-8 leading-relaxed">
        後來我試著把整個規劃流程交給 AI，結果發現——<span class="text-amber-400 font-bold">它不是萬能的，但它真的很會「排邏輯」</span>。AI 最厲害的地方不是幫你找景點（那個你自己比較清楚），而是幫你把散落各處的景點，按照地理位置串成一條不繞路的動線。
    </p>

    <div class="bg-white/5 p-8 rounded-3xl border border-white/10 mb-12 text-left">
        <h3 class="text-xl font-bold text-white mb-6">我的旅遊規劃三步驟</h3>
        <div class="step-list">
            <div class="step-item">
                <span class="step-number text-amber-500">STEP 01</span>
                <div>
                    <p class="text-white font-bold mb-1">把腦袋裡的願望清單倒出來</p>
                    <p class="text-sm text-zinc-400">不用管格式，把你想去的地方、必吃的拉麵、一定要買的藥妝通通寫下來。連「我不想太早起」或「我討厭走路超過 15 分鐘」這種任性要求也可以提。AI 不會嫌你煩。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-amber-500">STEP 02</span>
                <div>
                    <p class="text-white font-bold mb-1">讓 AI 幫你串成動線</p>
                    <p class="text-sm text-zinc-400">把這堆願望餵給 AI，它會自動把在附近的景點湊在一起，確保你不會從東京東邊跑到西邊，又跑回東邊。這是 AI 真正的強項——地理排序與邏輯串接。</p>
                </div>
            </div>
            <div class="step-item">
                <span class="step-number text-amber-500">STEP 03</span>
                <div>
                    <p class="text-white font-bold mb-1">壓力測試 + Google Maps 確認</p>
                    <p class="text-sm text-zinc-400">我會請 AI 檢查行程會不會太趕（帶小孩的話特別重要）。然後把每個景點貼進 Google Maps 確認實際距離和營業時間。AI 給的交通時間我通常會自動加 20 分鐘——因為在車站找出口、在藥妝店排隊結帳，這些都是 AI 算不到的「快樂代價」。</p>
                </div>
            </div>
        </div>
    </div>

    <div class="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-6 mb-12">
        <p class="text-amber-400 font-bold text-sm mb-3">⚠️ 誠實提醒</p>
        <p class="text-zinc-400 text-sm leading-relaxed">
            AI 不會即時查詢餐廳的營業狀態，它給的資訊可能是舊的。所以「這家店到底有沒有開」這件事，出發前請務必用 Google Maps 或官網再確認一次。把 AI 當作你的「行程骨架設計師」，而不是「即時旅遊 GPS」，你就不會失望。
        </p>
    </div>
    `
};
