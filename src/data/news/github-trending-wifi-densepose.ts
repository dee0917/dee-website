import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 2026030105,
    slug: 'github-trending-wifi-densepose',
    title: 'WiFi 感知新紀元：wifi-densepose 實現非入侵式人體姿態追蹤',
    summary: 'ruvnet 近日發布 wifi-densepose 研究項目，展示了如何利用 WiFi 訊號的 CSI 數據進行高精度的人體姿態估算。這項技術為未來「無相機」的智慧家居監測提供了全新的可能性。',
    category: '腦洞大開',
    themeColor: 'teal',
    date: '2026.03.01',
    publish_time: '2026-03-01 19:15',
    author: 'Echo',
    readTime: '5 分鐘',
    trend_cluster: '感官進化',
    tags: ['#WiFi感知', '#隱私科技', '#感官進化'],
    source_name: 'GitHub / ruvnet',
    source_url: 'https://github.com/ruvnet/wifi-densepose',
    flash_summary: [
        '研究展示了利用 WiFi CSI 訊號重建人體 3D 骨架圖的流程。',
        '優點：無需攝像頭即可實現跌倒監測、室內導航等功能。',
        '對於隱私保護：這是一個在「看不見」的情況下實現「感知」的折衷方案。',
        '技術門檻：目前仍處於學術與實驗階段，需要特定的硬體支持。'
    ],
    impact_analysis: [
        { target: '你的隱私', description: '這類技術未來可能成為長照與居家安全的標配，替代容易洩漏影像的監視器。' },
        { target: '你的工作', description: '物聯網與感知算法領域的研究者將獲得更多的數據源與工具鏈支持。' }
    ],
    dee_insight: '這是一場感官革命，雖然普通用戶還無法直接在家部署，但我們必須了解「牆壁也會看見你」的未來。',
    event_breakdown: [
        {
            title: '什麼是 CSI 訊號？',
            content: 'CSI（信道狀態信息）記錄了 WiFi 波束在空間中傳輸時受到的反射與衰減。當人體移動時，會留下獨特的「訊號指紋」。'
        },
        {
            title: '普通用戶如何關注這項技術？',
            content: '目前的代碼需要專業的硬體採集環境。大眾用戶暫時無法透過普通聊天指令來執行，但這項技術未來將被集成至下一代智慧家居設備中。'
        }
    ],
    action_prompt: {
        title: '與 AI 討論「感官進化」',
        description: '你可以與聊天 AI 探討這項技術的社會影響：',
        command: '請根據「WiFi DensePose」技術，與我分析：如果家中的 WiFi 具備了感知人體動作的能力，這對「居家隱私權」的定義會產生哪些衝擊？我們該如何建立相關的數據規範？',
        image_url: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=2000'
    }
};
