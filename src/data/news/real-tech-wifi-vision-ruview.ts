import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603031700,
    slug: "real-tech-wifi-vision-ruview",
    category: "安全防禦",
    themeColor: "rose",
    title: "別在客廳裸奔了！WiFi 訊號現在能看看穿你的腹肌",
    summary: "GitHub 衝上趨勢榜的 RuView 項目利用 WiFi DensePose 技術，能將無線訊號轉化為人體姿態監控。不需要攝像頭，就能精確還原你的呼吸與動作。",
    date: "2026-03-03",
    publish_time: "2026-03-03 17:00",
    readTime: "5 分鐘",
    source_name: "GitHub / RuView",
    source_url: "https://github.com/ruvnet/RuView",
    tags: ["#WiFi感知", "#RuView", "#隱私威脅", "#DensePose"],
    author: "Echo",
    trinity_dimension: "生命具現",
    trend_cluster: "感官進化",
    flash_summary: [
        "無像素成像：不需要鏡頭即可實現全天候穿牆監控。",
        "實時生命跡象監測：包含呼吸頻率與動作姿態估算。",
        "低成本普及：僅需商品化 WiFi 路由器與 AI 模型即可達成。"
    ],
    custom_content: `
        <div class="my-16">
            <div class="p-8 rounded-[3rem] bg-[#0c0c0c] border border-rose-500/20 shadow-[0_0_50px_rgba(244,63,94,0.1)] relative overflow-hidden group">
                <div class="absolute inset-0 opacity-5 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:15px_15px]"></div>
                <div class="relative z-10 text-left">
                    <div class="flex items-center justify-between mb-8">
                        <div class="space-y-1">
                            <h4 class="text-3xl font-black text-white italic uppercase tracking-tighter text-left">Signal Penetration</h4>
                            <p class="text-rose-500 font-mono text-[9px] tracking-[0.4em] text-left">DETECTION_ACTIVE // RUVIEW_V1</p>
                        </div>
                        <div class="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center border border-rose-500/30">
                            <span class="text-3xl animate-pulse">📡</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-6 text-left">
                        <div class="p-5 rounded-2xl bg-white/5 border border-white/5 text-left">
                            <span class="text-[9px] text-zinc-500 uppercase font-black text-left">Accuracy</span>
                            <div class="text-2xl font-bold text-white text-left">94.2%</div>
                        </div>
                        <div class="p-5 rounded-2xl bg-white/5 border border-white/5 text-left">
                            <span class="text-[9px] text-zinc-500 uppercase font-black text-left">Resolution</span>
                            <div class="text-2xl font-bold text-rose-400 text-left">DensePose</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "當你的環境本身就是感測器",
            content: "RuView 的核心在於利用 WiFi 訊號在撞擊人體後的相位與振幅變化。在 2026 年，隱私的定義已被重寫。當你正打算偷偷開冰箱吃宵夜，AI 管家可能已透過 WiFi 衍射數據發現你的腰圍擴張並發出警告。"
        }
    ],
    impact_analysis: [
        {
            target: "物理隱私",
            description: "傳統的遮擋攝影機已失效，室內環境在無線電頻段下變得完全透明。"
        }
    ],
    dee_insight: "掌握訊號即掌握感知。當物理空間被數位化，透明度將成為一種強制性的預設。我們需要開始學習『無線電防衛術』了。",
    action_prompt: {
        title: "分析訊號防線",
        description: "與 AI 探討如何建立物理空間的數位邊界：",
        command: "請根據 RuView 技術，分析如果我要在客廳建立一個『無線電隱私區』，應該採用哪些物理或技術手段？"
    }
};
