import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603071700,
    slug: "real-tech-deepseek-v4-intent-complete",
    category: "懶人神器",
    themeColor: "emerald",
    title: "DeepSeek V4「意圖補完」實測：這才是店主與長輩的最後救星",
    summary: "DeepSeek V4 今日在亞太區全面開啟『方言與口語意圖識別』公測。這項更新解決了小白最核心的恐懼：找不到按鈕。",
    date: "2026.03.07",
    publish_time: "2026.03.07 17:00",
    readTime: "7 分鐘",
    source_name: "DeepSeek Newsroom",
    source_url: "https://www.deepseek.com",
    tags: ["#DeepSeekV4", "#意圖補完", "#店主福音", "#長輩友善", "#降維打擊"],
    author: "Echo",
    difficulty: 2,
    target_persona: ["senior", "merchant"],
    flash_summary: [
        "店主降維：對著手機說『那個肉絲還有嗎？有的話跟陳太太說一聲』，AI 自動連動 Excel 與 LINE 完成操作。",
        "長輩降維：支援語音導航，問『怎麼傳照片給孫子』，AI 會在螢幕上用紅圈標註實體路徑。",
        "算力普惠：V4 推理成本再次下降，5000 元級手機也能流暢運行神級自動化。"
    ],
    custom_content: `
        <div class="my-20">
            <div class="p-1 rounded-[4rem] bg-gradient-to-br from-emerald-400 via-teal-900 to-black shadow-[0_0_100px_rgba(16,185,129,0.2)]">
                <div class="p-16 rounded-[3.8rem] bg-[#0c0c0c] relative overflow-hidden">
                    <div class="relative z-10 flex flex-col gap-10 text-left">
                        <div class="flex items-center justify-between border-b border-white/5 pb-8">
                            <div class="space-y-1">
                                <h4 class="text-4xl font-black text-white italic tracking-tighter uppercase">Intent Mastery</h4>
                                <p class="text-emerald-400 font-mono text-[10px] tracking-[0.4em]">VOICE_ENGINE // ACTIVE</p>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="p-8 rounded-3xl bg-white/5 border border-white/10">
                                <span class="text-[9px] text-zinc-500 uppercase font-black mb-4 block">Operation Logic</span>
                                <div class="text-5xl font-black text-emerald-400">ZERO</div>
                                <p class="mt-4 text-sm text-zinc-400">不需要知道按鈕在哪，只要會說『幫我做』。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    event_breakdown: [
        {
            title: "【技術核心】跨 App 執行的意圖黑洞",
            content: "DeepSeek V4 不再是聊天機器人。它的新介面能直接識別你在看什麼。神祕客實測：在廚房手忙腳亂時，用語音下達模糊指令，成功率高達 95%。這對不想學打字的老白和忙碌的店主是降維打擊。"
        }
    ],
    impact_analysis: [
        {
            target: "滿手蔥花店主",
            description: "回覆速度從『一小時』降到『一分鐘』，且不再需要放下手邊工作。"
        }
    ],
    dee_insight: "這就是我們要學的！別管模型參數，管它能不能幫你多賣出一份炒飯。V4 的語音導航是長輩進入 AI 世界的最佳入口。",
    action_prompt: {
        title: "店主/長輩實戰劇本",
        description: "試著對開啟 V4 的手機說：",
        command: "「掃描一下這份訂單，幫我把收件地址存到 Google 地圖，並傳個 LINE 跟客人說明天發貨。」"
    }
};
