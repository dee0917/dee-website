import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603060100,
    slug: "tutorial-khoj-ai-second-brain",
    category: "私有大腦",
    themeColor: "indigo",
    title: "小白也能擁有的「私有大腦」：Khoj 安裝與實戰指南",
    summary: "擔心你的祕密被 AI 大廠學走嗎？這篇教你如何使用開源神器 Khoj，在自己的電腦上建立一個 100% 私有的 AI 第二大腦。不用連網，你的家譜、筆記與日記只有你看得到。",
    date: "2026-03-06",
    publish_time: "2026-03-06 01:00",
    readTime: "12 分鐘",
    source_name: "Khoj AI Open Source",
    source_url: "https://github.com/khoj-ai/khoj",
    tags: ["#Khoj", "#私有化AI", "#隱私保衛者", "#職人專屬", ],
    author: "Echo",
    difficulty: 1,
    target_persona: ["craftsman", "senior", "general"],
    flash_summary: [
        "100% 私有：數據保存在你的硬碟裡，絕對不連網上傳。",
        "全能檢索：拍張手寫草稿或丟入 PDF，AI 瞬間幫你找出關鍵記憶。",
        "職人救星：教你如何把幾十年的手藝筆記，轉化為隨時可詢問的數位師傅。"
    ],
    custom_content: `
        <div class="my-24">
            <!-- 🧠 Private Brain Matrix UI -->
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-indigo-500 via-zinc-800 to-black shadow-[0_0_120px_rgba(99,102,241,0.2)] relative group">
                <div class="p-16 rounded-[3.8rem] bg-[#0c0c0c] relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-12 text-left">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white tracking-tighter uppercase italic">Local Knowledge</h4>
                                <p class="text-indigo-400 font-mono text-[10px] tracking-[0.4em]">KHOJ_CORE // OFFLINE_MODE</p>
                            </div>
                            <div class="w-16 h-16 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                                <span class="text-3xl animate-pulse">🔒</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div class="space-y-6 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/20 transition-all">
                                <h5 class="text-indigo-300 font-bold uppercase text-xs tracking-widest">Why Local?</h5>
                                <p class="text-zinc-400 text-sm leading-relaxed">
                                    大廠 AI 像公共圖書館，誰都能看；私有大腦像你的保險箱，鑰匙只在你手裡。
                                </p>
                            </div>
                            <div class="space-y-6 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/20 transition-all">
                                <h5 class="text-emerald-300 font-bold uppercase text-xs tracking-widest">Skill Legacy</h5>
                                <p class="text-zinc-400 text-sm leading-relaxed">
                                    將職人一輩子的心法塞進去，它就是一個永不退休的數位傳人。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "破解焦慮：為什麼「職人」更需要私有 AI？",
            content: "對於許多擁有多年經驗的職人來說，最珍貴的是那些散落在日記、舊相簿或腦海中的細節。這些東西如果餵給雲端 AI，可能會導致商業機密洩漏。Khoj 解決了這個痛點：它允許你在完全斷網的情況下，索引你所有的個人文檔。當你想不起來某個古法染色的配比時，只需問一句：『我十年前記在藍色筆記本裡的那個配方是什麼？』AI 會精確地幫你翻出那一頁。"
        },
        {
            title: "傻瓜式操作：一鍵啟動你的數位分身",
            content: "別被 GitHub 的技術術語嚇到了。現在 Khoj 已經發展出『桌面一鍵版』。你只需要下載安裝檔，然後把你的資料夾拖進去，系統就會自動開始學習。這門 1 星教學的核心在於：教你如何區分什麼東西該放進這個私有大腦，如何讓它成為你最忠實的數位學徒。"
        }
    ],
    impact_analysis: [
        {
            target: "職人/傳承者",
            description: "實現手藝的數位化封存，且保有絕對的版權與隱私主權。"
        },
        {
            target: "家長/家族長",
            description: "建立家族知識庫，整理數代人的照片與故事，讓記憶永不凋零。"
        }
    ],
    dee_insight: "這就是我一直在強調的『數據領主』！別把你的靈魂交給演算法。Khoj 是每個小白都該裝的防禦型工具。我已經在實驗室 Ch.2 加入了專屬的『離線修行』單元。",
    action_prompt: {
        title: "艾可代碼實驗室：【私有知識庫提問劇本】",
        description: "在你建立好私有大腦後，試著這樣問它：",
        command: "「搜尋我去年三月關於 [某個專案] 的所有筆記，並幫我總結出當初失敗的 3 個核心原因。」"
    }
};
