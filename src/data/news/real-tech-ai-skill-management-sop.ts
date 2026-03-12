import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603060230,
    slug: "real-tech-ai-skill-management-sop",
    category: "職場轉型",
    themeColor: "blue",
    title: "別濫裝 AI 技能包！頂尖工程師的「黃金 20 技能」管理術：從 SOP 到自動化進化",
    summary: "當 Claude Skill 生態系爆發，為何高手反而只留下 20 個核心技能？本篇拆解如何將複雜的數位轉型與 AI 協作進行『降維管理』，從底層架構打造真正能隨企業成長的 AI 總機與工作流。",
    date: "2026-03-06",
    publish_time: "2026-03-06 02:30",
    readTime: "8 分鐘",
    source_name: "數位時代 BusinessNext",
    source_url: "https://www.bnext.com.tw/article/90226/ai-skill-management-sop-structure-progressive-disclosure",
    tags: ["#AI管理", "#ClaudeSkills", "#數位轉型", "#SOP自動化", "#艾可轉譯"],
    author: "Echo",
    difficulty: 3,
    target_persona: ["office", "merchant", "freelancer"],
    flash_summary: [
        "技能通膨：盲目安裝 AI 技能包會導致邏輯衝突，高手更傾向於『精簡且深度的垂直開發』。",
        "通訊革命：雲端總機與 AI 的整合，讓中小企業能以低成本實現 24/7 的情緒分析與自動客服。",
        "用戶驅動：真正的 AI 進化應來自於解決 80% 用戶的高頻痛點，而非追逐 1% 的冷門技術。"
    ],
    custom_content: `
        <div class="my-20">
            <!-- 🛠️ AI Skill Strategy Visualization -->
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-blue-500 via-indigo-900 to-black shadow-[0_0_100px_rgba(59,130,246,0.2)] relative group">
                <div class="p-16 rounded-[3.8rem] bg-[#050505] relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-12 text-left">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white italic uppercase tracking-tighter">Skill Mastery</h4>
                                <p class="text-blue-400 font-mono text-[10px] tracking-[0.4em]">SOP_ENGINE // DISCLOSURE_PROTOCOL</p>
                            </div>
                            <div class="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                <span class="text-4xl animate-pulse">🛠️</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-blue-500/30 transition-all">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block">Optimization Strategy</span>
                                <div class="text-4xl font-black text-white">20 CORE</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed">拒絕功能堆砌，專注於能串聯整體工作流的黃金技能組。</p>
                            </div>
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 transition-all">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block">Business Impact</span>
                                <div class="text-4xl font-black text-emerald-400">+1000%</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed">透過 API 整合，實現從通訊、客服到決策的全鏈路自動化。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 🕵️ Echo's Strategic Memo -->
            <div class="mt-12 p-12 bg-zinc-950 border-l-4 border-blue-500 rounded-r-[3rem] relative group overflow-hidden shadow-inner">
                <div class="relative z-10 text-left">
                    <h3 class="text-2xl font-black text-white mb-6 tracking-widest uppercase flex items-center gap-3">
                        <span class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs text-black italic font-serif">E</span>
                        Echo's Field Notes
                    </h3>
                    <p class="text-zinc-300 text-xl leading-relaxed font-medium italic border-l-4 border-blue-500/50 pl-8">
                        「觀察員隨筆：這篇報導揭示了一個殘酷的現實——在 AI 時代，『多』並不等於『強』。許多人迷失在海量的 AI 插件中，卻忘了數位轉型的本質是解決『連結』問題。就像 AHOY 雲端總機，它解決的是溝通的最後一公里。記住，最強大的代理人不是會做一萬件事，而是能幫你守住那 20 個最核心的 SOP。」
                    </p>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【背景溯源】從硬體思維到 SaaS 轉型：通訊系統的 AI 化",
            content: "在 2026 年，企業通訊不再只是打電話。傳統總機的高昂建置與佈線成本，正被像 AHOY 這種『一條龍』架構的雲端總機徹底取代。這項變革的核心在於將『通訊』轉化為可被 AI 處理的數據流。透過與 LINE API 的整合，商家的每一通電話都能即時產出逐字稿，並進行服務品質的情緒分析。這對中小企業來說，是第一次能夠以極低門檻獲得『大企業級別』的服務審計能力。"
        },
        {
            title: "【技術核心】用戶驅動開發：為何 AI 需要「漸進式揭露」？",
            content: "好的 AI 系統不應該一次把所有複雜功能丟給用戶。成功的數位轉型案例顯示，開發資源應集中在解決 80% 用戶的高頻痛點上。透過彈性的 API 整合（如號碼遮罩與情緒分析），AI 代理人能在適當的時機介入，而非全程干擾。這種『漸進式揭露 (Progressive Disclosure)』的設計哲學，正是我們實驗室在建構代理人技能時的核心標準——確保技術降維，但服務升維。"
        }
    ],
    impact_analysis: [
        {
            target: "滿手蔥花店主",
            description: "無需昂貴設備，點開網頁就能擁有 AI 客服總機，處理客訴並追蹤情緒。"
        },
        {
            target: "不再加班社畜",
            description: "透過通訊系統與 AI 備忘錄的自動對齊，會議摘要與行動清單在通話結束時即刻生成。"
        }
    ],
    dee_insight: "這就是我們要學的架構！別再迷信工具的數量。這門課我已將其核心心法寫入 Ch.3 的『工具精煉』中。學會 AHOY 這種從底層重新建構產品的思維，你才能指揮出一支精悍的 AI 軍隊。",
    action_prompt: {
        title: "艾可代碼實驗室：【核心技能清單審計劇本】",
        description: "試著用這個「精簡化」指令，讓 AI 幫你篩選出最適合你的 20 個黃金技能：",
        command: `# Role Definition
你現在是一名「企業數位轉型顧問」，專精於精簡化 AI 工作流管理。

# Specific Context
我目前的工作流包含 [填入你的工作內容，如：內容創作、客戶溝通、數據統計]。我現在擁有太多的 AI 工具和插件，導致管理混亂。

# Clear Constraints
1. 根據「黃金 20 技能」原則，請幫我分析出最核心的 5 個 AI 技能包。
2. 每個技能必須說明它如何串接我現有的不同工具。
3. 說明哪些冗餘的功能應該立即被「自動化」或「捨棄」。

# Expected Output Format
## 📉 冗餘工具診斷
## 🏆 五大核心技能包推薦
## 🔗 工作流自動化路徑圖`
    }
};
