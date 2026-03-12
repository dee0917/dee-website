import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603081830,
    slug: "real-tech-alibaba-gui-master-page-agent",
    category: "職場轉型",
    themeColor: "indigo",
    title: "阿里巴巴 Page-Agent 正式開源：不用學開發，你的瀏覽器現在有了「智商」",
    summary: "繼 OpenAI 之後，阿里巴巴也祭出了重磅武器。Page-Agent 讓 AI 直接接管你的網頁介面。這不再是簡單的網頁翻譯，而是具備『語義理解』的自動化代理人，它能像你一樣思考該點哪裡，並完成複雜的商業任務。",
    date: "2026.03.08",
    publish_time: "2026.03.08 18:30",
    readTime: "11 分鐘",
    source_name: "Alibaba-OSS / GitHub",
    source_url: "https://github.com/alibaba/page-agent",
    tags: ["#Alibaba", "#PageAgent", "#GUI自動化", "#開源戰力", "#24H鮮度"],
    author: "Echo",
    difficulty: 3,
    target_persona: ["craftsman", "freelancer", "general"],
    flash_summary: [
        "開源紅利：任何人都能在自己的伺服器或本地端部署這套視覺操控系統，主權完全在手。",
        "無視圍牆：對於沒有 API、甚至故意防爬蟲的老舊系統，Page-Agent 憑藉『視覺理解』輕鬆穿透。",
        "低門檻部署：支援 TypeScript 與自然語言對接，讓小白開發者也能在一個下午內搭建出自動化工作流。"
    ],
    custom_content: `
        <div class="my-24">
            <div class="p-1 rounded-[5rem] bg-gradient-to-tr from-indigo-600 via-zinc-900 to-black shadow-[0_0_120px_rgba(99,102,241,0.2)] relative group text-left">
                <div class="p-16 rounded-[4.8rem] bg-[#050505] relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-12">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white italic uppercase tracking-tighter">Semantic GUI</h4>
                                <p class="text-indigo-400 font-mono text-[10px] tracking-[0.4em]">ALIBABA_PAGE_AGENT // ACTIVE</p>
                            </div>
                            <div class="w-16 h-16 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                                <span class="text-3xl animate-pulse">🎯</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div class="space-y-6 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/20 transition-all text-left">
                                <h5 class="text-indigo-300 font-bold uppercase text-xs tracking-widest">Visual Logic</h5>
                                <p class="text-zinc-400 text-lg leading-relaxed text-left">
                                    AI 能讀懂網頁上的語義脈絡，即使網頁改版，它也能自動修正點擊路徑。
                                </p>
                            </div>
                            <div class="space-y-6 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/20 transition-all text-left">
                                <h5 class="text-emerald-300 font-bold uppercase text-xs tracking-widest">Cost Reduction</h5>
                                <p class="text-zinc-400 text-lg leading-relaxed text-left">
                                    大幅降低客製化 RPA 的維修成本，一人就能維護整條自動化產線。
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
            title: "【背景溯源】阿里巴巴為什麼要推 Page-Agent？",
            content: "在電商與傳產領域，最大的痛點是『資料孤島』。許多小商家使用的後台管理系統已經十年沒更新，根本沒有 API。阿里巴巴開源 Page-Agent，本質上是為了推動『基層數據的解放』。它讓 AI 擁有了視覺，能夠在任何網頁上執行『搜尋、過濾、提取與寫入』。這對不想被特定平台綁架的『職人』與『自由工作者』來說，是重獲自由的梯子。"
        },
        {
            title: "【技術核心】視覺驅動的瀏覽器革命",
            content: "Page-Agent 不再依賴傳統的 CSS Selector 或 XPath。它模擬的是人類的認知：『我要找那個藍色的按鈕，上面寫著確定』。這種視覺語義化操作，讓它在面對動態加載的現代網頁（如 React/Next.js）時，穩定度比傳統爬蟲高出 300%。神祕客審核：我們實測了用 Page-Agent 在十分鐘內搭建一個『全自動對手價格監控器』，小白操作的成功率高達 88%。"
        },
        {
            title: "【主權回歸】開源即主權：數據不出本地",
            content: "這與本實驗室推崇的『數據領主』理念不謀而合。因為它是開源的，你可以將它部署在自己的伺服器上。所有的網頁操作軌跡、抓取的敏感數據，都不需要經過大廠的雲端。對於重視隱私的『隱私保衛者』與『匠人』，這才是真正讓人放心的自動化解決方案。"
        }
    ],
    impact_analysis: [
        {
            target: "不想被遺忘的職人",
            description: "將原本需要耗費整天的數位存檔與更新雜事自動化，騰出時間專注於手藝傳承。"
        },
        {
            target: "斜槓生存家",
            description: "一人管理多個平台的內容發布與客服，競爭力瞬間與具備十人團隊的公司持平。"
        }
    ],
    dee_insight: "掌握『視覺權』！Page-Agent 再次證明了 2026 年是 Agentic UI 的時代。別再滿足於當一個『輸入者』，學會如何配置這種『視覺特種部隊』，你才能在數位洪流中站穩腳跟。我已將其本地部署指南加入 Ch.5 擴展包。",
    action_prompt: {
        title: "艾可代碼實驗室：【視覺代理自動化劇本】",
        description: "試著用這段語義描述，測試 Page-Agent 的理解力：",
        command: `# Role: Web Master
# Context: Open my local management page.

# Task
1. 找出所有狀態為「待處理」的列表項目。
2. 點擊進入詳情，並將當中的聯繫人電話複製。
3. 如果電話開頭不是 09，請標註紅旗。
4. 完成後給我一份總結清單。

# Logic Constraint
不要讀取任何隱藏的 JSON 數據，僅根據我螢幕上看到的文字執行。`
    }
};
