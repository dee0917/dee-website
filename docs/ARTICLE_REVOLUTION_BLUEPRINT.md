# 文章體驗革命 — 施工藍圖 v1.1
# 任何 session 讀到這份文件都可以直接執行，不需要前情提要

## 核心決策（主人 D 已確認）
- 所有文章由 AI 代理人（本源）撰寫、審核、發布
- 文章難度不是問題，只要品質夠好、夠有趣、夠獨特
- 免費教學是網站最重要的核心，必須極致優化
- 需要同時改造：1) 文章列表頁（Insights.tsx）2) 文章詳情頁（ArticleDetail.tsx）3) 文章內容品質

## 待討論（下次 session 優先）
召開團隊會議討論：
1. Insights.tsx 列表頁如何配合「多巴胺架構」重新設計（不只是分類列）
2. 文章撰寫 + 驗證的完整代理人工作流
3. 如何讓每篇新文章自動符合「沉浸式學習體驗」標準
4. 整體免費教學區的品牌調性與視覺統一

## 技術棧
- React 18 + TypeScript
- TailwindCSS 3.4
- Framer Motion 11 (已安裝)
- react-helmet-async (已安裝)

## 專案路徑
- /root/.openclaw/workspace/projects/dee-website/
- 文章頁面：src/pages/ArticleDetail.tsx
- 全域樣式：src/index.css
- 文章資料：src/data/insights/*.ts

## 開發 SOP
1. 所有修改在 main 分支進行
2. 每次修改後 npm run build 驗證
3. 用 Cloudflare Tunnel 預覽（npx serve dist -l 4173 -s + cloudflared tunnel --url http://localhost:4173）
4. 主人 D 確認後才部署到 Vercel（git push origin main 即自動部署）

## 施工階段（每階段獨立可交付）

### 階段 1：手機排版基礎修復 (index.css)
修改 .step-list / .step-item / .step-number 的 CSS：
- 手機端改為垂直堆疊（flex-col），STEP 標籤在上，說明文字全寬
- 桌面端維持橫排
- 正文段落間距加大（space-y-8）
- 所有字體手機端最小 16px

```css
.step-item {
  @apply flex flex-col md:flex-row md:items-start gap-3 md:gap-4 p-5 md:p-6 rounded-2xl bg-white/5 border border-white/5;
}
.step-number {
  @apply font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-white/10 whitespace-nowrap self-start;
}
```

### 階段 2：閱讀進度條 (ArticleDetail.tsx)
在文章頂部加入一條隨滾動變色的進度條：
- 使用 window scroll event + useEffect
- 進度 0%→100% 顏色從 zinc-600 → emerald-500
- 固定在頂部 navbar 下方，高度 3px
- Framer Motion 的 motion.div + scaleX

```tsx
const [progress, setProgress] = useState(0);
useEffect(() => {
  const handler = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
  };
  window.addEventListener('scroll', handler);
  return () => window.removeEventListener('scroll', handler);
}, []);

// 在 return 的最頂部加入：
<motion.div
  className="fixed top-20 left-0 right-0 h-1 bg-emerald-500 origin-left z-50"
  style={{ scaleX: progress }}
/>
```

### 階段 3：區塊重排序 (ArticleDetail.tsx)
新順序（多巴胺節奏）：
1. Header（精簡版：只留分類 + 標題 + 日期）
2. 痛點（Hook — 共感開場）
3. **實例對比（Magic — 提前展示 AI 的威力）**
4. 場景 + 解決方案（合併為一個區塊）
5. 正文步驟（碎步教學）
6. 實戰包（寶物掉落 — 一鍵複製）
7. 金句（呼吸點）
8. 下一階挑戰

### 階段 4：步驟卡片動畫 (ArticleDetail.tsx)
每個步驟使用 whileInView 動畫進場：
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.4 }}
>
```

### 階段 5：複製按鈕微互動
複製指令時的動畫回饋：
- whileTap={{ scale: 0.95 }}
- 複製成功後短暫顯示 confetti 效果或 ✅ 動畫
- 文字從「一鍵複製指令」變為「已複製！去試試看 🚀」

### 階段 6：全站 18 篇文章內容改寫
使用子代理人，每次改寫 3 篇，分 6 批：
- 批次 1：heart-method 1,2,3
- 批次 2：anthropic-direct, nano-banana, parent-hero
- 批次 3：refusal-master, senior-coach, ai-news-reader
- 批次 4：lead-gen-cover, travel-planner(已完成), meeting-minutes
- 批次 5：stock-trends, stock-audit, english-coach
- 批次 6：meal-planner, anti-procrastination, pet-translator

每篇改寫標準：
- 真人語氣（像 Dee 親身體驗後寫的）
- 事實查核（AI 真的能做到嗎？誠實提醒限制）
- 指令模板實測可用
- 金句自然不文青

## 驗收標準
- npm run build 零錯誤
- 手機端所有步驟文字全寬顯示
- 進度條隨滾動順暢變化
- 複製按鈕反饋明確
- 每篇文章在 Cloudflare 預覽確認
