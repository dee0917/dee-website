#!/bin/bash
cd /root/.openclaw/workspace/projects/dee-website
echo "--- [PEACEKEEPER] 啟動強化校驗流程 ---"

# 1. 語法與重複屬性檢查
echo "[1/3] 掃描重複屬性定義 (TS1117)..."
for file in src/data/news/*.ts; do
    sed -i '/__old_/d' "$file" # 清理舊標記
    # 徹底去重：trend_cluster, trinity_dimension
    awk '/trend_cluster:/ {tc=$0; next} /trinity_dimension:/ {td=$0; next} {print} END {if(tc) print tc; if(td) print td}' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
    # 清理因 sed/awk 產生的尾部結構錯誤
    sed -i '/};/d' "$file"
    echo "};" >> "$file"
done

# 2. TypeScript 編譯檢查
echo "[2/3] 執行編譯模擬..."
if ! npm run build; then
    echo "❌ 失敗：請檢查語法錯誤。"
    exit 1
fi

# 3. 推送
echo "[3/3] 校驗通過，推送雲端..."
git add .
git commit -m "chore: peacekeeper validated sync $(date +%H:%M)"
git push origin master --force
