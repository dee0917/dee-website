import { useState } from 'react';
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface NewsletterFormProps {
    className?: string;
    variant?: 'default' | 'compact';
}

const NewsletterForm = ({ className = '', variant = 'default' }: NewsletterFormProps) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 驗證 email 格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setStatus('error');
            setMessage('請輸入有效的 Email 地址');
            return;
        }

        setStatus('loading');

        try {
            const { error } = await supabase
                .from('subscribers')
                .insert([{ email, source: 'website' }]);

            if (error) {
                if (error.code === '23505') {
                    // 重複訂閱
                    setStatus('success');
                    setMessage('你已經是訂閱者囉！我們會持續寄送精彩內容給你 ✨');
                } else {
                    throw error;
                }
            } else {
                // 新訂閱成功
                // NOTE: 歡迎郵件功能 - 需要使用 Resend 註冊的 Email 才能收到
                const ENABLE_WELCOME_EMAIL = true; // 已啟用

                if (ENABLE_WELCOME_EMAIL) {
                    try {
                        await fetch(
                            `${import.meta.env.VITE_SUPABASE_URL || 'https://fnymjffskndfgcpcydsh.supabase.co'}/functions/v1/send-welcome`,
                            {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email })
                            }
                        );
                    } catch (emailErr) {
                        console.error('Welcome email error:', emailErr);
                    }
                }

                setStatus('success');
                setMessage('訂閱成功！感謝你的支持 🎉');
                setEmail('');
            }
        } catch (err) {
            console.error('Subscription error:', err);
            setStatus('error');
            setMessage('訂閱時發生錯誤，請稍後再試');
        }
    };

    // 成功後 5 秒重置狀態
    if (status === 'success') {
        setTimeout(() => {
            setStatus('idle');
            setMessage('');
        }, 5000);
    }

    if (variant === 'compact') {
        return (
            <div className={className}>
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <div className="relative flex-1">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="你的 Email"
                            disabled={status === 'loading' || status === 'success'}
                            className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-google-blue transition-colors disabled:opacity-50"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className={`px-6 rounded font-medium whitespace-nowrap transition-all flex items-center gap-2 ${status === 'success'
                            ? 'bg-green-500 text-white'
                            : 'bg-google-blue text-white hover:bg-[#3367D6]'
                            } disabled:opacity-70`}
                    >
                        {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
                        {status === 'success' && <Check size={16} />}
                        {status === 'idle' && '訂閱週報'}
                        {status === 'loading' && '處理中...'}
                        {status === 'success' && '已訂閱'}
                        {status === 'error' && '重試'}
                    </button>
                </form>
                {/* 成功訊息 */}
                {status === 'success' && (
                    <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-400 text-sm">
                        <Check size={16} />
                        {message}
                    </div>
                )}
                {/* 錯誤訊息 */}
                {status === 'error' && (
                    <div className="mt-3 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={12} /> {message}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={`bg-gradient-to-br from-google-blue/10 to-transparent border border-google-blue/20 rounded-2xl p-8 ${className}`}>
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-google-blue/20 flex items-center justify-center">
                    <Send size={18} className="text-google-blue" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">訂閱 AI 週報</h3>
                    <p className="text-sm text-zinc-400">每週一篇，讓你輕鬆跟上 AI 新知</p>
                </div>
            </div>

            {status === 'success' ? (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
                    <Check className="text-green-400" size={20} />
                    <p className="text-green-400">{message}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="輸入你的 Email"
                            disabled={status === 'loading'}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-google-blue transition-colors"
                        />
                        {status === 'error' && (
                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                <AlertCircle size={14} /> {message}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-google-blue text-white py-3 rounded-lg font-medium hover:bg-[#3367D6] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {status === 'loading' ? (
                            <>
                                <Loader2 size={16} className="animate-spin" /> 處理中...
                            </>
                        ) : (
                            <>
                                <Send size={16} /> 訂閱週報
                            </>
                        )}
                    </button>
                    <p className="text-xs text-zinc-500 text-center">
                        我不會發垃圾郵件，隨時可以取消訂閱
                    </p>
                </form>
            )}
        </div>
    );
};

export default NewsletterForm;
