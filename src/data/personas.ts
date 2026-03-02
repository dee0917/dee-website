import { User, Briefcase, Utensils, Home as HomeIcon, GraduationCap, Rocket as RocketIcon, Quote, Shield } from 'lucide-react';

export const PERSONAS = {
    general: { label: '一般小白', icon: User, color: 'emerald', description: '從基礎心法開始穩紮穩打。' },
    office: { label: '不再加班社畜', icon: Briefcase, color: 'blue', description: '專攻 Email、報表與會議摘要。' },
    merchant: { label: '滿手蔥花店主', icon: Utensils, color: 'amber', description: '專攻招募、客訴與菜單發想。' },
    parent: { label: '全能家庭守護者', icon: HomeIcon, color: 'rose', description: '專攻教養解釋、食譜與旅遊。' },
    student: { label: '校園突圍者', icon: GraduationCap, color: 'violet', description: '專攻論文摘要、報告與翻譯。' },
    slashie: { label: '斜槓生存家', icon: RocketIcon, color: 'indigo', description: '專攻爆款標題與社群貼文。' },
    legacy_creator: { label: '夕陽創作者', icon: Quote, color: 'orange', description: '將一生積累的知識數位永生化。' },
    digital_legacy_guardian: { label: '數位資產遺產管理者', icon: Shield, color: 'teal', description: '維護數位主權與遺產安全。' }
};

export type UserPersona = keyof typeof PERSONAS;
