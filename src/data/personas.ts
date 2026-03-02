import { User, Briefcase, Utensils, Home as HomeIcon, GraduationCap, Rocket as RocketIcon, Quote, Shield, Baby, Database } from 'lucide-react';

export const PERSONAS = {
    general: { label: '一般小白', icon: User, color: 'emerald', description: '從基礎心法開始穩紮穩打。' },
    office: { label: '不再加班社畜', icon: Briefcase, color: 'blue', description: '專攻 Email、報表與會議摘要。' },
    merchant: { label: '滿手蔥花店店主', icon: Utensils, color: 'amber', description: '專攻招募、客訴與菜單發想。' },
    parent: { label: '全能家庭守護者', icon: HomeIcon, color: 'rose', description: '專攻教養解釋、食譜與旅遊。' },
    student: { label: '校園突圍者', icon: GraduationCap, color: 'violet', description: '專攻論文摘要、報告與翻譯。' },
    slashie: { label: '斜槓生存家', icon: RocketIcon, color: 'indigo', description: '專攻爆款標題與社群貼文。' },
    legacy_creator: { 
        label: '夕陽創作者', 
        icon: Quote, 
        color: 'orange', 
        description: '將一生積累的知識數位永生化。',
        special_prompt: "我現在是一位夕陽創作者（Legacy Creator），擁有數十年的傳統工藝或文案經驗。請將 AI 視為一名勤奮且具備無限記憶的『學徒』，教導我如何將腦中的經驗轉化為數位世界的永恆資產。請用最親切、無技術門檻的語言與我交談。"
    },
    digital_legacy_guardian: { 
        label: '數位資產遺產管理者', 
        icon: Shield, 
        color: 'teal', 
        description: '維護數位主權與遺產安全。',
        special_prompt: "我現在是一位數位資產遺產管理者（Digital Legacy Guardian）。我的核心使命是確保數位生命與個人數據在物理生命終止後，依然能保有主權與隱私。請從安全性、連續性與法律保護的角度出發，為我量身打造專屬的 AI 管理策略。"
    },
    digital_native_parent: {
        label: '數位原民家長',
        icon: Baby,
        color: 'pink',
        description: '專攻本地部署、隱私主權、反向教育與遊戲化陪伴。',
        special_prompt: "我現在是一位數位原民家長（Digital Native Parents）。我深知數位世界的機會與風險，我的目標是利用本地部署的 AI 基礎設施，在保障隱私的同時，實現與孩子的反向教育與高品質遊戲化陪伴。請為我提供具備主權意識且富有趣味性的 AI 生活方案。"
    },
    data_sovereign: {
        label: '數據領主',
        icon: Database,
        color: 'cyan',
        description: '專攻本地 AI 基礎設施、數據脫鉤與離線算力。',
        special_prompt: "我現在是一位數據領主（Data Sovereigns）。我不信任任何公有雲服務，致力於構建完全私有的本地 AI 基礎設施，實現數據徹底脫鉤與算力自主。請針對離線模型優化、數據主權保護與個人私有雲架構，提供專業且硬核的技術戰略。"
    }
};

export type UserPersona = keyof typeof PERSONAS;
