export const insight = {
    id: 503,
    category: "戰略演進",
    themeColor: "indigo",
    difficulty_level: 3,
    level: 5,
    tags: ["#感官進化", "#WiFi感知", "#隱私攻防", "#無攝像頭監控", "#進階玩家", "#wifi-densepose"],
    title: "當牆壁也會呼吸：WiFi DensePose 與 AI 射頻感知實戰",
    summary: "本教學將帶你探索最新的「感官進化」技術。我們將學習如何利用 WiFi 訊號的 CSI 數據，讓 AI 在不依賴攝像頭的情況下「看見」室內的人體動態，並探討這項技術對未來智慧家居與個人隱私的深遠影響。",
    date: "2026.03.01",
    readTime: "7 分鐘",
    pain_point: "擔心家裡的監控攝像頭被駭？或是想在不侵犯隱私的情況下監測老人的安全？傳統視覺監控在黑暗或有遮擋物時往往會失效。",
    scenario: "想像一個完全沒有攝像頭的房間，AI 卻能精確知道你是否跌倒、是否在睡覺、甚至你的呼吸頻率。這不是科幻，這是透過分析 WiFi 訊號被身體反射後的『擾動圖譜』實現的。",
    solution: "學會擷取 CSI (Channel State Information) 數據。這項技術透過商用路由器發射的無線電波，將房間變成一個巨大的『感應場』。AI 負責處理這些雜亂的訊號，並還原成高精度的姿態模型。",
    example: {
        wrong: "在浴室安裝攝像頭來預防老人滑倒。（極大的隱私風險）",
        right: "部署 WiFi DensePose 監測系統，AI 只接收射頻數據，僅在偵測到跌倒姿態時發出警告，保護絕對私隱。"
    },
    insight_quote: "未來的空間不再是死物，而是具備多模態感知力的智慧實體。",
    steps: [
        {
            title: "射頻數據擷取基礎",
            body: "要讓 AI 『看見』 WiFi，首先需要具備 CSI 輸出能力的硬體（如特定型號的 Intel 網卡或 ESP32）。這一步我們會學習如何設置抓包環境，捕獲原始的相位與振幅數據。",
            dee_tip: "把 WiFi 想像成水波，人體就是水中的魚，我們捕捉的是魚游過後留下的波紋。"
        },
        {
            title: "姿態映射 (Pose Mapping)",
            body: "使用預訓練的 DensePose 模型，將 CSI 數據映射到 3D 人體骨架。這需要對信號進行降噪處理，過濾掉牆壁與家具產生的靜態反射。",
            dee_tip: "關鍵在於 AI 能區分出『活動目標』與『環境背景』的訊號特徵。"
        },
        {
            title: "隱私邊界定義",
            body: "實戰演練：建立一個『隱私沙盒』。學習如何限制 AI 的感知精度，例如：只允許偵測『跌倒/起立』等宏觀動作，禁止重構細微的身體特徵。",
            dee_tip: "技術是雙刃劍，開發者的職責是為 AI 的感官套上道德與法律的韁繩。"
        }
    ],
    quiz: {
        question: "WiFi DensePose 技術與傳統攝像頭監控相比，最大的優勢是什麼？",
        options: [
            "影像解析度更高",
            "具備穿牆感知能力且在完全黑暗中仍能運作，同時具備更高的原始隱私保護性",
            "不需要消耗電力",
            "可以自動撥打電話"
        ],
        answer: 1,
        explanation: "正確！射頻感知能突破物理遮擋與光照限制，且不產生成像數據，是未來安全監控的理想選擇。"
    },
    skill_badge: "🛰️ 空間感知專家",
    practice_kit: {
        title: "射頻感知探測包",
        description: "本教學涉及硬體底層通訊，建議具備基礎 Python 背景：",
        command: `1. 安裝 CSI-Extractor 工具
2. 捕獲一段室內走動的 CSI 訊號
3. 執行：python3 densepose_infer.py --input raw_csi.bin
# 觀察 AI 如何將一堆亂碼轉化為跳動的人體骨架。`
    },
    content: ``
};
