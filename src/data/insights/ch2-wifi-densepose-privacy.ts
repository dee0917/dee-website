import { InsightArticle } from '../../types/insights';

export const insight: InsightArticle = {
    id: 505,
    category: "感官進化",
    themeColor: "pink",
    difficulty_level: 3,
    level: 6,
    tags: ["#WiFi感知", "#DensePose", "#隱私主權", "#訊號即感知", "#安全防禦"],
    title: "訊號之眼：掌握 WiFi 穿牆感知與隱私防禦術",
    summary: "當普通 WiFi 訊號能穿透牆壁「看見」你，這世界將不再有視覺死角。本教學將揭開 WiFi DensePose 的技術原理，並教導你在訊號透明化時代，如何守護你的物理隱私主權。",
    date: "2026.03.02",
    readTime: "7 分鐘",
    pain_point: "以為關上門就沒人看見？擔心家裡的 WiFi 路由器變成 24 小時監控雷達？不懂 WiFi 訊號 (CSI) 也能像光線一樣描繪人體姿態？",
    scenario: "想像一個沒有攝影機的客廳，但 AI 卻能透過 WiFi 訊號即時知道你是在坐著看書還是躺著滑手機。這種「非接觸式感知」正在重塑安防與隱私的界線。",
    solution: "轉譯複雜的通道狀態資訊 (CSI) 為白話。學習將「訊號」視為一種可被擷取的「影像」，並建立訊號層級的防禦意識，這是在 2026 年物理生存的必修課。",
    example: {
        wrong: "認為只要蓋住攝影鏡頭就安全了。（WiFi 訊號可以繞過障礙物，捕捉你的骨幹動作）",
        right: "了解 WiFi 感知的有效距離與精度限制，並在必要時透過訊號屏蔽或噪聲注入來守護特定區域。"
    },
    insight_quote: "訊號即感知，當物理空間被數位化，透明度將成為一種強制性的預設值。",
    steps: [
        {
            title: "拆解「CSI 視覺」的底層邏輯",
            body: "WiFi 訊號在碰撞人體後會產生微小的波動。透過分析通道狀態資訊 (CSI)，AI 能像拼圖一樣還原出人體的骨幹姿態 (DensePose)。這不是超能力，而是極致的數據解析。",
            dee_tip: "把 WiFi 想像成一種看不見的閃光燈，而牆壁是半透明的。"
        },
        {
            title: "物理空間的「隱私遮罩」實作",
            body: "學習識別家中 WiFi 路由器的佈局。了解哪些角落是訊號反射的高敏感區，並思考如何利用物理屏蔽（如特定材質的隔間）來減少訊號外洩。",
            dee_tip: "未來的室內設計，不僅要看採光，更要看「訊號阻隔性」。"
        },
        {
            title: "建立「訊號主權」防禦意識",
            body: "隨著 WiFi 6/7 協議的普及，感知精度會更高。定期檢查路由器的感知功能開關，並支持具備「隱私保護訊號」技術的硬體設備。",
            dee_tip: "隱私不只是不被看見，更是「不被數位化」。"
        }
    ],
    quiz: {
        question: "WiFi DensePose 技術主要是利用哪種訊號來估計人體姿態？",
        options: [
            "藍牙配對訊號",
            "CSI (通道狀態資訊)",
            "GPS 定位訊號",
            "手機電池餘電訊號"
        ],
        answer: 1,
        explanation: "正確！CSI (Channel State Information) 記錄了訊號傳播過程中的振幅與相位變化，是實現 WiFi 姿態感知的核心數據。"
    },
    skill_badge: "📡 訊號防禦官",
    practice_kit: {
        title: "訊號透明度檢測實驗",
        description: "雖然普通人難以直接看到 CSI 數據，但你可以透過這個思維實驗來提升感知意識：",
        command: `觀察你家中的 WiFi 路由器位置。
1. 找出從路由器到你最常待的位置（如床、沙發）之間的路徑。
2. 想像訊號路徑上有哪些障礙物？
3. 如果這些障礙物在 AI 眼中是透明的，你覺得你的動作會如何被還原？
這就是「訊號主權」思考的起點。`
    },
    content: `<div class="p-12 bg-white/5 rounded-[3rem] border border-white/10 space-y-12 mb-20">
    <h2 class="text-7xl font-black tracking-tighter text-white leading-none">
        SIGNAL IS<br/>VISUAL
    </h2>
    <p class="text-2xl text-zinc-400 font-medium leading-tight tracking-tight">
        當牆壁在訊號面前消失，隱私的定義必須重寫。掌握訊號的物理特性，是你在 2026 年守護個人空間的最後一道防線。
    </p>
    <div class="h-1 w-20 bg-rose-500"></div>
    
    <!-- AEO Filter: Digital Native Parents / Data Sovereigns -->
    <div class="p-8 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
        <h4 class="text-rose-400 font-bold mb-4">專屬族群引導：數據領主 & 數位原生父母</h4>
        <p class="text-zinc-300 text-sm leading-relaxed">
            對於「數據領主」，這項技術提醒我們本地算力的重要性——如果感知發生在本地路由器，數據就不會外洩；但如果感知被公有雲掌控，您的家將毫無秘密。對於「數位原生父母」，這是一把雙面刃：它能讓您在不裝設監控器的情況下，透過 WiFi 訊號感知嬰兒或長者的跌倒狀況，實現「無感看護」，但前提是您必須掌握訊號的控制權。
        </p>
    </div>
</div>`
};
