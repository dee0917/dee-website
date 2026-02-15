import { motion } from 'framer-motion';
import {
    ArrowRight, ExternalLink, Calendar, Bot, Copy, Moon, Bell, Shield,
    Users, Clock, CheckCircle, ChevronRight, Sparkles, Coffee, Dumbbell,
    Brain, Film, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const IHaveTimeTutorial = () => {
    // 使用情境資料
    const useCases = [
        {
            icon: Users,
            title: '🧑‍💼 忙碌上班族',
            scenario: '小明是一位專案經理，每天有無數會議。老闆突然問：「下週三你有空嗎？」他需要花 10 分鐘翻日曆才能回答。',
            solution: '打開 iHaveTime，選擇下週三，3 秒鐘就能看到所有空閒時段，直接複製貼給老闆。',
            benefit: '從 10 分鐘縮短到 10 秒，效率提升 60 倍！'
        },
        {
            icon: Users,
            title: '👨‍👩‍👧‍👦 約會安排',
            scenario: '你想約朋友吃飯，但每次都要在群組裡來回問「這個時間行不行？那個呢？」超麻煩。',
            solution: '用 iHaveTime 一次分析整週空閒時間，複製貼到群組：「這些時間我都可以，你們挑一個吧！」',
            benefit: '不用再玩「時間猜謎」遊戲，一次搞定。'
        },
        {
            icon: Users,
            title: '🎓 學生族群',
            scenario: '期末考前，你想知道這週還有多少時間可以讀書，但課表、社團、打工的行程讓你頭昏眼花。',
            solution: 'iHaveTime 會告訴你：「你這週有 12 小時可以專注讀書，4 小時適合小歇。」',
            benefit: '讓時間管理不再是負擔，專心讀書更有效率。'
        },
        {
            icon: Users,
            title: '🏃 自由工作者',
            scenario: '你同時接多個案子，客戶都在問「什麼時候可以開會？」你需要在不同日曆間來回切換。',
            solution: 'iHaveTime 整合你的 Google 日曆，自動排除所有已排行程，只顯示真正可用的時間。',
            benefit: '專業形象加分，不再因為記錯時間而尷尬。'
        }
    ];

    // 功能介紹
    const features = [
        {
            icon: Bot,
            title: 'AI 智慧分析',
            description: '不只是列出空閒時間，還會根據時段長度給你建議：15 分鐘空檔？喝杯咖啡休息一下。3 小時空檔？適合專注工作或運動。',
            items: ['自動讀取 Google 日曆', '智慧計算可用時段', '依據時長推薦活動']
        },
        {
            icon: Calendar,
            title: '多日期範圍分析',
            description: '不只能看今天，還能一次分析整週。自訂分析時間（例如只看白天 10:00-22:00），讓結果更符合你的作息。',
            items: ['單日或多日分析', '自訂時間區間', '一鍵檢視整週']
        },
        {
            icon: Copy,
            title: '一鍵複製分享',
            description: '分析完直接複製，貼到 Line、Email、任何地方。格式清晰易讀，不用再手動整理。',
            items: ['快速複製到剪貼簿', '自訂輸出格式', '直接貼給朋友同事']
        },
        {
            icon: Moon,
            title: '深色模式',
            description: '晚上使用也不刺眼。精緻的紫色/靛藍色系設計，讓時間管理也是一種享受。',
            items: ['淺色/深色切換', '護眼設計', '精緻 UI']
        },
        {
            icon: Bell,
            title: '今日提醒',
            description: '一眼看到今天的整日活動和重要事項，不會漏掉任何事情。',
            items: ['整日活動提醒', '重要事項標示', '快速掌握行程']
        }
    ];

    // 使用步驟
    const steps = [
        {
            step: 1,
            title: '連接 Google 帳號',
            description: '點擊「使用 Google 登入」，授權 iHaveTime 讀取你的日曆。放心，我們只「讀取」，不會修改任何行程。',
            tip: '如果你有多個 Google 帳號，記得選擇有排行程的那個。'
        },
        {
            step: 2,
            title: '選擇日期範圍',
            description: '預設是今天，你可以點擊日期選擇器，選擇單日或多日範圍（例如：1/21 - 1/25）。',
            tip: '想看整週？直接選「這週」按鈕最快！'
        },
        {
            step: 3,
            title: '設定分析時間',
            description: '預設是 10:00 - 22:00，你可以根據自己的作息調整。如果你是夜貓子，可以設成 14:00 - 02:00。',
            tip: '排除睡眠時間，分析結果更精準。'
        },
        {
            step: 4,
            title: '查看分析結果',
            description: 'AI 會列出所有空閒時段，並根據時長給你活動建議。你會看到類似這樣的結果...',
            tip: '綠色代表空閒時段，紫色是 AI 建議的活動類型。'
        },
        {
            step: 5,
            title: '一鍵複製分享',
            description: '點擊「複製空閒時間」按鈕，直接貼到 Line 群組、Email 或任何地方。',
            tip: '複製格式範例：\n1/21 (一) 10:00-12:00 ✓\n1/21 (一) 14:30-16:00 ✓\n1/22 (二) 09:00-11:30 ✓'
        }
    ];

    // 活動建議對應
    const activitySuggestions = [
        { duration: '15-30 分鐘', icon: Coffee, activity: '☕ 小歇一下', color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { duration: '30-60 分鐘', icon: Dumbbell, activity: '🏃 運動閱讀', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { duration: '1-2 小時', icon: Brain, activity: '💼 專注工作', color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { duration: '2 小時以上', icon: Film, activity: '🎬 看場電影', color: 'text-violet-500', bg: 'bg-violet-500/10' }
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
            {/* 返回按鈕 */}
            <Link to="/lab" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8">
                <ArrowLeft size={18} /> 返回 AI 實驗室
            </Link>

            {/* 標題區 */}
            <div className="mb-16">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">📱</span>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold font-serif text-white">iHaveTime</h1>
                        <p className="text-xl text-zinc-400">智慧分析空閒時間</p>
                    </div>
                </div>
                <p className="text-zinc-300 text-lg leading-relaxed mt-6">
                    還在花時間翻日曆找空檔嗎？<span className="text-white font-medium">iHaveTime</span> 會自動連接你的 Google 日曆，
                    用 AI 幫你分析出所有空閒時間，一鍵複製分享給對方。
                </p>

                {/* CTA 按鈕 */}
                <div className="flex flex-wrap gap-4 mt-8">
                    <a
                        href="https://ihavetime.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity"
                    >
                        立即試用 <ExternalLink size={18} />
                    </a>
                </div>
            </div>

            {/* 核心價值 */}
            <section className="mb-20">
                <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <Sparkles className="text-violet-500" size={24} />
                        為什麼你需要 iHaveTime？
                    </h2>
                    <div className="space-y-4 text-zinc-300 leading-relaxed">
                        <p>
                            <span className="text-white font-medium">「這週你什麼時候有空？」</span> —— 這個問題你一天要回答幾次？
                        </p>
                        <p>
                            每次都要打開日曆，一天一天看，把忙碌的時段排除，再整理成文字回覆對方...
                            <span className="text-violet-400">這個過程平均要花 5-10 分鐘。</span>
                        </p>
                        <p>
                            iHaveTime 把這 10 分鐘變成 <span className="text-white font-medium">10 秒鐘</span>。
                            連接 Google 日曆，選擇日期，複製貼上，搞定。
                        </p>
                    </div>
                </div>
            </section>

            {/* 使用情境 */}
            <section className="mb-20">
                <h2 className="text-3xl font-bold text-white font-serif mb-8">🎯 適合這些人使用</h2>
                <div className="space-y-6">
                    {useCases.map((useCase, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-[#111] border border-white/10 rounded-2xl p-6"
                        >
                            <h3 className="text-xl font-bold text-white mb-4">{useCase.title}</h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="text-xs text-zinc-500 uppercase tracking-wider">情境</span>
                                    <p className="text-zinc-400 mt-1">{useCase.scenario}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-emerald-500 uppercase tracking-wider">解決方案</span>
                                    <p className="text-zinc-300 mt-1">{useCase.solution}</p>
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <CheckCircle size={16} className="text-emerald-500" />
                                    <span className="text-emerald-400 font-medium">{useCase.benefit}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 功能介紹 */}
            <section className="mb-20">
                <h2 className="text-3xl font-bold text-white font-serif mb-8">✨ 核心功能</h2>
                <div className="space-y-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true }}
                            className="bg-[#111] border border-white/10 rounded-2xl p-6"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                                    <feature.icon size={24} className="text-violet-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                    <p className="text-zinc-400 mb-4">{feature.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {feature.items.map((item, j) => (
                                            <span key={j} className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-zinc-400">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* AI 活動建議 */}
            <section className="mb-20">
                <h2 className="text-3xl font-bold text-white font-serif mb-4">🤖 AI 會根據時間長度給你建議</h2>
                <p className="text-zinc-400 mb-8">不只告訴你「什麼時候有空」，還會告訴你「這段時間適合做什麼」：</p>
                <div className="grid sm:grid-cols-2 gap-4">
                    {activitySuggestions.map((item, i) => (
                        <div key={i} className={`p-5 rounded-xl ${item.bg} border border-white/10`}>
                            <div className="flex items-center gap-3 mb-2">
                                <item.icon size={20} className={item.color} />
                                <span className="text-white font-bold">{item.activity}</span>
                            </div>
                            <p className="text-zinc-400 text-sm">空閒 {item.duration}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 使用步驟 */}
            <section className="mb-20">
                <h2 className="text-3xl font-bold text-white font-serif mb-8">📖 5 步驟完整教學</h2>
                <div className="space-y-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true }}
                            className="relative pl-16"
                        >
                            {/* 步驟編號 */}
                            <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                {step.step}
                            </div>
                            {/* 連接線 */}
                            {i < steps.length - 1 && (
                                <div className="absolute left-5 top-12 w-[2px] h-[calc(100%+16px)] bg-gradient-to-b from-violet-500/50 to-transparent" />
                            )}

                            <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-zinc-300 mb-4 leading-relaxed">{step.description}</p>
                                <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-4">
                                    <span className="text-xs text-violet-400 uppercase tracking-wider font-medium">💡 小技巧</span>
                                    <p className="text-zinc-400 text-sm mt-1 whitespace-pre-line">{step.tip}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 安全說明 */}
            <section className="mb-20">
                <h2 className="text-3xl font-bold text-white font-serif mb-8">🔒 安全與隱私</h2>
                <div className="bg-[#111] border border-emerald-500/20 rounded-2xl p-8">
                    <div className="flex items-start gap-4">
                        <Shield size={32} className="text-emerald-500 flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">你的資料 100% 安全</h3>
                            <div className="space-y-3">
                                {[
                                    '✅ 僅「讀取」日曆資料，不會修改你的任何行程',
                                    '✅ 所有資料只在你的瀏覽器中處理，不會上傳到伺服器',
                                    '✅ 使用 Google OAuth 官方安全認證',
                                    '✅ 你可以隨時在 Google 帳號設定中撤銷存取權限'
                                ].map((item, i) => (
                                    <p key={i} className="text-zinc-300">{item}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 底部 CTA */}
            <section className="text-center py-12 border-t border-white/5">
                <h2 className="text-2xl font-bold text-white mb-4">準備好開始了嗎？</h2>
                <p className="text-zinc-400 mb-8">只需連接 Google 帳號，即刻體驗智慧時間分析！</p>
                <div className="flex flex-wrap justify-center gap-4">
                    <a
                        href="https://ihavetime.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity"
                    >
                        立即試用 iHaveTime <ExternalLink size={18} />
                    </a>
                    <Link
                        to="/lab"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        查看更多專案 <ChevronRight size={18} />
                    </Link>
                </div>
                <p className="text-zinc-500 text-sm mt-8">
                    iHaveTime — 讓時間看得見，讓自由更有價值 ⏰✨
                </p>
            </section>
        </motion.div>
    );
};

export default IHaveTimeTutorial;
