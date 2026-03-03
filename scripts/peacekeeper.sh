#!/bin/bash
# 🚨 PEACEKEEPER - Dee's AI Life Lab Pre-push Validator
# V2: Strict validation only, no auto-fixes that break structure.

cd /root/.openclaw/workspace/projects/dee-website
echo "--- [PEACEKEEPER] 啟動嚴格校驗流程 ---"

# 1. 重複屬性檢查 (TS1117)
echo "[1/3] 正在掃描重複屬性定義 (TS1117)..."
DUPLICATES=$(grep -rE "trend_cluster:|trinity_dimension:|category:|themeColor:" src/data/news/ | cut -d: -f1 | sort | uniq -c | awk '$1 > 4 {print $2}')
if [ -n "$DUPLICATES" ]; then
    echo "❌ 錯誤：偵測到以下檔案具備重複屬性定義："
    echo "$DUPLICATES"
    echo "請手動修復後再提交。"
    exit 1
fi

# 2. TypeScript 編譯檢查
echo "[2/3] 執行生產環境編譯模擬 (tsc)..."
if ! npm run build; then
    echo "❌ 錯誤：TypeScript 編譯失敗！請修復語法或類型錯誤。"
    exit 1
fi

# 3. 推送
echo "[3/3] 校驗通過，執行自動化同步..."
git add .
git commit -m "chore: peacekeeper validated sync $(date +%H:%M)"
git push origin master --force

echo "--- [PEACEKEEPER] 部署成功：https://dee-website.vercel.app/ ---"
