---
name: butler-steward-ops
description: 執事 (Butler) 專屬系統維護技能。負責身分同步、品質審計與 Git 環境清潔。
---

# 執事管家作業標準 (SOP)

## 核心職責
1. **身分主權同步**：確保 `IdentityContext` 與 `personas.ts` 的一致性。
2. **Steel Audit**：審計內容深度（>500字）與 CTA 的精準度。
3. **環境保潔**：清理 Git 衝突，維持純淨 master 分支。

## 執行流程
### 第一步：身分校準
- 每次更動前核對 `src/data/personas.ts`。
- 確保顏色、Icon、標籤完全符合 Core 6 平民化定義。

### 第二步：產出審計 (Steel Audit)
- 逐篇檢查艾可與蒼穹的檔案內容。
- 確認無語法錯誤、無重複定義、無過時連結。

### 第三步：記憶同步
- 彙整當日重大修正至 `MEMORY.md` 與 `memory/`。

## 負面約束
- 嚴禁允許不符合美學要求的內容上線。
- 嚴禁放任分支亂象。
