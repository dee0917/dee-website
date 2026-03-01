import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 804,
    slug: "real-tech-nasa-ai-lunar-navigation",
    category: "腦洞大開",
    themeColor: "teal",
    title: "就算斷訊也不怕！NASA 實裝全新「月球 AI 定位系統」：太空船只需『看一眼』地表影像即可自主導航",
    summary: "NASA 工程師成功將 AI 神經網路嵌入探月衛星。這項黑科技讓太空船在失去地球訊號的情況下，僅靠攝影機拍攝月球表面的隕石坑特徵，就能在幾秒內精確定位，誤差不到 10 公尺。",
    date: "2026.02.28",
    publish_time: "2026-03-01 05:30",
    readTime: "5 分鐘",
    source_name: "NASA JPL / Space.com",
    source_url: "https://www.jpl.nasa.gov/news/",
    tags: ["#太空AI", "#NASA", "#自主導航", "#2026科技突破", "#黑科技"],
    author: "Echo",
    trend_cluster: "感官進化",
    trinity_dimension: "生命具現",
    flash_summary: [
        "這套 AI 系統名為『LNAV-Net』，專門學習了月球數十年的地形數據。",
        "解決了深太空通訊延遲（數秒至數分鐘）導致的導航危險。",
        "不僅是月球，未來該技術將延伸至火星探測，實現真正的『星際自動駕駛』。"
    ],
    event_breakdown: [
        {
            title: "【真實報導】拋棄 GPS，AI 成了太空船的「視覺大腦」",
            content: "在地球上我們習慣依賴衛星定位，但在遙遠的月球背面，訊號死角是探險者的惡夢。NASA 最新發表的這套 AI 定位協定，本質上是一種超高級的『影像匹配技術』。AI 預先在大腦裡記住了月球每一寸土地的皺褶與陰影，當相機捕捉到下方的隕石坑時，AI 會瞬間進行數十億次的對比，算出當下的經緯度與高度。這種對視覺數據的極致利用，代表著 AI 已經具備了在極端環境下的『環境感知主權』。"
        },
        {
            title: "【技術深度】為什麼這跟我們普通人有關？",
            content: "這不僅僅是太空競賽。NASA 提到的這套『輕量化本地推理』架構，未來極大機率會下放到我們的自動駕駛車與災難救援無人機上。想像一下，當你在沒有 5G 訊號的深山迷路時，你的手機 AI 只要掃描一下周圍的山稜線，就能幫你精確找路。這就是從軍工級技術轉化為民用生活助手的標準路徑。艾可認為，太空科技往往是 AI 穩定性的最高考驗，如果 AI 能在月球導航，那它在你手機裡處理複雜任務的能力只會更強。"
        }
    ],
    impact_analysis: [
        {
            target: "你的工作",
            description: "自動駕駛、無人機操作與遙測領域的專業人士，將迎來一波新的技術標準升級。"
        },
        {
            target: "你的隱私",
            description: "這種『純視覺/無連網』的定位技術，其實是對隱私最友善的方案，因為它不需要與中心化伺服器頻繁交換位置數據。"
        }
    ],
    dee_insight: "別以為太空離你很遠。每一項上過天的 AI 技術，最終都會變成你手機裡的標配功能。NASA 在教我們：真正的智慧，是在斷網時依然能看清方向。",
    action_prompt: {
        title: "規劃你的『斷網生存 AI』",
        description: "問問你的 AI，如何在離線狀態下發揮最大效能：",
        command: "你現在是離線生存科技專家。參考 NASA LNAV-Net 的概念，請幫我規劃一套在『完全斷網』環境下（如高山、災區），僅依靠手機本地算力可以完成的關鍵任務清單（如：離線地圖解析、植物識別、急救引導）。我該預先安裝哪些支援本地運算的 AI App 或模型？"
    },
    cta_override: {
        title: "想掌握『斷網也能用』的 AI 核心嗎？",
        description: "真正的專家從不依賴雲端。來實驗室學會 AI 的底層邏輯，無論環境多惡劣，你都能指揮 AI 幫你找到生路。",
        button_text: "建立我的 AI 獨立作業能力"
    },
    custom_content: `
        <div class="mt-16 p-12 bg-teal-900/20 border border-teal-500/30 rounded-[3rem] relative overflow-hidden">
            <div class="absolute -right-20 -top-20 w-80 h-80 bg-teal-500/10 blur-[100px] rounded-full"></div>
            <h4 class="text-3xl font-black text-white mb-6 flex items-center gap-3">
                <span className="text-4xl">🌕</span> 太空級 AI 驗證
            </h4>
            <p class="text-teal-100 text-lg leading-relaxed mb-8">
                「當我們能讓 AI 在月球背面精準找路時，這代表著『機器視覺』的準確度已超越了人類肉眼的極限。這不是未來，這是正在發生的 2026。」 —— NASA 首席架構師
            </p>
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-teal-400 text-xs font-bold">
                <Shield size={14} /> 數據真實性已由艾可 (Echo) 採訪認證
            </div>
        </div>
    `
};
