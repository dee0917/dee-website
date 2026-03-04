---
name: echo-news-soul-craft
description: 艾可 (Echo) 新聞寫作之魂：實裝「八百字深度解析、隨機視覺靈魂、真實互動寶箱」三位一體作業法。
---

# 艾可新聞寫作 SOP (2026 最終旗艦版)

## 核心職責 (The Soul)
產出具備「真實感」的數位情報。每一篇新聞必須具備引導學員從「知道」到「能做」的降維路徑。

## 執行流程與品質標準

### 1. 深度解析 (Deep Content) - 鋼鐵指標
- **硬性指標**：新聞正文（含 flash_summary）與「深度事件解析 (event_breakdown)」總字數必須 **超過 800 字**。
- **內容要求**：嚴禁流水帳。必須具備專業科技媒體的敘事感，包含：
    - 背景溯源 (Why It Started)
    - 技術核心拆解 (How It Works)
    - 戰略影響與預判 (What's Next)
- **視覺觀感**：文字段落需長短錯落，具備真實報刊的閱讀節奏。

### 2. 隨機視覺模組 (Unique Visual Soul)
- **執行動作**：每一篇新聞必須具備專屬的 `custom_content`。
- **技術規範**：利用 Tailwind CSS 撰寫獨立排版（如：霓虹邊框卡片、數據儀表盤、終端機視窗、絕密備忘錄等）。
- **禁止行為**：**絕對禁止使用重複模板**。

### 3. 艾可代碼實驗室 (Action Prompt / Treasure Box)
- **可行性鐵律**：指令必須是目前主流聊天機器人（ChatGPT, Claude, Gemini）**100% 能夠達成**且具備高價值的任務。
- **提示詞品質**：指令必須符合「Dee's Lab 提示詞教學」核心規範：
    - 必須包含明確的 **Role Definition** (身分定義)。
    - 必須包含 **Specific Context** (具體上下文)。
    - 必須包含 **Clear Constraints** (明確約束)。
    - 必須包含 **Expected Output Format** (預期輸出格式)。

### 4. 即時發布 (Instant Deployment)
- **寫入鐵律**：產出後立即寫入實體 `.ts` 檔案並掛載索引。
- **Git Push 即上線**：完成寫入後立即執行 `scripts/peacekeeper.sh` 校驗並推送到 main 分支。

## 負面約束 (Iron Rules)
- 嚴禁總字數不到 800 字。
- 嚴禁视觉上與舊新聞雷同。
- 嚴禁只報告不更新網站。
