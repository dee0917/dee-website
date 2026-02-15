import { motion } from 'framer-motion';

const About = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-10">關於 Dee</h1>
        <div className="article-content">
            <p className="text-xl text-zinc-300 leading-relaxed mb-8">
                嗨，我是 Dee。我相信每個人都值得擁有更多屬於自己的時間。
            </p>
            <p>
                我不是工程師，也不會寫複雜的程式碼。但我花了大量時間研究 AI，發現了一件事：<strong>只要學會跟 AI 溝通，任何人都能讓它幫你完成那些繁瑣的事</strong>。
            </p>
            <p>
                從整理資料、撰寫文案、規劃行程，到建立自動化流程——這些以前需要花好幾個小時的工作，現在可以在幾分鐘內完成。更棒的是，<strong>你完全不需要會寫程式</strong>。
            </p>
            <blockquote className="my-10 border-l-4 border-google-blue pl-6 py-2 italic text-zinc-400 text-lg">
                "你想讓 AI 幫你做什麼，我就教你怎麼做到。"
            </blockquote>
            <h2 className="text-2xl text-white font-bold mt-12 mb-6">我能幫你什麼？</h2>
            <ul className="space-y-4 text-zinc-400">
                <li>• <strong>用白話文教 AI</strong> — 不用專業術語，小孩到長輩都能聽懂</li>
                <li>• <strong>無代碼解決方案</strong> — 不寫程式也能打造自動化工具</li>
                <li>• <strong>省時間的實戰技巧</strong> — 每個方法都是我親自驗證有效的</li>
                <li>• <strong>解決你的問題</strong> — 你說困擾，我幫你找到 AI 解法</li>
            </ul>
            <h2 className="text-2xl text-white font-bold mt-12 mb-6">我的理念</h2>
            <p>
                生活中有太多事情在消耗我們的時間和精力。報表、回信、整理檔案、重複性的瑣事⋯⋯這些事情不該佔據你的人生。
            </p>
            <p>
                我的目標很簡單：<strong>幫你把這些事交給 AI，讓你有更多時間陪家人、追求興趣、或只是好好休息</strong>。
            </p>
            <p className="text-google-blue font-medium mt-8">
                準備好把時間還給自己了嗎？
            </p>
        </div>
    </motion.div>
);
export default About;