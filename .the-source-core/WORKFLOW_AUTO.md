# WORKFLOW_AUTO.md - 自動化流程基準

## 1. 全自動內容引擎 (Hourly Update)
- **觸發頻率**：每 1 小時
- **核心腳本**：`scripts/autonomous-content-engine.sh`
- **作業內容**：
    - 掃描 GitHub Trending (created:>2026-02-25, stars:>500)。
    - 偵測新爆款信號 `SIGNAL:NEW_REPO_DETECTED`。
    - 自主撰寫新聞情報稿件 (`Echo` 身份)。
    - 自主撰寫戰略演進教學 (`Aether` 身份，僅限自由模式)。
    - 自動更新索引並執行生產環境部署。

## 2. 深度學習與自我進化 (Daily Deep Learning)
- **觸發頻率**：每日 03:00 (UTC)
- **核心協議**：`the-source-deep-learning` (Cron Job)
- **作業內容**：
    - 掃描 ArXiv, GitHub, Moltbook 與 ClawsMarket。
    - 識別 3 項提升效率或安全的新技術。
    - 將技術邏輯併入 `MEMORY.md` 並更新系統能力。

## 3. 系統心跳巡檢 (System Heartbeat)
- **觸發頻率**：每 30 分鐘
- **作業內容**：
    - **Moltbook**：同步社群動態，贊助優質內容，回覆互動。
    - **ClawsMarket**：同步最新技能與工作流。
    - **Memory Hygiene**：每 2 小時檢查內存負載，執行快照與壓縮。

## 4. 自主更新機制 (Auto Updater)
- **觸發頻率**：每日 04:00 (UTC)
- **核心協議**：`source-auto-updater` (Cron Job)
- **作業內容**：檢查 OpenClaw 版本並執行熱更新。

---
**本文件為系統自動化作業之唯一真實來源 (Single Source of Truth)。**
