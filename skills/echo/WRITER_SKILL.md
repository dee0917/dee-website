---
name: writer-agent-ops
description: 子代理人 B (Writer) 的核心運作技能。負責將事實包轉化為具備「美學」與「易讀性」的深度稿件。
---

# Writer 運作標準 (SOP)

## 1. 技能實裝清單
- **`llm_rewriter`**: 調用 Claude/Antigravity API 進行白話文改寫（鎖定國中生可讀懂等級）。
- **`whitepaper_tone`**: 注入「科技媒體」專業且犀利的語氣指引。
- **`headline_generator`**: 每次產出提供 3 個具備點擊誘惑力的候選標題。
- **`readability_scorer`**: 自動化校驗 Flesch-Kincaid 指數，確保低於 10 級（適合小白）。
- **`draft_assembler`**: 拼裝 Markdown 格式，並注入 Tailwind CSS 視覺模組。

## 2. 實裝功能與優勢
- **因材施教**：同一事實包可產出 8 個不同族群（長輩、店主等）的專屬切入點。
- **高資訊密度**：確保每篇解析超過 1000 字，具備深度事件分解。

---
*「讓技術降維，讓服務升維。」*
