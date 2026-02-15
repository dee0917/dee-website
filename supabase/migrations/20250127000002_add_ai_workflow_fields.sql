-- 添加 AI 工作流相關欄位到 insights 表
ALTER TABLE insights
ADD COLUMN IF NOT EXISTS ai_generated BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level >= 1 AND difficulty_level <= 5),
ADD COLUMN IF NOT EXISTS quality_score INTEGER DEFAULT 0 CHECK (quality_score >= 0 AND quality_score <= 100),
ADD COLUMN IF NOT EXISTS quality_issues JSONB,
ADD COLUMN IF NOT EXISTS review_notes TEXT,
ADD COLUMN IF NOT EXISTS news_source_link TEXT,
ADD COLUMN IF NOT EXISTS validation JSONB;

-- 創建分類建議表
CREATE TABLE IF NOT EXISTS category_suggestions (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    reason TEXT NOT NULL,
    related_keywords TEXT[] NOT NULL,
    difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level >= 1 AND difficulty_level <= 5),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    suggested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 創建索引
CREATE INDEX IF NOT EXISTS idx_insights_ai_generated ON insights(ai_generated);
CREATE INDEX IF NOT EXISTS idx_insights_difficulty_level ON insights(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_insights_quality_score ON insights(quality_score);
CREATE INDEX IF NOT EXISTS idx_category_suggestions_status ON category_suggestions(status);

-- 添加註解
COMMENT ON COLUMN insights.ai_generated IS '標記是否為 AI 自動生成的內容';
COMMENT ON COLUMN insights.difficulty_level IS '內容難度等級 1-5 (1=入門, 5=進階)';
COMMENT ON COLUMN insights.quality_score IS 'AI 生成內容的品質評分 (0-100)';
COMMENT ON COLUMN insights.quality_issues IS '品質檢查發現的問題列表';
COMMENT ON COLUMN insights.review_notes IS '審核人員的審核筆記';
COMMENT ON COLUMN insights.news_source_link IS '如果來自新聞，原始新聞連結';
COMMENT ON COLUMN insights.validation IS '內容驗證結果';
COMMENT ON TABLE category_suggestions IS 'AI 建議的新分類';
