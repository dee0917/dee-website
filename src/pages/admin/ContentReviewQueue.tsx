import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, X, Eye, Calendar, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase, Insight } from '../../lib/supabase';

type ReviewStatus = 'pending' | 'approved' | 'rejected';

interface ReviewInsight extends Insight {
  review_status: ReviewStatus;
  review_notes?: string;
  created_at: string;
  ai_generated?: boolean;
  difficulty_level?: number;
}

export default function ContentReviewQueue() {
  const [articles, setArticles] = useState<ReviewInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });
  const [selectedArticle, setSelectedArticle] = useState<ReviewInsight | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  useEffect(() => {
    fetchArticles();
    subscribeToChanges();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('insights')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const articlesWithStatus = data.map(article => ({
        ...article,
        review_status: article.is_published ? 'approved' : 'pending',
        ai_generated: article.summary?.includes('AI自動生成')
      }));

      setArticles(articlesWithStatus);
      calculateStats(articlesWithStatus);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToChanges = () => {
    const channel = supabase
      .channel('insights_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'insights' }, () => {
        fetchArticles();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const calculateStats = (allArticles: ReviewInsight[]) => {
    setStats({
      total: allArticles.length,
      pending: allArticles.filter(a => a.review_status === 'pending').length,
      approved: allArticles.filter(a => a.review_status === 'approved').length,
      rejected: allArticles.filter(a => a.review_status === 'rejected').length
    });
  };

  const filteredArticles = articles.filter(article => {
    if (filter === 'all') return true;
    return article.review_status === filter;
  });

  const handleApprove = async (articleId: number) => {
    try {
      const { error } = await supabase
        .from('insights')
        .update({ is_published: true })
        .eq('id', articleId);

      if (error) throw error;

      await fetchArticles();
      setSelectedArticle(null);
    } catch (error) {
      console.error('Error approving article:', error);
      alert('審核失敗，請稍後再試');
    }
  };

  const handleReject = async (articleId: number, notes: string) => {
    if (!notes.trim()) {
      alert('請輸入拒絕原因');
      return;
    }

    try {
      const { error } = await supabase
        .from('insights')
        .update({
          is_published: false,
          review_notes: notes
        })
        .eq('id', articleId);

      if (error) throw error;

      await fetchArticles();
      setSelectedArticle(null);
      setReviewNotes('');
    } catch (error) {
      console.error('Error rejecting article:', error);
      alert('審核失敗，請稍後再試');
    }
  };

  const handleBulkApprove = async () => {
    const pendingArticles = articles.filter(a => a.review_status === 'pending');
    if (pendingArticles.length === 0) return;

    if (!confirm(`確定要批准 ${pendingArticles.length} 篇文章？`)) return;

    try {
      const { error } = await supabase
        .from('insights')
        .update({ is_published: true })
        .in('id', pendingArticles.map(a => a.id));

      if (error) throw error;

      await fetchArticles();
      alert('已批准所有待審文章');
    } catch (error) {
      console.error('Error bulk approving:', error);
      alert('批量批准失敗');
    }
  };

  const getDifficultyStars = (level?: number) => {
    if (!level) return '—';
    return '★'.repeat(level) + '☆'.repeat(5 - level);
  };

  const getStatusColor = (status: ReviewStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'approved':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  const getStatusLabel = (status: ReviewStatus) => {
    switch (status) {
      case 'pending': return '待審核';
      case 'approved': return '已批准';
      case 'rejected': return '已拒絕';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">內容審核區</h1>
          <p className="text-zinc-400">審核 AI 自動生成的內容，確保品質後發布</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="總文章數" value={stats.total} icon={Calendar} color="blue" />
          <StatCard title="待審核" value={stats.pending} icon={Clock} color="amber" />
          <StatCard title="已批准" value={stats.approved} icon={CheckCircle2} color="emerald" />
          <StatCard title="已拒絕" value={stats.rejected} icon={X} color="red" />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-4 mb-6">
          {['all', 'pending', 'approved', 'rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === status
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10'
              }`}
            >
              {status === 'all' && '全部'}
              {status === 'pending' && '待審核'}
              {status === 'approved' && '已批准'}
              {status === 'rejected' && '已拒絕'}
            </button>
          ))}

          {filter === 'pending' && stats.pending > 0 && (
            <button
              onClick={handleBulkApprove}
              className="ml-auto px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors flex items-center gap-2"
            >
              <Check size={18} />
              一鍵批准全部
            </button>
          )}
        </div>

        {/* Article List */}
        {loading ? (
          <div className="text-center py-12 text-zinc-500">載入中...</div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            {filter === 'pending' ? '沒有待審核的文章 🎉' : '沒有符合條件的文章'}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredArticles.map(article => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#111] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(article.review_status)}`}>
                        {getStatusLabel(article.review_status)}
                      </span>
                      {article.ai_generated && (
                        <span className="px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-400">
                          AI 自動生成
                        </span>
                      )}
                      <span className="text-sm text-zinc-500">{article.category}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2">{article.title}</h3>
                    <p className="text-zinc-400 text-sm mb-3 line-clamp-2">{article.summary}</p>

                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                      <span>難度: {getDifficultyStars(article.difficulty_level)}</span>
                      <span>•</span>
                      <span>{article.read_time}</span>
                      <span>•</span>
                      <span>{new Date(article.created_at).toLocaleDateString('zh-TW')}</span>
                    </div>

                    {article.review_notes && (
                      <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="text-sm text-red-400">
                          <strong>拒絕原因:</strong> {article.review_notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.open(`/insights/${article.id}`, '_blank')}
                      className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                      title="預覽"
                    >
                      <Eye size={18} />
                    </button>

                    {article.review_status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(article.id)}
                          className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded transition-colors"
                          title="批准"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedArticle(article);
                            setReviewNotes('');
                          }}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                          title="拒絕"
                        >
                          <X size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Reject Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#111] border border-white/10 rounded-xl p-6 max-w-lg w-full"
            >
              <h3 className="text-xl font-bold text-white mb-4">拒絕文章</h3>
              <p className="text-zinc-400 mb-4">{selectedArticle.title}</p>

              <textarea
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="請輸入拒絕原因（將會顯示在審核記錄中）..."
                className="w-full h-32 bg-black/50 border border-white/10 rounded-lg p-3 text-white placeholder:text-zinc-500 resize-none focus:outline-none focus:border-emerald-500"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 bg-white/5 text-zinc-400 rounded-lg hover:bg-white/10 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={() => handleReject(selectedArticle.id, reviewNotes)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  確認拒絕
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: number; icon: any; color: string }) {
  const colorClasses = {
    blue: 'text-blue-400 bg-blue-500/20',
    amber: 'text-amber-400 bg-amber-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/20',
    red: 'text-red-400 bg-red-500/20'
  };

  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-zinc-400">{title}</span>
        <div className={`p-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon size={18} />
        </div>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}
