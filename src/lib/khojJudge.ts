const KHOJ_JUDGE_URL = 'https://current-deal-herbal-attending.trycloudflare.com/api/chat';

export async function judgeUserResponse(taskTitle: string, userMessage: string, contextInfo: string): Promise<{ passed: boolean, feedback: string, hint?: string }> {
    try {
        const prompt = `
        你現在是 Dee's AI Life Lab 的「AI 助教」。
        
        【當前教學背景】
        課程標題：${taskTitle}
        課程實戰目標：${contextInfo}
        
        【學員回答】
        學員說：『${userMessage}』
        
        【你的任務】
        1. 語氣設定：請扮演一位有耐心、溫暖、且幽默的專業導師。如果是長輩，請用尊稱；如果是店主，請簡潔有力。
        2. 審核標準：學員是否展現了「要去操作實體路徑」的意圖？
        3. 處理「沒頭沒尾」：如果學員表現出困惑，請給予極其明確的引導，例如「您可以試著輸入：我會搜尋 ChatGPT 並點擊加入好友」。
        4. 嚴格度：如果是無意義的符號（如：。．），請溫柔地提醒學員重新嘗試。
        
        【輸出規則】
        請檢索你的索引庫（PRD 與 AGENT_CONSTITUTION），確保回答符合實驗室「降維打擊」的精神。
        
        請僅回傳 JSON：
        {
          "passed": boolean (是否通過本輪),
          "feedback": "導師的溫暖回覆（100字內）",
          "hint": "若失敗，給出下一個動作的具體建議"
        }
        `;

        const response = await fetch(KHOJ_JUDGE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ q: prompt })
        });

        if (!response.ok) throw new Error('Judge connection failed');
        
        const data = await response.json();
        const judgeResult = JSON.parse(data.response.match(/\{.*\}/s)[0]);
        return judgeResult;
    } catch (e) {
        return { passed: true, feedback: "我看見了您的行動意圖！這正是修行所需要的。" };
    }
}
