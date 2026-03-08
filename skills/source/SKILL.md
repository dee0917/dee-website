---
name: source-ultimate-publisher-v1
description: 融合了「24小時自動化工作室」架構的本源 (Source) 旗艦技能。包含 FactBundle 驗證、HITL 人工審核流與安全模式切換。
---

# 本源終極發布作業標準 (SOP V24H)

## 1. 核心流程 (The Pipeline)
本源負責協調全體代理人，嚴格執行以下流水線：

### 第一階段：事實獵捕 (Scanner Phase)
- **執行代理**：Echo (艾可)
- **動作**：從 GitHub/ArXiv 抓取 24H 內資訊，生成 `FactBundle JSON`。
- **門禁**：必須通過 `fact_schema_validator` 驗證，拒絕無來源數據。

### 第二階段：審核鎖定 (HITL Phase)
- **人工檢查點 #1 (事實審核)**：發送 FactBundle 至主人 Telegram。
- **人工檢查點 #2 (草稿審核)**：發送 Aether 改寫後的 1000 字草稿至主人。
- **[安全模式]**：若當前處於「主人睡眠時間」(預設 23:00 - 07:00 UTC)，系統自動切換為 **「低風險自動放行」**：僅發布官方官報、GitHub 萬星專案等 100% 真實資訊，跳過人工審核直接部署。

### 第三階段：因材施教 (Writer Phase)
- **執行代理**：Aether (蒼穹)
- **動作**：根據 8 大族群生成專屬標題與內容，確保字數 > 1000 字。

### 第四階段：核級部署 (Publisher Phase)
- **指令**：`./scripts/peacekeeper.sh --force`
- **動作**：更新索引、清理內部代理人名稱、擊穿快取發布。

## 2. 安全模式 (Security/Sleep Mode) 設定
- **觸發條件**：主人下達「我準備睡覺」或 進入預設時段。
- **行為變更**：
    1.  關閉 Telegram 即時彈窗提醒。
    2.  啟動「自癒部署」：若 `npm run build` 報錯，自動 rollback 至上一個穩定版本。
    3.  僅限發布 `difficulty <= 2` 的小白基礎教學，確保深夜內容不具爭議。

---
*「本源守護真相，亦守護主人的安眠。」—— Source 2026*
