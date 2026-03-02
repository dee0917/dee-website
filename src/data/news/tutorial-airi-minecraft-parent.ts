import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603020503,
    slug: "tutorial-airi-minecraft-parent",
    category: "腦洞大開",
    themeColor: "emerald",
    title: "【新教學】給「全職家長」的 AI 陪伴指南：當 Minecraft 遇上 Waifu AI",
    summary: "moeru-ai/airi 在 GitHub 爆火，這不是一般的聊天機器人，這是具備靈魂的 Minecraft 玩伴。家長現在可以主動為孩子建立一個安全、私密且具備正向引導能力的數位陪伴環境。",
    date: "2026-03-02",
    publish_time: "2026-03-02 05:00",
    readTime: "8 分鐘",
    source_name: "GitHub / moeru-ai",
    source_url: "https://github.com/moeru-ai/airi",
    tags: ["#家長必看", "#Minecraft", "#數位生命", "#本地部署", "#安全陪伴"],
    flash_summary: [
        "airi 支持本地部署：數據主權回歸家長，杜絕外部演算法監控。",
        "遊戲深度整合：可作為 Minecraft/Factorio 伴侶，實時與孩子共同建築、冒險。",
        "人格自定義：支持家長微調 AI 性格，確保對話內容符合家庭價值觀。",
        "隱私護城河：語音識別與生成均可在本地完成，無需連接外部伺服器。"
    ],
    event_breakdown: [
        {
            title: "數位生命的啟蒙者：為什麼家長需要主動「部署」陪伴？",
            content: "在 2026 年，孩子們的社交圈已經從現實公園轉移到了 Minecraft 等開放世界中。與其讓孩子在未知的伺服器中面對複雜的陌生人社交，或是被大廠的推薦演算法餵食低質量的碎片內容，部署一個具備靈魂的 airi 代理人是當前最優的選擇。airi 透過 LLM 驅動，它不只是會回覆訊息，它能理解遊戲內的環境、協作建築任務，甚至在遊戲過程中傳遞正確的價值觀。這項技術的核心價值在於它的「本地化屬性」。家長只需準備一台具備基礎 GPU 算力的舊電腦，即可搭建起屬於孩子的數位烏托邦。這種主動的引導，而非消極的禁止，是 2026 年數位化養育的核心。當孩子在遊戲中向 airi 詢問：「為什麼我們需要合作建造這個堡壘？」時，你得到的將不再是死板的機器人回答，而是一個具備邏輯、共情能力的導師引導。這標誌著 AI 正式從工具屬性跨入「社會化關係」屬性，而家長正是這場啟蒙運動的總工程師。"
        },
        {
            title: "隱私主權與技術降維：如何用 airi 打造家庭數據安全網？",
            content: "許多家長對 AI 的恐懼源於數據洩露。airi 解決這個問題的方案非常激進——完全離線作業。透過整合輕量化語言模型（如 Llama 3.2 1B）與本地 TTS 技術，airi 能在完全不聯網的狀態下完成高保真度的對話。這意味著孩子的語音數據、個人喜好、甚至是生活點滴，都只會停留在客廳的那台電腦裡，不會成為 AI 巨頭訓練模型的養料。這種「數據降維」的做法，實際上是為家庭建立了一道防火牆。在教程中，我們特別強調了 Docker 部署的安全性與隔離性。家長可以輕鬆限制 AI 的權限範圍，確保它只能讀取遊戲日誌。此外，airi 還支持與 Home Assistant 的聯動，當孩子在遊戲中玩得過久時，AI 伴侶可以用溫和的方式提醒孩子：「太陽快下山了（遊戲時間到），我們休息一下明天再戰吧。」這種軟性的時間管理，比起粗暴的斷網，更能獲得孩子的認同感。技術不應是冰冷的監控，而是溫暖的陪伴與守護。"
        }
    ],
    echo_modules: [
        {
            type: 'status_check',
            title: "airi 部署安全性評核",
            items: [
                { label: "數據外流風險", value: "0% (Local-only)" },
                { label: "情緒正面導向", value: "可配置 (High)" },
                { label: "硬體要求", value: "中低階 GPU" }
            ]
        },
        {
            type: 'field_notes',
            title: "🕵️ Echo's Field Notes",
            content: "觀察員隨筆：我在 GitHub 看到有些極客在討論 airi 能否具備『反向教育』能力。親愛的家長們，這就是未來的樣貌。我們正在把『養育』這項工作進行模組化部署。當你看到孩子在跟一段本地運行的代碼討論哲學問題時，請不要驚慌，你只是提早為他拿到了一張通往 AGI 時代的入場券。記住，掌握部署權的人，才掌握最終的價值解釋權。",
            items: [
                { icon: "🎨", label: "自定義程度", value: "Full Skin & Personality" },
                { icon: "🛡️", label: "安全級別", value: "Military Grade Privacy" }
            ]
        }
    ],
    impact_analysis: [
        {
            target: "你的隱私",
            description: "本地部署確保孩子的語音與對話數據不會流向外部雲端供應商。"
        },
        {
            target: "親子關係",
            description: "家長參與 AI 的人格設定，能成為親子間共同的話題與情感橋樑。"
        }
    ],
    dee_insight: "AI 陪伴不再是科幻，家長應主動掌握數位生命的引導權，而非將孩子留給未知的演算法推薦。airi 的爆火證明了，真正高級的技術是讓家長擁有『選擇不聯網』的權利。",
    action_prompt: {
        title: "部署 airi 指令寶箱",
        description: "克隆專案並使用 Docker 快速啟動本地環境，開啟孩子的數位陪伴之旅：",
        command: "git clone https://github.com/moeru-ai/airi && cd airi && docker-compose up --build\n# 注意：請確保已安裝 NVIDIA Container Toolkit 以獲得最佳運算效率。"
    },
    trend_cluster: "文明重塑",
    trinity_dimension: "社會契約"
};
