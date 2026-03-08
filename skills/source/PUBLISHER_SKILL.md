---
name: publisher-agent-ops
description: 子代理人 C (Publisher) 的核心運作技能。負責自動化發布、SEO 標籤化與推送通知。
---

# Publisher 運作標準 (SOP)

## 1. 技能實裝清單
- **`cms_adapter`**: 實體對接 Vercel/GitHub 進行內容同步。
- **`seo_tagger`**: 自動提取 Meta Description 與 關鍵字標籤。
- **`image_fetcher`**: 根據主題從授權庫調用配圖（或生成視覺矩陣）。
- **`publish_scheduler`**: 執行 `peacekeeper.sh` 強制發布流程。
- **`analytics_ping`**: 發布後回傳網址，並同步至 Telegram 審核通道。

## 2. 實裝功能與優勢
- **核級部署**：自動更新索引檔案，擊穿 CDN 快取。
- **透明監控**：所有發布動作均有 `sentinel.status` 追蹤，杜絕遺漏。

---
*「部署即現實。」*
