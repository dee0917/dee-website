import { NewsArticle } from '../../types/news';

// 定義身分專屬內容的接口
export interface PersonaContent {
    pain_point: string;
    example: {
        wrong: string;
        right: string;
    };
    practice_kit: {
        title: string;
        description: string;
        command: string;
    };
}

export const article: any = {
    id: 1,
    title: '如何寫出好指令：從此讓 AI 聽懂人話',
    summary: '覺得 AI 總是答非所問？其實問題不在它，而在你的指令。學會這套黃金結構，讓你的對話效率提升 10 倍。',
    category: '心法重塑',
    themeColor: 'emerald',
    difficulty_level: 1,
    pain_point: '每次跟 AI 講話都像在對牛彈琴，最後還是得自己動手做？',
    example: {
        wrong: '幫我寫一個廣告。',
        right: '請扮演專業行銷人，幫我寫一段針對 30 歲女性的護膚品 FB 廣告。'
    },
    // 身分專屬覆蓋內容
    persona_overrides: {
        office: {
            pain_point: 'Email 永遠回不完，還要糾結語氣會不會沒禮貌？',
            example: {
                wrong: '幫我回這封信。',
                right: '請扮演禮貌的特助，針對這封信回覆：目前主管在會議中，下午兩點後才能回電。'
            },
            practice_kit: {
                title: '商務回信寶箱',
                description: '快速生成體面的商務回覆指令：',
                command: '請扮演專業特助。背景：[收到某某人的信，內容是...]。任務：回覆他 [主要訴求]。語氣：專業、簡潔且有禮。'
            }
        },
        merchant: {
            pain_point: '想寫個徵人啟事都沒人投，客人的評論也不知道怎麼回才顯得有誠意？',
            example: {
                wrong: '寫個徵人公告。',
                right: '請扮演親切的店長。我們正在找外場人員，重點是「排班彈性、夥伴好相處、有供餐」。'
            },
            practice_kit: {
                title: '暖心店主寶箱',
                description: '回覆評論與徵才的黃金指令：',
                command: '我現在是 [餐廳類型] 的店主。請幫我回覆這則評論：[內容]。語氣：溫暖、幽默且展現專業。最後要邀請他下次再來。'
            }
        },
        parent: {
            pain_point: '小孩問問題都答不出來，或者解釋完他還是一頭霧水？',
            example: {
                wrong: '什麼是黑洞？',
                right: '請扮演幼兒園老師，用 5 歲小孩聽得懂的比喻，向他解釋什麼是黑洞。'
            },
            practice_kit: {
                title: '白話教養寶箱',
                description: '將艱深概念轉化為童言童語：',
                command: '請扮演溫柔的老師。我的小孩 5 歲，他問我 [問題]。請用一個有趣的比喻向他解釋，不要使用任何專業術語。'
            }
        },
        student: {
            pain_point: '論文讀不完，報告大綱想破頭，英文文獻看到眼花？',
            example: {
                wrong: '翻譯這段。',
                right: '請幫我摘要這篇論文的關鍵發現，並用繁體中文列出 3 個研究亮點。'
            },
            practice_kit: {
                title: '校園突圍寶箱',
                description: '學術論文降維打擊指令：',
                command: '請扮演學術導師。這是一段論文內容：[文字]。請幫我：1. 總結核心論點。2. 列出其研究限制。3. 用台灣大學生的語氣寫一段心得摘要。'
            }
        },
        slashie: {
            pain_point: '一個人要當三個人用，想不出吸引人的標題，貼文發了也沒人看？',
            example: {
                wrong: '寫一個產品介紹。',
                right: '請扮演爆款小編。針對 [產品名稱]，寫出 5 個能抓住眼球、讓人想點進去的標題。'
            },
            practice_kit: {
                title: '爆款行銷寶箱',
                description: '讓你的社群流量翻倍的指令：',
                command: '請扮演資深行銷小編。主題是 [你的主題]。請給出 10 個不同風格的標題（如：恐懼訴求、反直覺、懶人包），並為其中一個標題寫一段 IG 貼文大綱。'
            }
        }
    },
    steps: [
        {
            title: '賦予角色 (Role)',
            body: 'AI 就像一名實習生，如果你不告訴它是誰，它就只能給你平庸的回答。',
            dee_tip: '試著說「請扮演資深主廚」而非「寫食譜」。'
        },
        {
            title: '提供背景 (Context)',
            body: '細節決定品質。告訴 AI 你的目標對象是誰、預算多少。',
            dee_tip: '背景越多，垃圾越少。'
        }
    ],
    practice_kit: {
        title: '萬用指令寶箱',
        description: '這是一段通用的黃金結構，複製後填入括號內容即可。',
        command: '請扮演 [角色]。針對 [任務目標]，請考慮 [背景資訊]，並以 [期望語氣] 提供結果。'
    }
};
