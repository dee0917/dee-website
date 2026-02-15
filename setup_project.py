import os
import json

# 定義專案結構與檔案內容
project_structure = {
    "package.json": json.dumps({
        "name": "dee-productivity-lab",
        "private": True,
        "version": "0.0.1",
        "type": "module",
        "scripts": {
            "dev": "vite",
            "build": "tsc && vite build",
            "preview": "vite preview"
        },
        "dependencies": {
            "react": "^18.2.0",
            "react-dom": "^18.2.0",
            "react-router-dom": "^6.22.0",
            "framer-motion": "^11.0.0",
            "lucide-react": "^0.344.0",
            "clsx": "^2.1.0",
            "tailwind-merge": "^2.2.0"
        },
        "devDependencies": {
            "@types/react": "^18.2.56",
            "@types/react-dom": "^18.2.19",
            "@types/node": "^20.11.0",
            "@vitejs/plugin-react": "^4.2.1",
            "autoprefixer": "^10.4.17",
            "postcss": "^8.4.35",
            "tailwindcss": "^3.4.1",
            "typescript": "^5.2.2",
            "vite": "^5.1.4"
        }
    }, indent=2),

    "tsconfig.json": json.dumps({
        "compilerOptions": {
            "target": "ES2020",
            "useDefineForClassFields": True,
            "lib": ["ES2020", "DOM", "DOM.Iterable"],
            "module": "ESNext",
            "skipLibCheck": True,
            "moduleResolution": "bundler",
            "allowImportingTsExtensions": True,
            "resolveJsonModule": True,
            "isolatedModules": True,
            "noEmit": True,
            "jsx": "react-jsx",
            "strict": True,
            "noUnusedLocals": True,
            "noUnusedParameters": True,
            "noFallthroughCasesInSwitch": True,
            "baseUrl": ".",
            "paths": { "@/*": ["src/*"] }
        },
        "include": ["src"],
        "references": [{ "path": "./tsconfig.node.json" }]
    }, indent=2),

    "tsconfig.node.json": json.dumps({
        "compilerOptions": {
            "composite": True,
            "skipLibCheck": True,
            "module": "ESNext",
            "moduleResolution": "bundler",
            "allowSyntheticDefaultImports": True
        },
        "include": ["vite.config.ts"]
    }, indent=2),

    "vite.config.ts": """
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
""",

    "tailwind.config.js": """
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Noto Sans TC', 'sans-serif'],
        serif: ['Playfair Display', 'Times New Roman', 'serif'],
        signature: ['La Belle Aurore', 'cursive'],
      },
      colors: {
        google: {
          blue: '#4285F4',
          red: '#EA4335',
          yellow: '#FBBC05',
          green: '#34A853',
        }
      },
      animation: {
        'scroll': 'scroll 20s linear infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        scroll: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } }
      }
    },
  },
  plugins: [],
}
""",

    "postcss.config.js": """
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
""",

    "index.html": """
<!doctype html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dee | Google AI 生產力實驗室</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,600;1,400;1,600&family=Noto+Sans+TC:wght@300;400;500;700&family=La+Belle+Aurore&display=swap" rel="stylesheet">
  </head>
  <body class="bg-[#0A0A0A] text-[#E5E5E5] overflow-x-hidden min-h-screen">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
""",

    "src/index.css": """
@tailwind base;
@tailwind components;
@tailwind utilities;

.grid-bg {
  background-size: 40px 40px;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;
  pointer-events: none;
}

.glass-panel {
  @apply bg-zinc-900/60 backdrop-blur-md border border-white/10 transition-all duration-300;
}
.glass-panel:hover {
  @apply border-google-blue/30 bg-google-blue/5 -translate-y-1;
}

/* Article Styling */
.article-content h2 { @apply font-sans text-2xl font-bold mt-10 mb-4 text-white; }
.article-content p { @apply font-sans mb-6 leading-relaxed text-zinc-300 text-lg; }
.article-content ul { @apply list-disc pl-6 mb-6 text-zinc-300; }
.article-content blockquote { @apply border-l-4 border-google-blue pl-4 py-2 my-8 italic text-zinc-400 font-serif text-lg; }
""",

    "src/vite-env.d.ts": '/// <reference types="vite/client" />',

    "src/main.tsx": """
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
""",

    "src/data/mock.ts": """
export const INSIGHTS = [
    { 
        id: 1, 
        category: "思維與邏輯", 
        title: "AI 不是工具，是你的實習生", 
        date: "2024.05.20", 
        summary: "大多數人用錯 Gemini 的原因，在於把它當成 Google 搜尋引擎。試著把它當成一個剛畢業、聰明但需要指令的大學實習生。", 
        readTime: "3 min read", 
        content: `<p>很多人問我：「Dee，為什麼我的 Gemini 給出的答案總是牛頭不對馬嘴？」...</p>` 
    },
    { 
        id: 2, 
        category: "工作流", 
        title: "建立你的 Google 第二大腦", 
        date: "2024.05.15", 
        summary: "透過 Keep、Docs 與 Gemini 的串聯，打造一個自動整理靈感的知識管理系統。", 
        readTime: "5 min read", 
        content: `<p>市面上的筆記軟體如 Notion、Obsidian 都很棒...</p>` 
    },
    { 
        id: 3, 
        category: "自動化案例", 
        title: "如果不寫程式，如何自動化？", 
        date: "2024.05.10", 
        summary: "解析 Google Workspace 的隱藏功能：AppSheet 與 Apps Script 的低代碼應用。", 
        readTime: "7 min read", 
        content: `<p>Google Workspace 其實內建了強大的自動化引擎...</p>` 
    }
];

export const SOLUTIONS = [
    { 
        id: 101, 
        title: "Gemini Prompt 架構學", 
        type: "Free Guide", 
        desc: "Dee 的獨家提問模板，適用於 90% 職場場景。", 
        detail: "這是一份 PDF 指南...", 
        action: "免費下載" 
    },
    { 
        id: 102, 
        title: "行政自動化實戰班", 
        type: "Course", 
        desc: "4 週陪跑，打造你的自動回信與報表系統。", 
        detail: "適合行政、特助...", 
        action: "查看課綱" 
    },
    { 
        id: 103, 
        title: "1-on-1 流程診斷", 
        type: "Consulting", 
        desc: "針對你的工作痛點，量身定做 AI 解決方案。", 
        detail: "我會親自檢視...", 
        action: "預約時間" 
    }
];

export const TESTIMONIALS = [
    { name: "Sarah Lin", role: "行銷總監", text: "Dee 的課程完全改變了我們團隊的運作模式。以前每週要花 5 小時整理週報，現在只要 10 分鐘。" },
    { name: "Mark Chang", role: "產品經理", text: "我不懂程式碼，但 Dee 教會我用 Apps Script 串接 Gmail，現在我的收件匣終於清空了！" },
    { name: "Emily Wu", role: "行政特助", text: "最實用的是 Prompt 架構，讓我跟 AI溝通不再鬼打牆。非常推薦！" }
];
""",

    "src/components/layout/Navbar.tsx": """
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const isActive = (path: string) => location.pathname === path;
    const linkClass = (path: string) => `hover:text-white transition-colors ${isActive(path) ? 'text-white font-bold' : ''}`;

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0A0A0A]/90 backdrop-blur-md">
            <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 cursor-pointer group">
                    <span className="font-signature text-3xl text-white group-hover:text-google-blue transition-colors">Dee.</span>
                    <span className="hidden md:block h-4 w-[1px] bg-zinc-800"></span>
                    <span className="hidden md:block text-xs uppercase tracking-widest text-zinc-500">AI Productivity Lab</span>
                </Link>
                
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                    <Link to="/insights" className={linkClass('/insights')}>洞察</Link>
                    <Link to="/solutions" className={linkClass('/solutions')}>方案</Link>
                    <Link to="/about" className={linkClass('/about')}>關於</Link>
                    <Link to="/solutions" className="bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors font-semibold text-xs tracking-wide">
                        開始學習
                    </Link>
                </div>

                <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-[#0A0A0A] border-b border-white/10 p-6 flex flex-col gap-6 animate-fade-in shadow-2xl">
                    <Link to="/insights" onClick={() => setMobileMenuOpen(false)} className="text-lg text-zinc-300">洞察 Insights</Link>
                    <Link to="/solutions" onClick={() => setMobileMenuOpen(false)} className="text-lg text-zinc-300">方案 Solutions</Link>
                    <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-lg text-zinc-300">關於 About</Link>
                </div>
            )}
        </nav>
    );
};
export default Navbar;
""",

    "src/components/layout/Footer.tsx": """
import React from 'react';

const Footer = () => (
    <footer className="py-12 border-t border-white/5 text-center bg-[#050505] mt-auto">
        <div className="font-signature text-3xl text-zinc-600 mb-6">Dee.</div>
        <div className="flex justify-center gap-8 text-sm text-zinc-500 mb-8 font-medium">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
        <p className="text-xs text-zinc-700">© 2024 Dee. All rights reserved.</p>
    </footer>
);
export default Footer;
""",

    "src/components/ui/Typewriter.tsx": """
import React, { useState, useEffect } from 'react';

interface TypewriterProps {
    texts: string[];
    speed?: number;
    delay?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ texts, speed = 150, delay = 2000 }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const handleType = () => {
            const fullText = texts[currentTextIndex];
            if (isDeleting) {
                setCurrentText(fullText.substring(0, currentText.length - 1));
            } else {
                setCurrentText(fullText.substring(0, currentText.length + 1));
            }

            if (!isDeleting && currentText === fullText) {
                setTimeout(() => setIsDeleting(true), delay);
            } else if (isDeleting && currentText === '') {
                setIsDeleting(false);
                setCurrentTextIndex((prev) => (prev + 1) % texts.length);
            }
        };

        const timer = setTimeout(handleType, isDeleting ? speed / 2 : speed);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, texts, currentTextIndex, speed, delay]);

    return (
        <span className="text-google-blue inline-flex items-center">
            {currentText}
            <span className="animate-blink ml-1">|</span>
        </span>
    );
};
export default Typewriter;
""",

    "src/components/sections/ProcessSection.tsx": """
import React from 'react';
import { MessageSquare, FileText, Rocket } from 'lucide-react';

const ProcessSection = () => {
    const steps = [
        { id: '01', icon: <MessageSquare size={32} />, title: "痛點診斷", desc: "不盲目導入 AI。我們先進行 30 分鐘對話，拆解你目前工作流中最耗時的「卡點」。" },
        { id: '02', icon: <FileText size={32} />, title: "策略擬定", desc: "我會為你設計一套專屬的 Google Workspace 自動化藍圖，包含所需的 Prompt 與串接流程。" },
        { id: '03', icon: <Rocket size={32} />, title: "落地執行", desc: "透過線上課程或 1 對 1 陪跑，確保你能實際操作這套系統，並真正省下時間。" }
    ];

    return (
        <section className="py-24 px-6 max-w-5xl mx-auto border-t border-white/5">
            <div className="text-center mb-20">
                <span className="text-google-blue font-bold tracking-widest text-xs uppercase mb-4 block">How It Works</span>
                <h2 className="text-3xl md:text-4xl font-bold font-serif text-white">從混亂到有序，只需三步</h2>
            </div>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[1px] border-t border-dashed border-zinc-700 z-0"></div>
                {steps.map((step, index) => (
                    <div key={index} className="relative z-10 flex flex-col items-center text-center group cursor-default">
                        <div className="w-24 h-24 rounded-full bg-[#111] border border-zinc-800 flex items-center justify-center mb-8 group-hover:border-google-blue group-hover:shadow-[0_0_20px_rgba(66,133,244,0.15)] transition-all duration-500 text-zinc-400 group-hover:text-google-blue">
                            {step.icon}
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#222] border border-zinc-700 flex items-center justify-center text-xs font-bold text-white group-hover:bg-google-blue group-hover:border-google-blue transition-all">
                                {step.id}
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
export default ProcessSection;
""",

    "src/components/sections/ROICalculator.tsx": """
import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const ROICalculator = () => {
    const [hours, setHours] = useState(5);
    const [rate, setRate] = useState(500);
    const totalSaved = hours * rate * 52;

    return (
        <section className="py-20 px-6 max-w-4xl mx-auto">
            <div className="bg-[#111] border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-google-blue/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-4 text-google-blue">
                            <Calculator size={20} />
                            <span className="text-xs font-bold uppercase tracking-widest">時間價值計算機</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">如果你每週能省下...</h2>
                        <p className="text-zinc-400 mb-8">拖動滑桿，看看自動化能為你創造多少價值。</p>
                        
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm mb-2 text-zinc-300">
                                    <span>每週省下時數</span>
                                    <span className="font-mono text-google-blue">{hours} 小時</span>
                                </div>
                                <input type="range" min="1" max="20" value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-google-blue" />
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2 text-zinc-300">
                                    <span>你的時薪 (TWD)</span>
                                    <span className="font-mono text-google-blue">${rate}</span>
                                </div>
                                <input type="range" min="200" max="3000" step="100" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-google-blue" />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 bg-white/5 rounded-xl p-8 text-center border border-white/5 backdrop-blur-sm w-full">
                        <p className="text-zinc-400 text-sm mb-2">每年潛在收益</p>
                        <div className="text-4xl md:text-5xl font-bold text-white font-serif mb-4">
                            NT$ {totalSaved.toLocaleString()}
                        </div>
                        <p className="text-xs text-zinc-500 mb-6">更別提你省下的心力與焦慮。</p>
                        <button className="bg-google-blue text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-[#3367D6] transition-colors">
                            開始打造你的系統
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default ROICalculator;
""",

    "src/pages/Home.tsx": """
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import Typewriter from '../components/ui/Typewriter';
import ProcessSection from '../components/sections/ProcessSection';
import ROICalculator from '../components/sections/ROICalculator';
import { INSIGHTS, SOLUTIONS, TESTIMONIALS } from '../data/mock';

const LogoTicker = () => {
    const logos = ["TECH CORP", "STARTUP.IO", "CREATIVE LAB", "GLOBAL INC.", "NEXT WAVE", "FUTURE AI"];
    return (
        <div className="w-full py-10 border-y border-white/5 bg-[#050505] overflow-hidden">
            <p className="text-center text-xs text-zinc-600 uppercase tracking-widest mb-6">Trusted by teams at</p>
            <div className="relative flex overflow-x-hidden">
                <div className="animate-scroll whitespace-nowrap flex gap-16 px-8">
                    {[...logos, ...logos, ...logos].map((logo, i) => (
                        <span key={i} className="text-xl font-bold text-zinc-700 font-serif opacity-50">{logo}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Home = () => {
    const navigate = useNavigate();

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Hero */}
            <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 border border-google-blue/30 bg-google-blue/10 text-google-blue px-3 py-1 rounded text-xs mb-8 font-medium">
                            Google AI 專門家
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                            將繁瑣交給 AI，<br/>
                            <span className="font-serif italic font-normal text-zinc-400">把時間留給 <Typewriter texts={['思考', '生活', '家人', '創意']} /></span>
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-xl leading-relaxed mb-10 font-light">
                            我是 Dee。我致力於拆解 Google 生態系中的 AI 潛能，將其轉化為每個人都能執行的<span className="text-white border-b border-white/20 pb-0.5 mx-1">高效率工作流</span>。
                        </p>
                        
                        <div className="flex gap-2 max-w-md">
                            <input type="email" placeholder="你的 Email" className="bg-white/5 border border-white/10 rounded px-4 py-3 w-full text-white focus:outline-none focus:border-google-blue transition-colors" />
                            <button className="bg-google-blue text-white px-6 rounded font-medium hover:bg-[#3367D6] whitespace-nowrap">訂閱週報</button>
                        </div>
                    </div>
                </div>
            </section>

            <LogoTicker />
            <ProcessSection />
            <ROICalculator />

            {/* Testimonials */}
            <section className="py-20 px-6 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-white font-serif mb-12 text-center">學員真實回饋</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TESTIMONIALS.map((t, i) => (
                        <div key={i} className="bg-[#111] p-8 rounded-xl border border-white/5">
                            <p className="text-zinc-300 mb-6 leading-relaxed text-sm">"{t.text}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white">{t.name.charAt(0)}</div>
                                <div>
                                    <div className="text-white text-sm font-bold">{t.name}</div>
                                    <div className="text-zinc-500 text-xs">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Teasers */}
            <section className="py-20 px-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 border-t border-white/5">
                <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-8">
                        <h3 className="text-2xl font-bold font-serif text-white">Latest Insight</h3>
                        <Link to="/insights" className="text-sm text-google-blue hover:underline">查看所有</Link>
                    </div>
                    <div onClick={() => navigate(`/insights/${INSIGHTS[0].id}`)} className="glass-panel p-6 rounded-xl cursor-pointer">
                        <div className="text-xs text-google-blue font-medium mb-3">{INSIGHTS[0].category}</div>
                        <h4 className="text-lg font-bold text-white mb-3">{INSIGHTS[0].title}</h4>
                        <p className="text-zinc-400 text-sm line-clamp-2">{INSIGHTS[0].summary}</p>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-8">
                        <h3 className="text-2xl font-bold font-serif text-white">Featured Solution</h3>
                        <Link to="/solutions" className="text-sm text-google-blue hover:underline">查看方案</Link>
                    </div>
                    <div onClick={() => navigate('/solutions')} className="border border-white/10 rounded-xl p-6 bg-black/40 hover:border-white/30 cursor-pointer">
                        <div className="flex justify-between items-start mb-3">
                            <h4 className="font-bold text-lg text-white">{SOLUTIONS[0].title}</h4>
                            <ArrowRight size={20} />
                        </div>
                        <p className="text-sm text-zinc-400">{SOLUTIONS[0].desc}</p>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};
export default Home;
""",

    "src/pages/Insights.tsx": """
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { INSIGHTS } from '../data/mock';

const Insights = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6">Insights & Thoughts</h1>
            <p className="text-zinc-400 text-xl max-w-2xl">這裡匯集了關於 Google AI、工作流自動化以及生產力思維的深度文章。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INSIGHTS.map(item => (
                <Link key={item.id} to={`/insights/${item.id}`} className="glass-panel p-8 rounded-xl cursor-pointer flex flex-col h-full group">
                    <div className="text-xs text-google-blue font-medium mb-4 uppercase tracking-wider">{item.category}</div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-google-blue transition-colors">{item.title}</h3>
                    <p className="text-zinc-400 text-base leading-relaxed mb-6 flex-1">{item.summary}</p>
                    <div className="flex items-center gap-2 text-xs text-zinc-600 font-mono mt-auto pt-6 border-t border-white/5">
                        <span>{item.date}</span><span>•</span><span>{item.readTime}</span>
                    </div>
                </Link>
            ))}
        </div>
    </motion.div>
);
export default Insights;
""",

    "src/pages/ArticleDetail.tsx": """
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { INSIGHTS } from '../data/mock';

const ArticleDetail = () => {
    const { id } = useParams();
    const article = INSIGHTS.find(i => i.id === Number(id));

    if (!article) return <div className="text-center pt-32 text-white">文章不存在</div>;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
            <Link to="/insights" className="flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition-colors text-sm font-medium">
                <ArrowLeft size={16} /> 回到列表
            </Link>
            <header className="mb-10 pb-10 border-b border-white/10">
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-google-blue text-xs font-bold uppercase tracking-widest">{article.category}</span>
                    <span className="text-zinc-600 text-xs">•</span>
                    <span className="text-zinc-500 text-xs font-mono">{article.readTime}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight font-serif">{article.title}</h1>
                <p className="text-xl text-zinc-400 leading-relaxed font-light font-serif italic">{article.summary}</p>
            </header>
            <article className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
        </motion.div>
    );
};
export default ArticleDetail;
""",

    "src/pages/Solutions.tsx": """
import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOLUTIONS } from '../data/mock';

const Solutions = () => {
    const [selected, setSelected] = useState<typeof SOLUTIONS[0] | null>(null);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
             <div className="mb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6">Solutions</h1>
                <p className="text-zinc-400 text-xl max-w-2xl mx-auto">針對不同階段的學習需求，提供從免費指南到企業內訓的完整路徑。</p>
            </div>
            <div className="grid gap-6">
                {SOLUTIONS.map(sol => (
                    <div key={sol.id} onClick={() => setSelected(sol)} className="glass-panel p-8 md:p-10 rounded-2xl cursor-pointer group flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
                        <div className="flex-1">
                            <span className="inline-block px-3 py-1 bg-white/10 rounded text-xs text-zinc-300 mb-4">{sol.type}</span>
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-google-blue transition-colors">{sol.title}</h3>
                            <p className="text-zinc-400 leading-relaxed">{sol.desc}</p>
                        </div>
                        <div className="w-full md:w-auto flex items-center gap-2 text-white font-medium group-hover:translate-x-2 transition-transform">
                            了解詳情 <ArrowRight size={18} />
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {selected && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelected(null)} />
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-[#111] border border-white/10 w-full max-w-lg rounded-2xl p-8 shadow-2xl z-10">
                            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-zinc-500 hover:text-white"><X /></button>
                            <span className="inline-block px-2 py-1 bg-google-blue/10 text-google-blue rounded text-xs mb-4 font-bold">{selected.type}</span>
                            <h2 className="text-2xl font-bold text-white mb-4">{selected.title}</h2>
                            <p className="text-zinc-300 mb-6 leading-relaxed">{selected.desc}</p>
                            <div className="bg-white/5 p-4 rounded-lg mb-8">
                                <h4 className="text-sm font-bold text-white mb-2">詳細內容：</h4>
                                <p className="text-sm text-zinc-400">{selected.detail}</p>
                            </div>
                            <button className="w-full bg-white text-black font-bold py-3 rounded hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                                {selected.action} <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
export default Solutions;
""",

    "src/pages/About.tsx": """
import React from 'react';
import { motion } from 'framer-motion';

const About = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-10">About Dee</h1>
        <div className="article-content">
            <p className="text-xl text-zinc-300 leading-relaxed mb-8">
                嗨，我是 Dee。曾經，我也是那個被重複性工作淹沒的行政專員。直到我發現，Google Workspace 不只是辦公軟體，它是一個可以被「程式化」的強大生態系。
            </p>
            <p>
                過去 5 年，我專注於研究 <strong>Google Apps Script</strong> 與 <strong>Gemini AI</strong> 的結合。我不教你寫複雜的程式碼，我教你如何用「低代碼 (Low-Code)」甚至「無代碼 (No-Code)」的方式，串聯你的 Gmail、Calendar、Sheets 和 Docs。
            </p>
            <blockquote className="my-10 border-l-4 border-google-blue pl-6 py-2 italic text-zinc-400 text-lg">
                "我的目標很簡單：幫你每週省下 10 小時，讓你能準時下班，去過你想過的生活。"
            </blockquote>
            <h2 className="text-2xl text-white font-bold mt-12 mb-6">我的經歷</h2>
            <ul className="space-y-4 text-zinc-400">
                <li>• Google Cloud Certified Professional</li>
                <li>• 曾任職於跨國科技公司 資深營運經理</li>
                <li>• 協助超過 50+ 中小企業導入 AI 自動化流程</li>
                <li>• 線上課程學員累積突破 2,000+ 人</li>
            </ul>
        </div>
    </motion.div>
);
export default About;
""",

    "src/App.tsx": """
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Insights from './pages/Insights';
import ArticleDetail from './pages/ArticleDetail';
import Solutions from './pages/Solutions';
import About from './pages/About';

function App() {
  const location = useLocation();

  // 每次路由切換時滾動到頂部
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="grid-bg"></div>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:id" element={<ArticleDetail />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
"""
}

def create_project():
    print("Starting Dee Productivity Lab Project Setup...")
    
    for file_path, content in project_structure.items():
        # 處理資料夾路徑
        directory = os.path.dirname(file_path)
        if directory and not os.path.exists(directory):
            os.makedirs(directory)
            
        # 寫入檔案
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content.strip())
        print(f"Created: {file_path}")

    print("\nProject structure created successfully!")
    print("\nNext Steps:")
    print("1. Run 'npm install' to install dependencies.")
    print("2. Run 'npm run dev' to start the local server.")
    print("3. Open http://localhost:5173 to view your site.")

if __name__ == "__main__":
    create_project()
