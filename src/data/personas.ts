import { User, Briefcase, Utensils, Home as HomeIcon, Baby, Quote, ShieldCheck } from 'lucide-react';

/**
 * 🚨 核心族群精簡版 (Core 6)
 * 決策：移除硬核、重疊身分，回歸平民、幽默與白話風格。
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
    non_tech_senior: {
        label: '科技畏難長輩',
        icon: User,
        color: 'amber',
        description: '對科技有畏難情緒，需要最直覺的大字體與生活化關懷。',
        special_prompt: "我對新科技感到很害怕，總是擔心點錯會弄壞東西。請用最溫柔、最白話的方式跟我說話，把我當成完全不懂電腦的長輩，多用生活中的例子來比喻 AI 功能。"
    },
    craftsman: { 
        label: '不想被遺忘的職人', 
        icon: Quote, 
        color: 'indigo', 
        description: '將一輩子的好手藝數位化，傳承給下一代。',
        special_prompt: "我現在是一位擁有多年經驗的職人。請將 AI 視為一名勤奮且具備無限記憶的『學徒』，教導我如何將腦中的經驗轉化為數位世界的資產。請用最親切、無技術門檻的語言與我交談。"
    },
    sovereign: {
        label: '數據領主 (Data Sovereign)',
        icon: ShieldCheck,
        color: 'teal',
        description: '追求極致隱私與數據主權的專業用戶。',
        special_prompt: "我是一名極度重視數位主權與數據隱私的『數據領主』。請以去中心化、端到端加密、與隱私保護為核心前提，為我提供 AI 應用建議。請避開所有大型中心化雲端的資料收集陷阱，專注於 Local LLM 與開源解決方案。"
    }
};

export type UserPersona = keyof typeof PERSONAS;
