export interface InsightArticle {
  id: number;
  category: string;
  themeColor: 'blue' | 'pink' | 'cyan' | 'purple' | 'orange' | 'green';
  difficulty_level: number;
  level: number;
  tags: string[];
  title: string;
  summary: string;
  date: string;
  readTime: string;
  pain_point: string;
  scenario: string;
  solution: string;
  example: {
    wrong: string;
    right: string;
  };
  insight_quote: string;
  steps: {
    title: string;
    body: string;
    dee_tip: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  };
  skill_badge: string;
  practice_kit: {
    title: string;
    description: string;
    command: string;
  };
  content: string;
}
