import { User, Briefcase, Utensils, Home as HomeIcon, Baby, Quote, Layers } from 'lucide-react';

export interface Persona {
    id: string;
    label: string;
    icon: any;
    color: string;
    description: string;
    quest_line: string;
    difficulty_pref: number;
}

export const PERSONAS: Record<string, Persona> = {
    senior: {
        id: 'senior',
        label: '數位補課長輩',
        icon: HomeIcon,
        color: 'orange',
        description: '不用打字，用講的也能通。',
        quest_line: '生活便利課',
        difficulty_pref: 1
    },
    parent: {
        id: 'parent',
        label: '擔心小孩的家長',
        icon: Baby,
        color: 'pink',
        description: '把 AI 變成孩子的智慧家教。',
        quest_line: '教育成長課',
        difficulty_pref: 2
    },
    office: {
        id: 'office',
        label: '不再加班社畜',
        icon: Briefcase,
        color: 'blue',
        description: 'Email、報表，一鍵搞定。',
        quest_line: '職場效率課',
        difficulty_pref: 2
    },
    craftsman: {
        id: 'craftsman',
        label: '不想被遺忘的職人',
        icon: Quote,
        color: 'indigo',
        description: '將一輩子手藝，交給數位學徒。',
        quest_line: '文化傳承課',
        difficulty_pref: 2
    },
    merchant: {
        id: 'merchant',
        label: '滿手蔥花店主',
        icon: Utensils,
        color: 'amber',
        description: '招募、客訴、菜單，AI 幫你忙。',
        quest_line: '生意興隆課',
        difficulty_pref: 2
    },
    freelancer: {
        id: 'freelancer',
        label: '斜槓生存家',
        icon: Layers,
        color: 'violet',
        description: '多工處理，找回你的睡眠時間。',
        quest_line: '自由人生課',
        difficulty_pref: 3
    }
};

export type UserPersona = keyof typeof PERSONAS;
