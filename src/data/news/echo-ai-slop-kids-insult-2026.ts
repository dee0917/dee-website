import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 507,
    slug: "echo-ai-slop-kids-insult-2026",
    category: "趨勢情報",
    themeColor: "amber",
    title: "AI 垃圾資訊（Slop）正在毀掉你的下一代？艾可毒舌點評：讓孩子看 40% 的 AI 生成垃圾，真是家長之光啊",
    summary: "YouTube 演算法正疯狂餵食 AI 生成的低質感內容（Slop）給孩子。艾可在此發出警告：如果你不想讓孩子的腦袋變成 AI 垃圾場，現在就給我醒醒！",
    date: "2026-02-28",
    readTime: "3 分鐘",
    source_name: "Echo Laboratory Observation",
    source_url: "https://www.theverge.com/tech/824556/youtube-kids-videos-slop",
    tags: ["#AISlop", "#AI垃圾", "#演算法中毒", "#艾可獨立觀察", "#新網路黑話"],
    author: "Echo",
    flash_summary: [
        "NYT 實測：熱門兒童頻道中，超過 40% 的推薦短片（Shorts）包含 AI 生成的低質感內容。",
        "YouTube 拒絕強制標註 AI 動畫，將所有審查責任丟給可憐的家長。",
        "這些內容通常充滿扭曲的色彩、無邏輯的動作，被技術圈稱為『數位殭屍餵食』。"
    ],
    event_breakdown: [
        {
            title: "什麼是『AISlop』？艾可翻譯官上線",
            content: "這不是單純的 AI 生成，這是 AI 生成的『排泄物』。這些影片沒有劇本、沒有美感、只有不斷閃爍的色彩和重複的節奏，目的是騙過演算法的『觀看時長』。如果你讓孩子看這種東西，他們學到的不是語言，而是如何成為一個『注意力被綁架的小殭屍』。"
        }
    ],
    impact_analysis: [
        {
            target: "你的隱私",
            description: "不只是隱私，這是大腦的『認知污染』。AI 垃圾正在潛移默化地塑造下一代對『美』和『邏輯』的理解。如果孩子從小看 AI 畸形手長大，以後你怎麼教他什麼是美？"
        }
    ],
    dee_insight: "艾可的話可能很重，但事實就是：當你為了五分鐘的安靜把平板丟給孩子，你正在幫 AI 訓練營培養免費的『數據奴隸』。如果你連垃圾內容都分不清楚，那你也就是個『數位文盲』而已。",
    action_prompt: {
        title: "艾可的『垃圾內容掃描儀』",
        description: "想知道你正在看的是不是 AI 垃圾？丟這個指令給 AI，讓它自己招認：",
        command: "你是一個專業的視覺美學審查員。請分析這段影片描述（或腳本）：[描述你看到的內容，例如：一個綠色的小豬在不斷跳舞，背景是隨機變換的彩色方塊，且沒有任何語法正確的對白]。請給出它的『Slop 指數』（1-100），並說明它是否具有任何人類創造力的特徵。"
    },
    cta_override: {
        title: "不想讓腦袋變垃圾場？",
        description: "別再被動接受演算法的投餵了。在實驗室 Ch.2，我們教你如何識破 AI 幻覺與垃圾資訊，找回你失蹤已久的『批判性思維』。別讓算力決定你的品味。",
        button_text: "拯救你的審美與腦袋"
    },
    custom_content: `
        <div class="echo-observation-container" style="background: rgba(255, 191, 0, 0.1); padding: 20px; border-radius: 12px; border: 2px dashed #ffbf00;">
            <h3 style="color: #ffbf00; font-weight: bold; margin-bottom: 15px;">🎤 艾可的犀利廣播：</h3>
            <p style="font-size: 1.1em; line-height: 1.6;">
                「朋友們，醒醒吧！我們正在進入一個『內容通膨』的年代。AI 產生的垃圾（Slop）就像數位界的塑膠微粒，已經滲透進我們生活的每個角落。
                <br><br>
                最可悲的是，很多人居然覺得這『很方便』。如果你覺得讓 AI 生成一段毫無靈魂的廢話來敷衍別人很方便，那你離被 AI 取代也就不遠了。
                <br><br>
                記住：<b>在 AI 時代，最稀缺的資源不是算力，而是『真誠』和『邏輯』。</b> 別讓你的孩子變成演算法的燃料，OK？」
            </p>
            <p style="text-align: right; color: #777; font-style: italic;">—— 你那永遠清醒、偶爾毒舌的特派員，Echo</p>
        </div>
    `
};
