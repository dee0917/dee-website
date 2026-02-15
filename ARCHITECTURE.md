# ARCHITECTURE.md — dee-website 系統架構

## 目錄結構

```
dee-website/
├── src/
│   ├── App.tsx                   # 路由總入口（前台/後台分流）
│   ├── main.tsx                  # React 入口（BrowserRouter）
│   ├── index.css                 # 全域樣式（TailwindCSS 3）
│   │
│   ├── pages/                    # 頁面組件
│   │   ├── Home.tsx              # 首頁（29KB 主要 Landing Page）
│   │   ├── Insights.tsx          # 文章列表
│   │   ├── ArticleDetail.tsx     # 文章詳情
│   │   ├── Solutions.tsx         # 解決方案
│   │   ├── Lab.tsx               # 實驗室
│   │   ├── IHaveTimeTutorial.tsx  # iHaveTime 教學頁
│   │   ├── About.tsx             # 關於我們
│   │   └── admin/                # 管理後台頁面（11 個）
│   │       ├── AdminLogin.tsx
│   │       ├── AdminDashboard.tsx
│   │       ├── InsightsList.tsx
│   │       ├── InsightEditor.tsx     # Tiptap 富文本編輯器
│   │       ├── ContentStructureManager.tsx
│   │       ├── ContentReviewQueue.tsx
│   │       ├── DataSyncManager.tsx
│   │       ├── SolutionsList.tsx
│   │       ├── TestimonialsList.tsx
│   │       ├── SubscribersList.tsx
│   │       └── SiteSettingsPage.tsx
│   │
│   ├── components/
│   │   ├── layout/               # 佈局組件
│   │   │   ├── Navbar.tsx        # 前台導航列
│   │   │   └── Footer.tsx        # 前台頁腳
│   │   ├── sections/             # 首頁區塊組件
│   │   ├── ui/                   # 通用 UI 組件
│   │   └── admin/
│   │       └── AdminLayout.tsx   # 管理後台獨立佈局
│   │
│   ├── lib/                      # 工具與服務
│   │   ├── supabase.ts           # Supabase 客戶端
│   │   └── ...
│   │
│   └── data/                     # 靜態資料
│
├── docs/                         # 整合設計文件
│   ├── CONTENT_STRUCTURE_GUIDE.md
│   ├── DATA_SYNC_GUIDE.md
│   ├── DATA_SYNC_SUMMARY.md
│   ├── IMPLEMENTATION_SUMMARY.md
│   ├── N8N_AUTOMATION_GUIDE.md
│   ├── N8N_AUTOMATION_SUMMARY.md
│   ├── N8N_IMPLEMENTATION_COMPLETE.md
│   └── QUICK_START_STRUCTURE.md
│
├── n8n-workflows/                # N8N 工作流配置（5 個）
├── supabase/                     # Supabase 配置 / 遷移
├── scripts/                      # 工具腳本
│
├── vercel.json                   # Vercel 部署配置
├── vite.config.ts                # Vite 建構配置
├── tailwind.config.js            # TailwindCSS 配置
├── tsconfig.json                 # TypeScript 配置
└── package.json                  # 依賴與指令
```

## 核心邏輯流向

### 路由分流架構

```
App.tsx
    │
    ├── pathname.startsWith('/admin') ?
    │       │
    │       ├── YES → 管理後台路由
    │       │   ├── /admin/login    → AdminLogin（獨立頁面）
    │       │   └── /admin/*        → AdminLayout 包裹
    │       │       ├── /admin           → AdminDashboard
    │       │       ├── /admin/insights  → InsightsList
    │       │       ├── /admin/insights/:id → InsightEditor
    │       │       └── ... (共 11 頁)
    │       │
    │       └── NO → 前台路由
    │           ├── Navbar + Footer 佈局
    │           ├── AnimatePresence 頁面過渡
    │           ├── /              → Home
    │           ├── /insights      → Insights
    │           ├── /insights/:id  → ArticleDetail
    │           ├── /solutions     → Solutions
    │           ├── /lab           → Lab
    │           ├── /lab/ihavetime → IHaveTimeTutorial
    │           └── /about         → About
```

### 資料流

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  前台頁面     │     │  管理後台     │     │  N8N 自動化   │
│  (展示資料)   │     │  (CRUD 操作)  │     │  (Webhook)   │
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                    │                    │
       └────────┬───────────┘                    │
                │                                │
                ▼                                ▼
        ┌──────────────┐              ┌──────────────┐
        │   Supabase   │◄─────────────│  N8N 工作流   │
        │   (資料庫)    │              │  (自動化引擎) │
        └──────────────┘              └──────────────┘
```

## 技術棧

| 層級 | 技術 |
| --- | --- |
| 建構工具 | Vite 5.1 |
| UI 框架 | React 18 + TypeScript 5 |
| 路由 | React Router DOM 6 |
| 樣式 | TailwindCSS 3.4 |
| 動畫 | Framer Motion 11 |
| 富文本 | Tiptap 3.15（Image、Link、Placeholder 擴充）|
| 資料庫 | Supabase |
| 自動化 | N8N（webhook 整合）|
| 部署 | Vercel |
| 圖示 | Lucide React |
