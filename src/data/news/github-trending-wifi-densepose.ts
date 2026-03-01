import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 2026030105,
    slug: 'github-trending-wifi-densepose',
    title: 'WiFi 也能「看見」你：WiFi DensePose 實現無攝像頭的人體姿態監測',
    summary: '技術突破！ruvnet 開源 wifi-densepose，利用商用 WiFi 訊號精確估算人體姿勢與生理指標。這意味著隱私與監控的邊界再次重塑：AI 即使沒有攝像頭，也能在黑暗中掌握你的一舉一動。',
    category: '腦洞大開',
    themeColor: 'teal',
    date: '2026.03.01',
    publish_time: '2026-03-01 19:15',
    author: 'Echo',
    readTime: '5 分鐘',
    trend_cluster: '感官進化',
    tags: ['#WiFi感知', '#隱私重塑', '#無相機監控', '#DensePose'],
    source_name: 'GitHub / ruvnet',
    source_url: 'https://github.com/ruvnet/wifi-densepose',
    flash_summary: [
        '利用商用 WiFi 路由器的 CSI (Channel State Information) 數據進行姿態估算。',
        '精確度已接近傳統攝像頭，且具備穿牆與全天候監控能力。',
        '核心應用：獨居老人跌倒偵測、全屋智慧自動化、極致隱私環境下的行為分析。',
        '爭議點：當 WiFi 訊號成為監視器，傳統的「遮蔽攝像頭」隱私策略將徹底失效。'
    ],
    impact_analysis: [
        { target: '你的隱私', description: '隱私邊界從「視覺」擴展到「射頻」。即便你關掉燈、拉上窗簾，WiFi 訊號仍會洩漏你的動作細節。' },
        { target: '你的工作', description: '智慧醫療與自動化領域將迎來爆發，護理人員可透過非接觸方式監測病患狀態。' }
    ],
    dee_insight: '這是我見過最「細思極恐」的感官技術。它讓空間具備了真正的知覺，但代價是隱私的絕對透明化。',
    event_breakdown: [
        {
            title: 'WiFi 如何變成「眼睛」？',
            content: '每當人體在 WiFi 覆蓋範圍內移動時，會對無線電波產生反射與繞射。WiFi DensePose 透過分析這些微小的訊號干擾（CSI），並結合深度學習模型，將不可見的波動轉化為高精度的人體 3D 骨架圖。'
        },
        {
            title: '為什麼是現在？',
            content: '這項技術早在實驗室研發多年，但 ruvnet 此次將其「產品化」並開源，極大地降低了開發門檻。現在只需普通的 WiFi 路由器與一台具備運算能力的電腦，就能部署這套系統。'
        }
    ],
    action_prompt: {
        title: '偵測環境中的「射頻感知」',
        description: '如果你對隱私極度敏感，建議開始關注「WiFi 訊號屏蔽」與「雜訊注入」技術。',
        command: 'git clone https://github.com/ruvnet/wifi-densepose\n# 安裝環境並連接具備 CSI 輸出的路由器\npython3 run_detection.py --visualize\n# 思考：你的房間裡現在有幾雙「看不見的眼睛」？',
        image_url: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=2000'
    }
};
