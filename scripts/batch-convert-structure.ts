/**
 * 批量結構化轉換腳本
 *
 * 用法：
 * npx tsx scripts/batch-convert-structure.ts
 *
 * 功能：
 * 1. 自動檢測未結構化的文章
 * 2. 智能生成 AEO 結構化內容
 * 3. 批量更新數據庫
 */

import { createClient } from '@supabase/supabase-js';

// 從環境變數或直接設定
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://fnymjffskndfgcpcydsh.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZueW1qZmZza25kZmdjcGN5ZHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4MzgzNjEsImV4cCI6MjA4NDQxNDM2MX0.O36D4E23UyfJd8HeT7NuIRyEgiPHudywqz5b6VU9L18';

const supabase = createClient(supabaseUrl, supabaseKey);

interface Insight {
    id: number;
    category: string;
    title: string;
    content: string | null;
    pain_point: string | null;
    scenario: string | null;
    solution: string | null;
    example: { wrong: string; right: string } | null;
    faq: { question: string; answer: string }[] | null;
}

/**
 * 檢查文章是否為結構化格式
 */
function isStructuredContent(insight: Insight): boolean {
    return !!(
        insight.pain_point ||
        insight.scenario ||
        insight.solution ||
        (insight.example && (insight.example.wrong || insight.example.right)) ||
        (insight.faq && insight.faq.length > 0)
    );
}

/**
 * 從非結構化內容中提取結構化信息
 */
function extractStructuredFromContent(content: string, title: string, category: string) {
    const result: any = {};

    // 1. 提取標題和段落
    const textContent = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

    // 2. 識別關鍵標誌詞並提取對應內容
    const patterns = {
        pain_point: [
            /痛點[:：](.*?)(?=\n|$)/g,
            /問題[:：](.*?)(?=\n|$)/g,
            /困擾[:：](.*?)(?=\n|$)/g,
            /覺得(.{10,100})[？？?]/g,
        ],
        scenario: [
            /場景[:：](.*?)(?=\n|$)/g,
            /想像(.{10,200})/g,
            /例如(.{10,200})/g,
        ],
        solution: [
            /解決方案[:：](.*?)(?=\n|$)/g,
            /建議(.{10,200})/g,
            /如何(.{10,200})/g,
            /教你(.{10,200})/g,
        ],
    };

    // 提取各個欄位
    Object.entries(patterns).forEach(([field, patternList]) => {
        for (const pattern of patternList) {
            const matches = content.match(pattern);
            if (matches && matches.length > 0) {
                result[field] = matches[0].replace(/^[：:：]+/, '').trim();
                break;
            }
        }
    });

    // 3. 提取對比範例（錯誤 vs 正確）
    const examplePattern = /(?:錯誤|糟糕|❌|×)(?:示範|範例|作法)?[:：]?\s*([^\n✅✔]+)/i;
    const correctPattern = /(?:正確|優秀|✅|✔)(?:示範|範例|作法)?[:：]?\s*([^\n❌×]+)/i;

    const wrongMatch = content.match(examplePattern);
    const rightMatch = content.match(correctPattern);

    if (wrongMatch || rightMatch) {
        result.example = {
            wrong: wrongMatch ? wrongMatch[1].trim() : '',
            right: rightMatch ? rightMatch[1].trim() : '',
        };
    }

    // 4. 提取 FAQ（問答格式）
    const faqPattern = /(?:問|Q|Q[:：])\s*([^\n?？]+[？?])\s*(?:答|A|A[:：])\s*([^\n]+)/gi;
    const faqMatches = [...content.matchAll(faqPattern)];

    if (faqMatches.length > 0) {
        result.faq = faqMatches.map(match => ({
            question: match[1].replace(/[？?]+$/, '').trim(),
            answer: match[2].trim(),
        }));
    }

    // 5. 如果沒有提取到內容，根據分類生成預設結構
    if (Object.keys(result).length === 0) {
        result.pain_point = generateDefaultPainPoint(category);
        result.scenario = generateDefaultScenario(category, title);
        result.solution = generateDefaultSolution(category, title);
        result.example = generateDefaultExample(category, title);
    }

    return result;
}

/**
 * 根據分類生成預設痛點描述
 */
