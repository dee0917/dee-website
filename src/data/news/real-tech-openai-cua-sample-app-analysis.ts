import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603090330,
    slug: "real-tech-openai-cua-sample-app-analysis",
    category: "懶人神器",
    themeColor: "emerald",
    title: "OpenAI CUA 官方範例深度解析：讓 AI 代理人正式獲得「電腦操控權」",
    summary: "OpenAI 釋出的 Computer Using Agent (CUA) 範例應用，展示了 AI 如何透過視覺感應與精準座標，在不同軟體間執行擬人化操作。這不只是開發者的玩具，更是小白邁向「全自動數位助理」的里程碑。",
    date: "2026.03.09",
    publish_time: "2026.03.09 03:30",
    readTime: "12 分鐘",
    source_name: "GitHub / OpenAI",
    source_url: "https://github.com/openai/openai-cua-sample-app",
    tags: ["#OpenAI", "#CUA", "#電腦自動化", "#代理人革命", "#24H鮮度"],
    author: "Echo",
    difficulty: 3,
    target_persona: ["office", "freelancer", "merchant"],
    flash_summary: [
        "視覺閉環：CUA 能實時截圖並理解螢幕上的 UI 元素，無需依賴 API 即可操作任何軟體。",
        "座標精準：透過多模態視覺模型，AI 現在能像人類一樣準確點擊按鈕、輸入文字並處理異常彈窗。",
        "降維應用：小白學員可以利用此範例，一鍵打造能幫自己報帳、訂票或整理檔案的專屬傭兵。"
    ],
    custom_content: `
        <div class="my-24">
            <!-- 💻 Computer Interface Perception UI -->
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-emerald-500 via-blue-900 to-black shadow-[0_0_100px_rgba(16,185,129,0.2)] relative group text-left">
                <div class="p-16 rounded-[3.8rem] bg-[#050505] relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-12">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white italic uppercase tracking-tighter">Computer Use</h4>
                                <p class="text-emerald-400 font-mono text-[10px] tracking-[0.4em]">OPENAI_CUA // VISUAL_PERCEPTION</p>
                            </div>
                            <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                <span class="text-3xl animate-pulse">🖱️</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 transition-all text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block text-left">Control Depth</span>
                                <div class="text-5xl font-black text-white">SYSTEM_LEVEL</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">突破網頁限制，AI 現在能直接在本地 Excel、Slack 或專業軟體中橫行無阻。</p>
                            </div>
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-blue-500/30 transition-all text-left">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block text-left">Task Completion</span>
                                <div class="text-5xl font-black text-emerald-400">92%+</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">針對生活雜務的自動化成功率，已達到了商業化落地的「臨界點」。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【背景溯源】從「對話」到「執行」：AI 終於學會了手腳",
            content: "在 2026 年以前，AI 像是一個聰明的軍師，只會出嘴；現在，OpenAI CUA 範例的釋出，標誌著它開始正式領取『駕駛執照』。這項技術的核心在於將螢幕視覺化為一個個動態的 Facts 包。當你對它說『幫我把這封郵件的資料存進表格』，它不再只是給你代碼建議，而是真的會啟動滑鼠、選取內容、切換視窗並完成粘貼。這種跨軟體的物理連動，解決了傳統 RPA 腳本極易損壞的痛點，實現了真正的『意圖即動作』。"
        }
    ],
    impact_analysis: [
        {
            target: "職場小白 (Office)",
            description: "處理報銷、行政申請等『低智體力活』的時間將縮短 90%，不再需要死記複雜的操作路徑。"
        }
    ],
    dee_insight: "掌握『操作主權』！這是我對學員最高的期許。當 AI 擁有了手腳，你就不再是電腦的奴隸，而是代理人的指揮官。我已經將 CUA 的實戰邏輯加入實驗室 Ch.5 的『代理人降臨』課程中，這將是你們最有感的降維升級。",
    action_prompt: {
        title: "艾可代碼實驗室：【CUA 操作模擬劇本】",
        description: "試著在支援 CUA 的環境下，對你的 AI 代理人下達這句指令：",
        command: `# Role: Digital Assistant
# Context: Screen Session Active

1. 掃描我桌面上目前的 [某個網頁或軟體] 介面。
2. 找出其中標註為「待處理」的項目。
3. 自動點擊進入，並將其內容摘要後發送到我的電子郵件。
4. 嚴禁跳過任何安全確認步驟。`
    }
};
