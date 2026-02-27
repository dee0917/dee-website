# 文章體驗革命 — 最終施工藍圖 v2.0
# 合併兩場委員會結論，任何 session 讀到此文件可直接執行

## 核心理念
- 文章 = 互動式學習場景，不是部落格
- 節奏 = 短影音式「Hook → Tension → Release → Loop」
- 每段不超過 3 行，關鍵字螢光標記
- 手機優先，長輩友善

## 文章詳情頁區塊順序（多巴胺節奏）
1. 進度條（固定頂部，隨滾動填充）
2. Header（精簡：分類 + 標題 + 日期，移除星星和標籤雜訊）
3. Hook 痛點（全寬共感開場）
4. Magic 實例對比（提前展示 AI 威力，❌→✅）
5. 場景 + 解決方案（合併為一個「轉折」區塊）
6. Quest 碎步教學（步驟卡片，動畫逐一進場）
7. Treasure 實戰包（寶物掉落感，一鍵複製 + confetti）
8. 金句（呼吸點）
9. 下一階挑戰（「趁熱打鐵」引導）

## 階段 1：CSS 手機排版修復 (index.css)
```css
.step-item {
  @apply flex flex-col md:flex-row md:items-start gap-3 md:gap-4 p-5 md:p-6 rounded-2xl bg-white/5 border border-white/5;
}
.step-number {
  @apply font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-white/10 whitespace-nowrap self-start;
}
```

## 階段 2：進度條 (ArticleDetail.tsx)
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
// 固定在 navbar 下方
<motion.div className="fixed top-20 left-0 right-0 h-1 bg-emerald-500 origin-left z-50" style={{ scaleX: progress }} />
```

## 階段 3：區塊重排序 (ArticleDetail.tsx)
移動 example（實例對比）到 pain_point 之後、scenario 之前

## 階段 4：動畫進場 + 複製微互動
- 每區塊 whileInView={{ opacity: 1, y: 0 }}
- 複製按鈕 whileTap={{ scale: 0.95 }}
- 成功後文字變「已複製！去試試看 🚀」

## 階段 5：列表頁改進 (Insights.tsx)
- 卡片加入預估閱讀時間標籤
- 手機端卡片加大、全寬
- staggerChildren 動畫進場

## 階段 6：18 篇內容全面改寫（分批子代理人）

## 開發 SOP
1. main 分支開發
2. npm run build 驗證
3. npx serve dist -l 4173 -s + cloudflared tunnel 預覽
4. 主人 D 確認後才部署 Vercel
