/**
 * Mock 數據同步腳本
 *
 * 將 src/data/mock.ts 中的所有文章同步到 Supabase 數據庫
 *
 * 用法：
 * npx tsx scripts/sync-mock-to-db.ts
 *
 * 功能：
 * 1. 讀取 Mock 數據中的所有文章
 * 2. 檢查數據庫中是否已存在
 * 3. 自動轉換 Mock 格式為數據庫格式
 * 4. 批量插入/更新文章
 */

import { createClient } from '@supabase/supabase-js';
import { INSIGHTS } from '../src/data/mock';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://fnymjffskndfgcpcydsh.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZueW1qZmZza25kZmdjcGN5ZHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4MzgzNjEsImV4cCI6MjA4NDQxNDM2MX0.O36D4E23UyfJd8HeT7NuIRyEgiPHudywqz5b6VU9L18';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * 轉換 Mock 文章格式為數據庫格式
 */
function convertMockToDb(mockInsight: any) {
    // 轉換日期格式
    const parseDate = (dateStr: string) => {
        if (!dateStr) return null;
        // Mock 格式: "2024.06.20"
        const parts = dateStr.split('.');
        if (parts.length === 3) {
            return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])).toISOString();
        }
        return null;
    };

    return {
        id: mockInsight.id,
        category: mockInsight.category || '未分類',
        title: mockInsight.title,
        summary: mockInsight.summary || null,
        content: mockInsight.content || null,
        read_time: mockInsight.readTime || mockInsight.read_time || '5 分鐘',
        is_published: true, // Mock 數據默認為已發布
        published_at: parseDate(mockInsight.date) || new Date().toISOString(),
        created_at: parseDate(mockInsight.date) || new Date().toISOString(),
        updated_at: new Date().toISOString(),

        // AEO 字段
        seo_title: mockInsight.seo_title || null,
        keywords: mockInsight.keywords || [],
        search_intent: mockInsight.search_intent || null,
        target_audience: mockInsight.target_audience || null,
        pain_point: mockInsight.pain_point || null,
        scenario: mockInsight.scenario || null,
        solution: mockInsight.solution || null,
        example: mockInsight.example || null,
        faq: mockInsight.faq || [],
        semantic_tags: (mockInsight as any).semantic_tags || [],
        relevance_score: (mockInsight as any).relevance_score || null,
        popularity_score: (mockInsight as any).popularity_score || null,
        last_analyzed_at: null,
    };
}

/**
 * 主函數
 */
async function main() {
    console.log('🚀 開始同步 Mock 數據到數據庫...\n');

    try {
        // 1. 獲取數據庫現有文章
        console.log('📥 載入數據庫現有文章...');
        const { data: existingInsights, error: fetchError } = await supabase
            .from('insights')
            .select('id, title')
            .order('id', { ascending: true });

        if (fetchError) {
            throw new Error(`載入失敗：${fetchError.message}`);
        }

        const existingIds = new Set((existingInsights || []).map(i => i.id));
        console.log(`✓ 數據庫現有 ${existingIds.size} 篇文章\n`);

        // 2. 分析 Mock 數據
        console.log('📊 分析 Mock 數據...');
        console.log(`✓ Mock 數據共 ${INSIGHTS.length} 篇文章\n`);

        // 分類：新增、已存在、需要更新
        const toInsert: any[] = [];
        const toUpdate: any[] = [];
        const skipped: any[] = [];

        for (const mockInsight of INSIGHTS) {
            const dbArticle = convertMockToDb(mockInsight);

            if (existingIds.has(dbArticle.id)) {
                // 檢查是否需要更新（比較標題）
                const existing = (existingInsights || []).find(i => i.id === dbArticle.id);
                if (existing && existing.title !== dbArticle.title) {
                    toUpdate.push(dbArticle);
                    console.log(`📝 需要更新 [ID:${dbArticle.id}] ${dbArticle.title}`);
                } else {
                    skipped.push(dbArticle);
                    console.log(`⏭️  跳過 [ID:${dbArticle.id}] ${dbArticle.title} (已存在且未變更)`);
                }
            } else {
                toInsert.push(dbArticle);
                console.log(`➕ 準備新增 [ID:${dbArticle.id}] ${dbArticle.title}`);
            }
        }

        console.log(`\n統計：`);
        console.log(`  新增：${toInsert.length} 篇`);
        console.log(`  更新：${toUpdate.length} 篇`);
        console.log(`  跳過：${skipped.length} 篇`);

        // 3. 詢問是否繼續
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        if (toInsert.length === 0 && toUpdate.length === 0) {
            console.log('\n✅ 所有文章已是最新狀態，無需同步');
            rl.close();
            return;
        }

        const answer = await new Promise<string>(resolve => {
            rl.question('\n是否要繼續同步？(yes/no): ', resolve);
        });
        rl.close();

        if (answer.toLowerCase() !== 'yes' && answer.toLowerCase() !== 'y') {
            console.log('❌ 已取消同步');
            return;
        }

        console.log('\n🔄 開始同步...\n');

        // 4. 執行新增
        let insertSuccess = 0;
        let insertFail = 0;

        for (const article of toInsert) {
            try {
                console.log(`插入 [${article.id}] ${article.title}...`);

                const { error: insertError } = await supabase
                    .from('insights')
                    .insert([article]);

                if (insertError) {
                    throw new Error(insertError.message);
                }

                console.log(`  ✓ 成功\n`);
                insertSuccess++;
            } catch (error) {
                console.log(`  ✗ 失敗：${error}\n`);
                insertFail++;
            }
        }

        // 5. 執行更新
        let updateSuccess = 0;
        let updateFail = 0;

        for (const article of toUpdate) {
            try {
                console.log(`更新 [${article.id}] ${article.title}...`);

                const { error: updateError } = await supabase
                    .from('insights')
                    .update(article)
                    .eq('id', article.id);

                if (updateError) {
                    throw new Error(updateError.message);
                }

                console.log(`  ✓ 成功\n`);
                updateSuccess++;
            } catch (error) {
                console.log(`  ✗ 失敗：${error}\n`);
                updateFail++;
            }
        }

        // 6. 顯示結果
        console.log('====================================');
        console.log('📊 同步完成！');
        console.log(`✓ 新增成功：${insertSuccess} 篇`);
        if (insertFail > 0) {
            console.log(`✗ 新增失敗：${insertFail} 篇`);
        }
        console.log(`✓ 更新成功：${updateSuccess} 篇`);
        if (updateFail > 0) {
            console.log(`✗ 更新失敗：${updateFail} 篇`);
        }
        console.log(`⏭️  跳過：${skipped.length} 篇`);
        console.log('====================================');

        console.log('\n💡 提示：同步後請重新載入後台頁面查看結果');

    } catch (error) {
        console.error('❌ 錯誤：', error);
        process.exit(1);
    }
}

// 執行主函數
main();
