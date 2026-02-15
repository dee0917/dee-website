import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message === 'Invalid login credentials'
                ? '帳號或密碼錯誤'
                : error.message);
            setLoading(false);
        } else {
            navigate('/admin');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6"
        >
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <span className="font-signature text-4xl text-white">Dee.</span>
                    <p className="text-zinc-400 mt-2">管理後台登入</p>
                </div>

                <form onSubmit={handleLogin} className="bg-[#111] border border-white/10 rounded-2xl p-8">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block text-sm text-zinc-400 mb-2">電子郵件</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-google-blue transition-colors"
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm text-zinc-400 mb-2">密碼</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-google-blue transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-google-blue text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? '登入中...' : '登入'}
                    </button>
                </form>

                <p className="text-center text-zinc-600 text-sm mt-6">
                    只有管理員可以登入此後台
                </p>
            </div>
        </motion.div>
    );
};

export default AdminLogin;
