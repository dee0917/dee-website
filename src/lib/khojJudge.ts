const KHOJ_JUDGE_URL = 'https://current-deal-herbal-attending.trycloudflare.com/api/chat';

export async function judgeUserResponse(taskTitle: string, userMessage: string): Promise<{ passed: boolean, feedback: string, hint?: string }> {
    try {
        const prompt = `
        你現在是 Dee's AI Life Lab 的「任務判官」。
        任務主題：${taskTitle}
        用戶回答：${userMessage}
        
        請根據以下邏輯審核用戶：
        1. 核心標準：回答中是否包含「實體動詞」？（例如：搜尋、下載、點擊、加入、輸入指令）。
        2. 降維邏輯：用戶是否理解他要去操作某個工具，而不是空談 AI 的好處？
        
        審核結果：
        - 如果回答過於簡短或無意義（如「你好」、「好」、「了解」），判定 passed: false。
        - 如果包含明確操作路徑，判定 passed: true。
        
        反饋要求：
        - 如果判定為 FAIL，feedback 必須包含「一兩句鼓勵」加上「一個含蓄的提示」，hint 則給出「直接的操作動作建議」。
        
        請嚴格僅回傳 JSON 格式：
        {
          "passed": true | false,
          "feedback": "給用戶的對話回覆",
          "hint": "若失敗，給出具體的正確操作路徑建議"
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
        console.error('Judge Error:', e);
        // Fallback for better UX
        if (userMessage.length > 3) return { passed: true, feedback: "我看見了您的行動意圖！這正是修行所需要的。" };
        return { passed: false, feedback: "修行尚未到家，請試著描述您會『搜尋』或『點擊』什麼？", hint: "您可以試著輸入：我會搜尋 ChatGPT 並加入好友。" };
    }
}
