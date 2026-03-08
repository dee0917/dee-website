#!/bin/bash
# 🚨 PEACEKEEPER V8 - ULTIMATE ENFORCER (方案一+二+三 整合版)
# 核心邏輯：字數審計 + 清單對齊 + 哨兵日誌

PROJECT_ROOT="/root/.openclaw/workspace/projects/dee-website"
NEWS_DIR="$PROJECT_ROOT/src/data/news"
MANIFEST="$NEWS_DIR/manifest.json"
MIN_CHARS=800

echo "--- [PEACEKEEPER V8] 啟動鋼鐵門禁與品質審計 ---"

# 1. 篇數與清單對齊 (方案二)
echo "[1/4] 執行清單對齊檢查..."
PENDING_COUNT=$(grep -c "\"status\": \"pending\"" $MANIFEST 2>/dev/null || echo 0)
if [ "$PENDING_COUNT" -gt 0 ]; then
    echo "❌ 發現尚未實體化的內容清單 ($PENDING_COUNT 篇)！請先完成檔案寫入。"
    exit 1
fi

# 2. 字數審計 (方案一)
echo "[2/4] 掃描新增檔案品質 (目標: $MIN_CHARS 字)..."
NEW_FILES=$(git status --short $NEWS_DIR | grep "^??" | cut -d ' ' -f2)
for FILE in $NEW_FILES; do
    CHAR_COUNT=$(wc -m < "$FILE")
    if [ "$CHAR_COUNT" -lt "$MIN_CHARS" ]; then
        echo "❌ 品質攔截：檔案 $FILE 僅有 $CHAR_COUNT 字，未達 800 字標準！"
        exit 1
    else
        echo "✅ 品質通過：$FILE ($CHAR_COUNT 字)"
    fi
done

# 3. 本地編譯測試
echo "[3/4] 執行生產環境編譯測試..."
cd $PROJECT_ROOT
if ! npm run build; then
    echo "❌ 攔截：編譯失敗，請檢查語法錯誤。"
    exit 1
fi

# 4. 部署與哨兵標記 (方案三)
echo "[4/4] 執行強制部署並更新哨兵日誌..."
git add .
git commit -m "chore: peacekeeper v8 validated deploy $(date +%H:%M)"
git push origin main --force
npx vercel --prod --yes --force

# 更新哨兵標記文件
echo "LAST_SUCCESSFUL_DEPLOY=$(date +%Y-%m-%d_%H:%M)" > "$PROJECT_ROOT/scripts/sentinel.status"
echo "✅ 部署大圓滿：https://dee-website.vercel.app/"
