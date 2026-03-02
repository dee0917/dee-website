import { User, Briefcase, Utensils, Home as HomeIcon, GraduationCap, Rocket as RocketIcon, Quote, Shield, Baby, Database } from 'lucide-react';

export const PERSONAS = {
    general: { label: '一般小白', icon: User, color: 'emerald', description: '從基礎心法開始穩紮穩打。' },
    office: { label: '不再加班社畜', icon: Briefcase, color: 'blue', description: '專攻 Email、報表與會議摘要。' },
    merchant: { label: '滿手蔥花店店主', icon: Utensils, color: 'amber', description: '專攻招募、客訴與菜單發想。' },
    parent: { label: '全能家庭守護者', icon: HomeIcon, color: 'rose', description: '專攻教養解釋、食譜與旅遊。' },
    student: { label: '校園突圍者', icon: GraduationCap, color: 'violet', description: '專攻論文摘要、報告與翻譯。' },
    slashie: { label: '斜槓生存家', icon: RocketIcon, color: 'indigo', description: '專攻爆款標題與社群貼文。' },
    legacy_creator: { 
        label: '不想被時代遺忘的職人', 
        icon: Quote, 
        color: 'orange', 
        description: '將一輩子的好手藝數位化，傳承給下一代。',
        special_prompt: "我現在是一位擁有多年經驗的職人。請將 AI 視為一名勤奮且具備無限記憶的『學徒』，教導我如何將腦中的經驗轉化為數位世界的資產。請用最親切、無技術門檻的語言與我交談。"
    },
    digital_legacy_guardian: { 
        label: '數位帳號遺產管家', 
        icon: Shield, 
        color: 'teal', 
        description: '專攻萬一哪天我不見了，我的臉書跟照片誰來管。',
        special_prompt: "我是一位注重個人數據權益的用戶。我的核心目標是確保數位遺產在物理生命終止後，依然能保有隱私。請從連續性與保護的角度，為我量身打造 AI 整理策略。"
    },
    digital_native_parent: {
        label: '擔心小孩被 AI 洗腦的家長',
        icon: Baby,
        color: 'pink',
        description: '專攻如何讓小孩學好 AI 但不學壞。',
        special_prompt: "我是一位擔心小孩被網路垃圾洗腦的家長。請用最親切、生活化的方式，教我如何利用 AI 成為孩子最酷的數位家教，同時保證隱私安全。"
    },
    data_sovereign: {
        label: '極致隱私保衛者',
        icon: Database,
        color: 'cyan',
        description: '專攻「我的數據誰都別想看」。',
        special_prompt: "我是一個非常在意隱私的人，不相信任何雲端大廠。請教我如何把 AI 鎖在自己的電腦裡跑，實現數據徹底脫鉤的祕技。"
    },
    non_tech_senior: {
        label: '數位補課歐巴桑/歐吉桑',
        icon: User,
        color: 'orange',
        description: '專攻用 AI 處理掛號、傳長輩圖與修照片。',
        special_prompt: "我是一位想跟上時代的長輩。請像我最孝順的晚輩一樣，用完全沒有科技術語、最有耐心的話，教我怎麼用 AI 幫生活省事。"
    }
};

export type UserPersona = keyof typeof PERSONAS;
