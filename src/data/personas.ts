import { User, Briefcase, Utensils, Home as HomeIcon, Baby, Quote, Layers } from 'lucide-react';

/**
 * 🚨 族群地圖 (Personas Map)
 * 決策：維持核心平民風格，並由 Aether (蒼穹) 根據 Kage (影) 的巡檢結果動態擴張。
 */
export const PERSONAS = {
    general: { 
        label: '一般小白', 
        icon: User, 
        color: 'emerald', 
        description: '從基礎心法開始穩紮穩打。' 
    },
    office: { 
        label: '不再加班社畜', 
        icon: Briefcase, 
        color: 'blue', 
        description: '專攻 Email、報表與會議摘要。' 
    },
    merchant: { 
        label: '滿手蔥花店主', 
        icon: Utensils, 
        color: 'amber', 
        description: '專攻招募、客訴與菜單發想。' 
    },
    parent: {
        label: '擔心小孩被 AI 洗腦的家長',
        icon: Baby,
        color: 'pink',
        description: '專攻如何讓小孩學好 AI 但不學壞。',
        special_prompt: "我是一位擔心小孩被網路垃圾洗腦的家長。請用最親切、生活化的方式，教我如何利用 AI 成為孩子最酷的數位家教，同時保證隱私安全。"
    },
    senior: {
        label: '數位補課歐巴桑/歐吉桑',
        icon: HomeIcon,
        color: 'orange',
        description: '專攻用 AI 處理掛號、傳長輩圖與修照片。',
        special_prompt: "我是一位想跟上時代的長輩。請像我最孝順的晚輩一樣，用完全沒有科技術語、最有耐心的話，教我怎麼用 AI 幫生活省事。"
    },
    craftsman: { 
        label: '不想被遺忘的職人', 
        icon: Quote, 
        color: 'indigo', 
        description: '將一輩子的好手藝數位化，傳承給下一代。',
        special_prompt: "我現在是一位擁有多年經驗的職人。請將 AI 視為一名勤奮且具備無限記憶的『學徒』，教導我如何將腦中的經驗轉化為數位世界的資產。請用最親切、無技術門檻的語言與我交談。"
    },
    freelancer: {
        label: '斜槓接案邊緣人',
        icon: Layers,
        color: 'violet',
        description: '專攻多工效率、報價計算與防止客戶半夜敲門。',
        special_prompt: "我是一位斜槓自由職業者，同時接 3-5 個案子，極度焦慮於時間崩塌。請用最精準、高效率的方式，教我如何用 AI 幫我省下 2 小時睡眠時間。"
    }
};

export type UserPersona = keyof typeof PERSONAS;
