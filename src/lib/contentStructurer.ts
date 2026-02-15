/**
 * 內容結構化工具
 * 用於將非結構化的文章內容轉換為 AEO 優化的結構化格式
 */

export interface StructuredContent {
    pain_point?: string;
    scenario?: string;
    solution?: string;
    example?: {
        wrong: string;
        right: string;
    };
    faq?: Array<{
        question: string;
        answer: string;
    }>;
}

/**
 * 從非結構化 HTML 內容中提取結構化信息
 */
export function extractStructuredFromContent(content: string, title: string, category: string): StructuredContent {
    const result: StructuredContent = {};

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
                const extractedText = matches[0].replace(/^[：:：]+/, '').trim();
                (result as any)[field] = extractedText;
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
 * 檢查文章是否為結構化格式
 */
export function isStructuredContent(insight: any): boolean {
    return !!(
        insight.pain_point ||
        insight.scenario ||
        insight.solution ||
        (insight.example && (insight.example.wrong || insight.example.right)) ||
        (insight.faq && insight.faq.length > 0)
    );
}

/**
 * 自動生成建議的結構化內容（基於現有內容智能推測）
 */
export function suggestStructuredContent(content: string, title: string, category: string): StructuredContent {
    const structured = extractStructuredFromContent(content, title, category);

    // 如果提取的內容太少，添加更多預設值
    if (!structured.pain_point || structured.pain_point.length < 20) {
        structured.pain_point = generateDefaultPainPoint(category);
    }

    if (!structured.scenario || structured.scenario.length < 20) {
        structured.scenario = generateDefaultScenario(category, title);
    }

    if (!structured.solution || structured.solution.length < 20) {
        structured.solution = generateDefaultSolution(category, title);
    }

    if (!structured.example || (!structured.example.wrong && !structured.example.right)) {
        structured.example = generateDefaultExample(category, title);
    }

    return structured;
}

/**
 * 批量檢測未結構化的文章
 */
export function detectUnstructuredArticles(articles: any[]): Array<{ id: number; title: string; reason: string }> {
    return articles
        .filter(article => !isStructuredContent(article))
        .map(article => ({
            id: article.id,
            title: article.title,
            reason: analyzeUnstructuredReason(article),
        }));
}

/**
 * 分析文章為何未結構化
 */
function analyzeUnstructuredReason(article: any): string {
    const missingFields: string[] = [];

    if (!article.pain_point) missingFields.push('生活痛點');
    if (!article.scenario) missingFields.push('應用場景');
    if (!article.solution) missingFields.push('AI 解決方案');
    if (!article.example || (!article.example.wrong && !article.example.right)) missingFields.push('實例範例');
    if (!article.faq || article.faq.length === 0) missingFields.push('FAQ 問答');

    if (missingFields.length === 0) {
        return '內容格式不完整';
    }

    return `缺少欄位：${missingFields.join('、')}`;
}