function generateDefaultPainPoint(category: string): string {
    const defaults: Record<string, string> = {
        '入門心法': '剛開始接觸 AI，不知道該從哪裡開始？試了各種方法但總是效果不佳，感覺自己跟不上時代？',
        '生活應用': '每天都被瑣事纏身，效率低下但不知道如何改善？想要讓生活變得更輕鬆、更智能？',
        '工作效率': '工作上總是時間不夠用？重複性的瑣事浪費了太多時間，無法專注於真正重要的事情？',
        '長輩友善': '覺得新科技太難學、太複雜？想跟上數位時代卻總是碰壁，不知道該如何開始？',
        '進階技巧': '已經會基本的 AI 使用，但想要提升到更專業的層次？不知道如何突破瓶頸？',
    };
    return defaults[category] || '面對這個議題，你是否感到困惑或無助？';
}

/**
 * 根據分類和標題生成預設場景
 */
function generateDefaultScenario(category: string, title: string): string {
    return `想像一下，當你面對「${title}」這個情況時，你希望能夠輕鬆解決問題，而不是焦頭爛額。`;
}

/**
 * 根據分類和標題生成預設解決方案
 */
function generateDefaultSolution(category: string, title: string): string {
    return `透過 AI 的協助，你可以將「${title}」變得簡單許多。讓我來教你如何做到！`;
}

/**
 * 根據分類和標題生成預設範例
 */
function generateDefaultExample(category: string, title: string) {
    return {
        wrong: `❌ 糟糕做法：直接處理「${title}」，沒有任何準備和規劃，結果總是無法達到預期效果。`,
        right: `✅ 正確做法：先了解問題本質，制定明確計畫，再利用 AI 工具輔助，逐步達成目標。`,
    };
}

/**
 * 主函數
 */
async function main() {
    console.log('🚀 開始批量結構化轉換...\n');

    try {
        // 1. 獲取所有文章
        console.log('📥 載入文章...');
        const { data: insights, error: fetchError } = await supabase
            .from('insights')
            .select('*');

        if (fetchError) {
            throw new Error(`載入失敗：${fetchError.message}`);
        }

        if (!insights || insights.length === 0) {
            console.log('✅ 數據庫中沒有文章');
            return;
        }

        console.log(`✓ 找到 ${insights.length} 篇文章\n`);

        // 2. 檢測未結構化的文章
        const unstructured = insights.filter(article => !isStructuredContent(article));

        if (unstructured.length === 0) {
            console.log('✅ 所有文章都已結構化！');
            return;
        }

        console.log(`📊 需要轉換：${unstructured.length} 篇文章`);
        console.log(`📊 已結構化：${insights.length - unstructured.length} 篇文章\n`);

        // 3. 列出待轉換的文章
        console.log('待轉換的文章列表：');
        unstructured.forEach((article, index) => {
            console.log(`  ${index + 1}. [ID:${article.id}] ${article.title}`);
        });
        console.log('');

        // 4. 詢問是否繼續
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const answer = await new Promise<string>(resolve => {
            rl.question('是否要繼續轉換？(yes/no): ', resolve);
        });
        rl.close();

        if (answer.toLowerCase() !== 'yes' && answer.toLowerCase() !== 'y') {
            console.log('❌ 已取消轉換');
            return;
        }

        console.log('\n🔄 開始轉換...\n');

        // 5. 逐個轉換
        let successCount = 0;
        let failCount = 0;

        for (const article of unstructured) {
            try {
                console.log(`處理 [${article.id}] ${article.title}...`);

                const structured = extractStructuredFromContent(
                    article.content || '',
                    article.title,
                    article.category
                );

                const { error: updateError } = await supabase
                    .from('insights')
                    .update({
                        pain_point: structured.pain_point || null,
                        scenario: structured.scenario || null,
                        solution: structured.solution || null,
                        example: structured.example || null,
                        faq: structured.faq || null,
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', article.id);

                if (updateError) {
                    throw new Error(updateError.message);
                }

                console.log(`  ✓ 成功\n`);
                successCount++;
            } catch (error) {
                console.log(`  ✗ 失敗：${error}\n`);
                failCount++;
            }
        }

        // 6. 顯示結果
        console.log('====================================');
        console.log('📊 轉換完成！');
        console.log(`✓ 成功：${successCount} 篇`);
        if (failCount > 0) {
            console.log(`✗ 失敗：${failCount} 篇`);
        }
        console.log('====================================');

    } catch (error) {
        console.error('❌ 錯誤：', error);
        process.exit(1);
    }
}

// 執行主函數
main();
