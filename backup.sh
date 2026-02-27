#!/bin/bash
# 「本源」自動備份腳本
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/root/.openclaw/workspace/backups"
mkdir -p $BACKUP_DIR

echo "[$TIMESTAMP] 啟動自動備份..." >> backup.log

# 備份關鍵配置文件與記憶
tar -czf "$BACKUP_DIR/backup_$TIMESTAMP.tar.gz" \
    MEMORY.md \
    memory/ \
    SOUL.md \
    IDENTITY.md \
    USER.md \
    AGENTS.md \
    HEARTBEAT.md \
    TOOLS.md

echo "[$TIMESTAMP] 備份完成: backup_$TIMESTAMP.tar.gz" >> backup.log
