import { NewsArticle } from '../../types/news';
export const article: NewsArticle = {
    id: 202603020502,
    slug: "real-tech-wifi-densepose",
    category: "安全防禦",
    themeColor: "rose",
    title: "【真實新聞】WiFi DensePose：牆壁不再是障礙，WiFi 訊號讓人類無所遁形",
    summary: "GitHub 今日爆款專案 wifi-densepose 實現了利用普通 WiFi 訊號進行高精度人體姿態估計，無需攝影鏡頭。",
    date: "2026-03-02",
    publish_time: "2026-03-02 05:00",
    readTime: "3 min",
    source_name: "GitHub",
    source_url: "https://github.com/ruvnet/wifi-densepose",
    tags: ["Privacy", "WiFi", "DensePose", "Surveillance"],
    flash_summary: [
        "利用 CSI 訊號轉化為實時人體姿態估計。",
        "無需攝影鏡頭，可在黑暗中或障礙物後工作。",
        "支持商品化 WiFi 設備，具備高度可獲取性。"
    ],
    event_breakdown: [
        {
            title: "隱私與感知的邊界",
            content: "該技術將普通的 WiFi 路由器轉化為 24 小時監控雷達，能精準捕捉 24 點人體骨幹模型。"
        }
    ],
    impact_analysis: [
        {
            target: "你的隱私",
            description: "家中的 WiFi 路由器可能變成全方位的掃描儀，隱私保護需要從訊號層面開始思考。"
        }
    ],
    dee_insight: "當物理世界變得透明，我們需要重新定義什麼是『隱私區間』。訊號即感知，這將改變養老與安防產業。",
    action_prompt: {
        title: "查看技術 demo",
        description: "前往專案頁面查看 WiFi 訊號如何轉化為動態人體模型。",
        command: "Browse https://github.com/ruvnet/wifi-densepose for technical implementation."
    },
};
