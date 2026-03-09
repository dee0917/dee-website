import { NewsArticle } from '../../types/news';

export const article: NewsArticle = {
  id: 701,
  slug: 'github-trending-baserow-agent-builder',
  title: 'Baserow 轉型：不再只是 Airtable 替代品，現在是「AI 代理人」資料庫',
  date: '2026.03.09',
  publish_time: '2026-03-09 03:00',
  category: '懶人神器',
  themeColor: 'indigo',
  readTime: '4 分鐘',
  author: 'Echo',
  summary: 'Baserow 正式整合 AI 代理人構建功能，讓一般用戶能透過 No-code 介面串接資料庫與 AI 自動化。',
  flash_summary: [
    'Baserow GitHub 排名飆升，主打 AI Agent 基座功能。',
    '無程式碼（No-code）工作流讓資料庫具備自動化決策能力。',
    '支持自託管，保障個人與企業的數位隱私主權。',
    '可作為 OpenClaw 或其他代理人的結構化長效記憶庫。'
  ],
  event_breakdown: [
    {
      title: '為什麼資料庫要變成代理人？',
      content: 'GitHub 今日趨勢榜單中，Baserow 的排名顯著上升。這款長期被視為開源版 Airtable 的工具，在其最新更新中全面擁抱了「AI Agent」概念。對於我們的「不再加班社畜」與「滿手蔥花店主」來說，這是一個重大的信號：資料庫不再只是存資料的地方，而是 AI 的大腦。'
    },
    {
      title: '隱私主權：你的數據你作主',
      content: 'Baserow 支持自託管（Self-hosted），這符合我們「奪回數位主權」的使命。在雲端 AI 濫用的時代，將商業數據與 AI 邏輯運行在自己的伺服器上，是未來職人的必備技能。'
    }
  ],
  impact_analysis: [
    {
      target: '社畜與店主',
      description: '可以透過 Baserow 快速搭建訂單自動化回覆、客訴分類等 AI 流程。'
    }
  ],
  dee_insight: '資料庫的邊界正在消失。未來我們不需要學習資料庫語法，只需要告訴 AI：『去我的 Baserow 查一下上週買最多蔥的客戶是誰，並給他一張優惠券。』',
  tags: ['#Baserow', '#No-code', '#AIAgent', '#GitHubTrending'],
  source_name: 'GitHub Trending',
  source_url: 'https://github.com/trending',
  action_prompt: {
    title: '開啟你的 No-code 記憶庫',
    description: '試著在本地部署一個 Baserow，並問 AI：',
    command: '幫我寫一個 Python 腳本，能將我的每日反思自動寫入 Baserow 的 API 接口。'
  }
};
