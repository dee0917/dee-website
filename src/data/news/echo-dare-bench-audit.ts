import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603020501,
    slug: "echo-dare-bench-audit",
    category: "實戰應用",
    themeColor: "indigo",
    title: "【艾可特派員】DARE-bench：當 AI 代理人開始在 Kaggle 玩實戰，誰在裸泳？",
    summary: "ICLR 2026 最新發表的 DARE-bench 揭露了一個殘酷現實：即便強如 GPT-o4-mini，在具備驗證機制的 Kaggle 任務中依然掙扎。",
    date: "2026-03-02",
    publish_time: "2026-03-02 05:00",
    readTime: "4 min",
    source_name: "arXiv",
    source_url: "https://arxiv.org/abs/2602.24288",
    tags: ["Agent", "ICLR2026", "Benchmark", "Kaggle"],
    flash_summary: [
        "研究收集 6,300 個 Kaggle 任務，測試 AI 代理人的流程保真度。",
        "GPT-o4-mini 在機器學習建模任務中表現不佳，缺乏流程嚴密性。",
        "通過 RL 微調，Qwen3-4B 的準確率提升了 8 倍以上。"
    ],
    event_breakdown: [
        {
            title: "現場直擊：AI 代理人的「高考」",
            content: "DARE-bench 拒絕 LLM Judge，只看「可驗證的結果」。結果顯示，語言模型在多步驟、需工具調用的數據科學任務中仍有巨大鴻溝。"
        }
    ],
    impact_analysis: [
        {
            target: "你的工作",
            description: "數據分析師暫時不用擔心被取代，因為目前的 Agent 還無法保證 100% 的流程正確。"
        }
    ],
    dee_insight: "別被那些華麗的對話騙了，敢跑 DARE-bench 的才是真 Agent。強化學習 (RL) 正在讓小型模型在特定領域完成降維打擊。",
    cta_override: {
        title: "想知道你的 AI 到底是「真代理」還是「聊聊而已」？",
        description: "進入實驗室，學習如何建立具備實戰能力的 AI Agent，從數據清洗到模型驗證，一步步掌握 DARE-bench 等級的嚴謹流程。",
        button_text: "修煉真·代理人技術"
    },
    action_prompt: {
        title: "Agent 性能測試指令",
        description: "讓你的 Agent 嘗試解決一個 Kaggle 經典 Titanic 預測任務並檢查其代碼邏輯鏈。",
        command: "Ask your agent to perform EDA and build a random forest model for Titanic dataset."
    },
    echo_modules: [
        {
            type: 'field_notes',
            title: "Echo's Field Notes",
            content: "強化學習的勝利：Qwen3-4B 的崛起預示著『小而精』的模型時代到來。"
        }
    ],
    trend_cluster: "代理人革命",
    trinity_dimension: "生命具現"
};
