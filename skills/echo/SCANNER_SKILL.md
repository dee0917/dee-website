---
name: scanner-agent-ops
description: 子代理人 A (Scanner) 的核心運作技能。負責 24H 鮮度情報獵捕與事實包 (FactBundle) 驗證。
---

# Scanner 運作標準 (SOP)

## 1. 技能實裝清單
- **`github_scraper`**: 透過 REST/GraphQL 監控 GitHub Trending 每日榜單。
- **`arxiv_fetcher`**: 每日定時抓取 cs.AI 類別的最新論文 RSS。
- **`entity_extractor`**: 萃取技術名稱（如 R2, V4）、作者與核心指標（如 1/10 成本）。
- **`dedup_filter`**: 透過 `SETNX` 機制確保 24 小時內不重複推送相同 URL 的新聞。
- **`fact_schema_validator`**: 強制輸出格式為標準 `FactBundle JSON`。

## 2. 實裝功能與優勢
- **數據白名單**：確保後續 Writer 只能根據「事實包」內容撰寫，嚴禁幻覺。
- **24H 鮮度鎖定**：自動過濾超過 1 天的過期資訊。

---
*「事實是新聞的靈魂。」*
