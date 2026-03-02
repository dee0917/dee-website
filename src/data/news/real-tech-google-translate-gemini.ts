import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
    id: 202603021305,
    slug: "real-tech-google-translate-gemini",
    category: "實戰應用",
    themeColor: "blue",
    title: "Google 翻譯進化：植入 Gemini AI，現在它能「聽懂」你在想什麼",
    summary: "別再手敲翻譯了！Google Translate 加入 Gemini 全家桶。Gemini 會根據整段話的語氣自動優化詞選，並新增「Ask」功能，能像老師一樣解釋特定詞彙背後的當地文化。",
    date: "2026-03-02",
    publish_time: "2026-03-02 13:05",
    readTime: "3 分鐘",
    source_name: "Google Blog",
    source_url: "https://blog.google",
    tags: ["#GoogleTranslate", "#GeminiAI", "#數位降維", "#翻譯工具"],
    flash_summary: [
        "翻譯不再死板，會根據語氣自動優化詞選。",
        "新增「Ask」功能，解釋當地文化用法。",
        "隨身文化顧問，修飾商務語氣更有禮貌。"
    ],
    event_breakdown: [
        {
            title: "情境理解 (Context Awareness)",
            content: "以前翻譯一個單字可能有多種意思，現在 Gemini 會根據你整段話的語氣，自動給出最適合的「替代方案」。這對出國點菜或商務通訊特別有用。"
        }
    ],
    impact_analysis: [
        {
            target: "溝通效率",
            description: "大幅提升跨語言溝通的準確度，減少誤會。"
        }
    ],
    dee_insight: "當 AI 翻譯變成隨身文化顧問，2026 年的門檻已不再是技術，而是你是否具備「在地化」的調度思維。",
    action_prompt: {
        title: "體驗 Gemini 翻譯",
        description: "試試用 Gemini 翻譯一段商務郵件，要求它修飾語氣：",
        command: "請幫我將這段中文郵件翻譯成英文，並使用最專業且得體的商務語氣：[郵件內容]"
    },
    trend_cluster: "數據主權",
    trinity_dimension: "社會契約"
};
