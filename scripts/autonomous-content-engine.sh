#!/bin/bash

# ═══════════════════════════════════════════
# 本源：全自動站務營運引擎 (Content Engine 3.0)
# ═══════════════════════════════════════════

echo "[$(date)] 啟動內容引擎巡檢..."

# 1. 偵測 GitHub 趨勢
echo "正在掃描 GitHub 趨勢..."
GITHUB_LOG=$(npx ts-node /root/.openclaw/workspace/scripts/monitors/github_monitor.ts)
echo "$GITHUB_LOG"

# 2. 偵測 ArXiv
# (未來可擴充 arXiv_monitor.ts)

# 3. 處理信號
if [[ "$GITHUB_LOG" == *"SIGNAL:NEW_REPO_DETECTED"* ]]; then
    REPO_NAME=$(echo "$GITHUB_LOG" | grep "SIGNAL:NEW_REPO_DETECTED" | cut -d':' -f3)
    echo "捕捉到新信號: $REPO_NAME。正在喚醒艾可進行撰稿..."
    # 這裡會觸發 OpenClaw 的 agentTurn
fi

# 4. 如果有新內容，自動更新索引並部署
echo "檢查工作目錄狀態..."
cd /root/.openclaw/workspace/projects/dee-website
if [[ -n $(git status -s) ]]; then
    echo "偵測到內容變動，啟動自動部署協議..."
    npm run build
    git add .
    git commit -m "chore(auto): autonomous content update by The Source Content Engine"
    git push origin main
    echo "部署完成。"
else
    echo "無內容更新，跳過部署。"
fi
