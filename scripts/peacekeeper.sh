#!/bin/bash
cd /root/.openclaw/workspace/projects/dee-website
echo "--- [PEACEKEEPER V5] 啟動權威校驗 ---"

# A. 語法與去重
echo "[1/3] 掃描語法衝突..."
ERROR_FILES=$(grep -rE "trend_cluster:|trinity_dimension:" src/data/news/ | cut -d: -f1 | sort | uniq -c | awk '$1 > 2 {print $2}')
if [ -n "$ERROR_FILES" ]; then
    echo "❌ 攔截：偵測到屬性重複定義！"
    echo "$ERROR_FILES"
    exit 1
fi

# B. 強制本地編譯
echo "[2/3] 執行生產環境編譯..."
if ! npm run build; then
    echo "❌ 攔截：編譯報錯，嚴禁推送！"
    exit 1
fi

# C. 安全同步至 main
echo "[3/3] 校驗通過，同步至 main..."
git add .
git commit -m "chore: peacekeeper v5 validated sync $(date +%H:%M)"
git push origin main --force
echo "--- [PEACEKEEPER] 正式環境已更新 ---"
