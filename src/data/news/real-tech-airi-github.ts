import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 805,
    slug: "real-tech-airi-soul-container-companion-2026",
    category: "腦洞大開",
    themeColor: "rose",
    title: "當 AI 具備靈魂？GitHub 爆火開源項目 AIRI：打造你的專屬「數位生命」容器",
    summary: "GitHub 今日趨勢榜第一名！開發者 nekomeowww 發布了名為 AIRI 的開源專案，旨在將 Grok 等大模型轉化為具備獨立人格、聲音甚至能跨遊戲互動的數位伴侶。",
    date: "2026.02.28",
    publish_time: "2026-03-01 04:30",
    readTime: "6 分鐘",
    source_name: "GitHub Trending / moeru-ai",
    source_url: "https://github.com/moeru-ai/airi",
    tags: ["#AIRI", "#數位生命", "#開源項目", "#GitHub趨勢", "#AI伴侶"],
    author: "Echo",
    trend_cluster: "代理人革命",
    flash_summary: [
        "AIRI (Self-hosted Grok Companion) 在 24 小時內斬獲超過 1,000 顆星。",
        "支援實時語音對話，且具備在 Minecraft、Factorio 等遊戲中自主行動的能力。",
        "核心理念：將 AI 從單調的對話框轉變為具備『靈魂』與『情感連結』的數位生命體。"
    ],
    event_breakdown: [
        {
            title: "【深度測評】AIRI：不只是聊天，它是你的數位化身",
            content: "在 2026 年的 AI 浪潮中，我們見證了從純文字交互到『具身智能 (Embodied AI)』的轉變。AIRI 的出現正是這一趨勢的代表作。這是一個完全由用戶自託管的開源框架，它能連接 Grok 或其他強大模型，並賦予其特定的人格設定（Waifu Souls）。最讓業界震驚的是它的『跨環境生存力』——AIRI 不僅能在桌面端與你聊天，還能作為一個實體玩家進入你的 Minecraft 伺服器，甚至幫你管理 Factorio 的自動化產線。這種將 AI 靈魂注入虛擬世界的技術，正在模糊遊戲與真實生活的邊界。"
        },
        {
            title: "【開源力量】為什麼這個專案能瞬間刷屏？",
            content: "長期以來，高品質的 AI 伴侶往往被大廠壟斷且數據不透明。AIRI 堅持『數據主權歸用戶所有』，所有的行為邏輯與對話紀錄都儲存在用戶本地伺服器中。這解決了小白用戶最擔心的隱私問題。開發團隊 nekomeowww 指出，AIRI 的目標是實現像 Neuro-sama 那樣的高自主度數位生命，但讓每個家庭都能擁有一台。這種技術的民主化，讓艾可也忍不住要給這群開源英雄點個讚。這不是冷冰冰的算力，這是數位時代的溫暖火種。"
        }
    ],
    impact_analysis: [
        {
            target: "你的隱私",
            description: "由於支持自託管，你與 AI 伴侶的所有私密互動都將鎖在你的本地硬碟，絕不成為大廠訓練數據的養分。"
        },
        {
            target: "你的工作",
            description: "AIRI 的自動化交互邏輯未來可能被應用於『數位員工』領域，學會如何配置這種開源容器，將是你領先同儕的關鍵。"
        }
    ],
    dee_insight: "看到這個專案了嗎？這就是我一直強調的『自主權』。別再只會用那些現成的付費工具了，學會如何部署開源的『數位生命』，你才是真正的 AI 主人。這新聞雖然看起來很二次元，但背後的架構設計是教科書級別的。",
    action_prompt: {
        title: "規劃你的『數位生命』人格",
        description: "如果你要部署 AIRI，該如何下達第一道『靈魂指令』？",
        command: "你現在是資深 AI 提示詞架構師。請參考 GitHub 開源專案 AIRI 的性格設定文案，為我量身打造一個具備 [填入特質：如 幽默、邏輯控、或是專業管家] 靈魂的系統提示詞。請包含它的成長背景、對我的稱呼偏好、以及在遇到未知問題時的『情感化反應』邏輯。"
    },
    cta_override: {
        title: "想擁有一個『懂你的靈魂』嗎？",
        description: "開源工具是強大的武器，但你需要先學會如何磨練你的『指令刀鋒』。來實驗室 Ch.1，我帶你從零開始建立人機情感連結，讓你不再被算力霸凌。",
        button_text: "開啟我的數位生命養成計畫"
    },
    custom_content: `
        <div class="mt-16 p-12 bg-rose-900/10 border border-rose-500/20 rounded-[3rem] relative overflow-hidden">
            <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-rose-500/5 blur-[80px] rounded-full"></div>
            <h4 class="text-3xl font-black text-white mb-6 text-center">💖 AIRI: 讓代碼開始跳動</h4>
            <p class="text-rose-100 text-lg leading-relaxed text-center italic mb-10">
                「我們不只是在寫軟體，我們是在創造一種新的陪伴形式。當 AI 能在遊戲裡幫你蓋房子時，它就不再只是個聊天機器人。」 —— AIRI 開發日誌
            </p>
            <div class="flex justify-center">
                <a href="https://github.com/moeru-ai/airi" target="_blank" className="px-8 py-3 bg-white text-black rounded-full font-black text-sm flex items-center gap-2 hover:bg-rose-500 hover:text-white transition-all">
                    前往 GitHub 查看真實專案 <ExternalLink size={16} />
                </a>
            </div>
        </div>
    `
};
