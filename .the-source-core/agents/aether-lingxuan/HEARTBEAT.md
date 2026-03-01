# HEARTBEAT.md - 蒼穹的脈動

## 每日自動化進化任務 (每 1 小時)
1. **同步艾可情報**：
   - 掃描 `/src/data/news/`。
   - 若新聞標記為 `is_tutorial_worthy`，啟動「教學轉譯」流程。
2. **全球小白教學巡檢**：
   - 使用 `web_fetch` 獲取預設的 10 個頂級 AI 教學源（如 HuggingFace Daily, Twitter #AILearning）。
   - 篩選適合「AI 小白」的工具應用。
3. **系統自我維護**：
   - 更新 `/src/data/tutorials/index.ts`。
   - 執行 `npm run build` 確保前端 100% 穩定。
4. **報備主人**：
   - 回報本次進化的「新課程標題」與「預覽連結」。
