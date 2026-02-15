import { MessageSquare, Lightbulb, Rocket } from 'lucide-react';

const ProcessSection = () => {
    const steps = [
        {
            id: '01',
            icon: <MessageSquare size={32} />,
            title: "告訴我你的困擾",
            desc: "不管是工作瑣事、生活雜務，或是任何你想讓 AI 幫忙的事，先說給我聽。"
        },
        {
            id: '02',
            icon: <Lightbulb size={32} />,
            title: "找到最簡單的方法",
            desc: "我會用白話文告訴你怎麼做，不需要寫程式，不需要懂技術，人人都學得會。"
        },
        {
            id: '03',
            icon: <Rocket size={32} />,
            title: "讓 AI 開始幫你做事",
            desc: "跟著步驟實際操作，從此把時間省下來，好好過你想要的生活。"
        }
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