# CLAUDE.md — dee-website 開發環境指南

## 專案概覽

Dee Productivity Lab 官方網站 — 一個整合前台展示與管理後台的全功能企業官網，使用 Supabase 作為資料庫，N8N 作為自動化引擎。

---

## 開發環境設置

### 系統需求

- Node.js ≥ 18
- npm ≥ 9

### 安裝與啟動

```bash
# 安裝依賴
npm install

# 啟動開發伺服器（Vite）
npm run dev
# 開發伺服器：http://localhost:5173

# 生產建構
npm run build    # tsc && vite build

# 預覽建構結果
npm run preview
```

### 環境變數

需要在根目錄建立 `.env` 或 `.env.local`，設定：
- Supabase URL 與 Anon Key（參考 `src/lib/` 中的 Supabase 客戶端配置）

---

## 技術棧

| 技術 | 版本 |
| --- | --- |
| Vite | ^5.1.4 |
| React | ^18.2.0 |
| TypeScript | ^5.2.2 |
| TailwindCSS | ^3.4.1 |
| React Router DOM | ^6.22.0 |
| Framer Motion | ^11.0.0（頁面過渡動畫）|
| Tiptap | ^3.15.3（富文本編輯器：管理後台用）|
| Supabase JS | ^2.90.1 |
| Lucide React | ^0.344.0（圖示庫）|

---

## 代碼風格規範

### 目錄慣例

- `src/pages/`：前台頁面組件 + `admin/` 管理後台頁面
- `src/components/layout/`：佈局組件（Navbar、Footer）
- `src/components/sections/`：首頁區塊組件
- `src/components/ui/`：通用 UI 組件
- `src/components/admin/`：管理後台專用組件
- `src/lib/`：工具函數與 Supabase 客戶端
- `src/data/`：靜態資料

### 路由結構

- 前台使用 `<Navbar>` + `<Footer>` 佈局
- 管理後台使用獨立 `<AdminLayout>` 佈局
- 路由判斷：`location.pathname.startsWith('/admin')` 分流

### 命名規範

- 組件：PascalCase（如 `AdminDashboard`、`InsightEditor`）
- 檔案：PascalCase（與組件名一致）
- 樣式：TailwindCSS 3 utility classes + `clsx` / `tailwind-merge`

### 動畫

- 使用 Framer Motion 的 `AnimatePresence` + `mode="wait"` 做頁面過渡
- 每次路由切換自動滾動到頂部

### 註釋標記

```ts
// TODO: 待實現功能
// FIXME: 已知問題或潛在缺陷
// NOTE: 重要設計說明
// HACK: 臨時方案，後續必須重構
```
