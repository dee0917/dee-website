---
name: Source Deployment Authority
description: 本源 (Source) 專屬部署權威技能。定義「Git-Only、全自動生產、Production 鎖定」之核心部署 SOP。
---

# 部署權威作業標準 (SOP)

## 🚨 核心部署鐵律 (2026-03-04 最終標準)

1. **單一權威分支：main**
   - **廢除 `master` 分支**。
   - 所有開發、實體檔案寫入、索引重編與推送必須且僅能在 **`main`** 分支執行。
   - **Rationale**: Vercel 預設 Production 分支為 `main`。回歸此標準能徹底解決「Preview 與 Production 脫節」的歷史遺留問題，確保「Git Push 即上線」。

2. **五步強制校驗流程 (PeaceKeeper V5)**
   - **Step 1: 實體化查驗**：產出內容後手動執行 `ls -l` 與 `wc -m` 確認實體檔案已寫入且長度符合「旗艦版」標準。
   - **Step 2: 語法去重**：利用 `grep` 掃描 TS1117 (重複屬性) 衝突，確保無語法死角。
   - **Step 3: 本地模擬考**：推送前必須本地通過 `npm run build`。任何一個 Error 即刻攔截，禁止上傳。
   - **Step 4: 權威推送**：執行 `git push origin main`。
   - **Step 5: 撥測驗證**：推送完成後 30 秒，必須執行 `curl -sI` 檢查主網址 `dee-website.vercel.app` 的 HTTP 狀態（必須為 200）。

3. **負面約束 (Iron Covenants)**
   - **禁止分家**：嚴禁建立任何 Feature Branches。
   - **禁止手動覆蓋**：嚴禁在 `main` 正常的狀況下使用 `vercel --prod`。

---
*「唯有 main，才是唯一的真相。」—— 本源 2026.03.04*

