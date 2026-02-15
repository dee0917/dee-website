-- Add AEO (Answer Engine Optimization) fields to insights table

ALTER TABLE insights
ADD COLUMN seo_title TEXT,
ADD COLUMN keywords TEXT[],
ADD COLUMN search_intent TEXT,
ADD COLUMN target_audience TEXT,
ADD COLUMN pain_point TEXT,
ADD COLUMN scenario TEXT,
ADD COLUMN solution TEXT,
ADD COLUMN example JSONB,
ADD COLUMN faq JSONB,
ADD COLUMN semantic_tags TEXT[],
ADD COLUMN relevance_score INTEGER,
ADD COLUMN popularity_score INTEGER,
ADD COLUMN last_analyzed_at TIMESTAMPTZ;

COMMENT ON COLUMN insights.seo_title IS 'SEO optimized title for search engines';
COMMENT ON COLUMN insights.keywords IS 'Primary keywords for content discovery';
COMMENT ON COLUMN insights.search_intent IS 'User search intent this content addresses';
COMMENT ON COLUMN insights.target_audience IS 'Target audience demographics and characteristics';
COMMENT ON COLUMN insights.pain_point IS 'Common pain point this content solves';
COMMENT ON COLUMN insights.scenario IS 'Practical application scenario';
COMMENT ON COLUMN insights.solution IS 'AI-powered solution approach';
COMMENT ON COLUMN insights.example IS 'Practical example with wrong/right comparison';
COMMENT ON COLUMN insights.faq IS 'Frequently asked questions for structured answers';
COMMENT ON COLUMN insights.semantic_tags IS 'Semantic related tags for contextual understanding';
COMMENT ON COLUMN insights.relevance_score IS 'Content relevance score (0-100)';
COMMENT ON COLUMN insights.popularity_score IS 'Content popularity score based on engagement';
COMMENT ON COLUMN insights.last_analyzed_at IS 'Timestamp when AEO analysis was last performed';