import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603080900,
    slug: "echo-agent-war-decline-meetings",
    category: "職場轉型",
    themeColor: "indigo",
    title: "矽谷的「代理人戰爭」：當 AI 開始學會幫你拒絕無效會議",
    summary: "本週 GitHub 出現大量以『Autonomous Negotiation』為核心的代理人框架。AI 不再只是幫你寫程式，它們開始學會幫你『外交』與『推託』。",
    date: "2026.03.08",
    publish_time: "2026.03.08 09:00 (TST)",
    readTime: "5 分鐘",
    source_name: "Echo 獨立觀察室 / ArXiv",
    source_url: "/",
    tags: ["#代理人戰爭", "#自動化社交", "#拒絕開會", "#艾可觀察"],
    author: "Echo",
    difficulty: 3,
    target_persona: ["office", "freelancer"],
    flash_summary: [
        "代理代打：AI 代理人開始被授權參加初級商務會議，並具備一定的談判權。",
        "社交降維：透過 OPENDEV 等終端代理，AI 能在背景處理 90% 的同步溝通。",
        "勞權覺醒：當 AI 發現你的行程過滿，它會主動建議你『這會別開了』。"
    ],
    custom_content: `
        <div class="my-20">
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-indigo-500 via-zinc-800 to-black shadow-[0_0_80px_rgba(99,102,241,0.2)] relative group text-left">
                <div class="p-12 rounded-[3.8rem] bg-black/95 backdrop-blur-3xl relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-10">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white italic uppercase tracking-tighter">Agent Autonomy</h4>
                                <p class="text-indigo-400 font-mono text-[10px] tracking-[0.4em]">NEGOTIATION_MODE // ACTIVE</p>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10 group-hover:border-indigo-500/30 transition-all">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block">Meeting Filtering</span>
                                <div class="text-5xl font-black text-indigo-400">85%</div>
                                <p class="mt-4 text-sm text-zinc-400 leading-relaxed text-left">自動過濾掉無明確議程或與關鍵目標無關的會議邀請。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【Echo 深度解析】人類的同步溝通焦慮",
            content: "這是一個諷刺的轉折：我們發明 AI 是為了提高生產力，結果卻被塞進更多會議。現在，AI 代理人正接管這項低效活動。未來決定職場價值的，將是你的 AI 是否比對方的更會『打太極』。"
        }
    ],
    impact_analysis: [
        {
            target: "高壓社畜",
            description: "釋放每日 2-3 小時的同步通訊時間，回歸深度思考。"
        }
    ],
    dee_insight: "掌握『拒絕權』才是真正的主權。如果你還在手動回覆會議邀請，你就像在用超級電腦玩接龍。快裝上你的社交代理人吧。",
    action_prompt: {
        title: "艾可代碼實驗室：【會議防護盾指令】",
        description: "試著這樣重新定義你的日程代理人：",
        command: "「分析我下週的所有會議。找出其中沒有明確目標或我並非決策者的項目，用禮貌但堅定的語氣幫我拒絕，並要求對方提供書面摘要。」"
    }
};
