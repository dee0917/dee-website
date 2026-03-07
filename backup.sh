#!/bin/bash
# Emergency Backup Script - 2026-03-07
# Performs local archive and logs status

BACKUP_DIR="/root/.openclaw/workspace/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/source_backup_${TIMESTAMP}.tar.gz"

mkdir -p "$BACKUP_DIR"

echo "[$(date)] Starting backup to $BACKUP_FILE..."

# Exclude node_modules and .git for size optimization
tar -czf "$BACKUP_FILE" \
    --exclude='node_modules' \
    --exclude='.git' \
    --exclude='backups' \
    /root/.openclaw/workspace

if [ $? -eq 0 ]; then
    echo "[$(date)] Backup successful: $BACKUP_FILE" >> backup.log
    echo "SUCCESS: $BACKUP_FILE"
else
    echo "[$(date)] Backup FAILED" >> backup.log
    exit 1
fi
