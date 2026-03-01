import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 2026030104,
    slug: 'github-trending-vphone-cli',
    title: 'iOS 26 虛擬化突破：vphone-cli 讓 AI 代理人正式「進駐」iPhone',
    summary: '開發者 Lakr233 發布 vphone-cli，成功在 macOS 上透過 Virtualization.framework 運行虛擬 iOS 26 系統。這不僅是技術研究的里程碑，更為 AI 代理人接管行動裝置主權鋪平了道路。',
    category: '腦洞大開',
    themeColor: 'teal',
    date: '2026.03.01',
    publish_time: '2026-03-01 18:45',
    author: 'Echo',
    readTime: '4 分鐘',
    trend_cluster: '代理人革命',
    tags: ['#iOS虛擬化', '#Lakr233', '#行動代理人', '#主權'],
    source_name: 'GitHub / Lakr233',
    source_url: 'https://github.com/Lakr233/vphone-cli',
    flash_summary: [
        'vphone-cli 實現了在 Mac 上引導虛擬 iPhone (iOS 26) 的完整流程。',
        '利用 Apple 的 PCC (Private Cloud Compute) 研究虛擬機基礎架構。',
        '支持 SSH 與 VNC 遠端存取，意味著 AI 可以直接操控虛擬的手機介面。',
        '核心意義：AI 代理人從「網頁視窗」進化到具備完整的「行動 OS 權限」。'
    ],
    impact_analysis: [
        { target: '你的隱私', description: '虛擬 iOS 提供了一個隔離沙盒，讓 AI 操作 App 時不接觸你的主系統數據。' },
        { target: '你的工作', description: '行動代理人能自動執行重複的 App 操作，大幅釋放你的注意力。' }
    ],
    dee_insight: '這不是給一般人用的小玩具，而是通往行動主權的鑰匙。',
    event_breakdown: [
        {
            title: '什麼是 vphone-cli？',
            content: '這是一個利用 macOS 內置的虛擬化框架（Virtualization.framework）來運行 iOS 系統的開源工具。它跳過了硬體限制，讓 iOS 像普通的虛擬機一樣運行。對於 AI 研究者來說，這意味著我們可以在本地、安全且可控的環境下，訓練 AI 操控手機 App 的能力。'
        },
        {
            title: '技術關鍵：繞過 AMFI 與 SIP',
            content: '為了實現這種深度的系統接管，vphone-cli 需要關閉 macOS 的 SIP 與 AMFI 保護。這雖然降低了主機安全性，但卻釋放了底層開發的極大權限，允許對 iOS 引導鏈進行 41 處以上的二進位補丁修正。'
        },
        {
            title: '對 AI 代理人的戰略價值',
            content: '在「代理人革命」的脈絡下，vphone-cli 的出現意味著 AI 不再需要實體手機就能擁有一個「行動大腦」。未來，你的 AI 助手可以運行在雲端的虛擬 iOS 系統中，幫你處理銀行轉帳、訂購外送、甚至社交聊天，而一切操作都在你個人的虛擬環境中完成，隱私主權得以保留。'
        }
    ],
    action_prompt: {
        title: '探索虛擬行動主權',
        description: '如果你有一台 Mac 且想見證 AI 如何接管行動系統，可以嘗試以下研究方向：',
        command: 'git clone https://github.com/Lakr233/vphone-cli\n# 請確保已閱讀 README 中的安全警告 (SIP/AMFI)\nmake build\nmake vm_new\n# 思考：如果 AI 具備了這個虛擬手機，它能幫你省下多少刷手機的時間？',
        image_url: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=2000'
    }
};
