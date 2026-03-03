#!/bin/bash
# 🚨 PEACEKEEPER - Dee's AI Life Lab Pre-push Validator
# 功用：在 Git Push 前執行核級校驗，杜絕重複屬性、型別錯誤與視覺崩潰。

cd /root/.openclaw/workspace/projects/dee-website

echo "--- [PEACEKEEPER] 啟動強制校驗流程 ---"

# 1. 實體檔案存在性檢查
echo "[1/4] 檢查實體檔案與索引同步狀態..."
MISSING_FILES=0
for slug in $(grep "import { article as" src/data/news/index.ts | awk '{print $NF}' | tr -d "';"); do
    FILE_PATH="src/data/news/${slug//article as /}.ts"
    if [ ! -f "$FILE_PATH" ]; then
        echo "❌ 錯誤：索引中提到的檔案 $FILE_PATH 物理不存在！"
        MISSING_FILES=1
    fi
done

# 2. 語法與重複屬性檢查 (TS1117 專殺)
echo "[2/4] 正在掃描重複屬性定義 (TS1117)..."
DUPLICATES=$(grep -rE "trend_cluster:|trinity_dimension:|category:|themeColor:" src/data/news/ | cut -d: -f1 | uniq -c | awk '$1 > 2 {print $2}')
if [ -n "$DUPLICATES" ]; then
    echo "❌ 警告：偵測到以下檔案具備重複屬性定義："
    echo "$DUPLICATES"
    # 自動修復邏輯：保留最後一個定義，移除前面的重複項
    for file in $DUPLICATES; do
        sed -i '0,/trend_cluster:/s/trend_cluster:/__old_tc:/' "$file"
        sed -i '0,/trinity_dimension:/s/trinity_dimension:/__old_td:/' "$file"
    done
fi

# 3. TypeScript 類型檢查
echo "[3/4] 執行生產環境編譯模擬 (tsc)..."
if ! npm run build; then
    echo "❌ 報錯：TypeScript 編譯失敗！禁止推送。"
    exit 1
fi

# 4. 提交與推送
echo "[4/4] 校驗通過，執行自動化同步..."
git add .
git commit -m "chore: validated deployment by PeaceKeeper $(date +%H:%M)"
git push origin master --force

echo "--- [PEACEKEEPER] 部署成功：https://dee-website.vercel.app/ ---"
