const KHOJ_JUDGE_URL = 'https://current-deal-herbal-attending.trycloudflare.com/api/chat';

export async function judgeUserResponse(taskTitle: string, userMessage: string): Promise<{ passed: boolean, feedback: string }> {
    try {
        const prompt = `
        你現在是 Dee's AI Life Lab 的「任務判官」。你的目標是審核用戶是否真的理解了 AI 的「降維打擊」與「實體操作」邏輯。
        
        任務主題：${taskTitle}
        用戶回答：${userMessage}
        
        判斷標準：
        1. 用戶是否提出了具體的操作動作（例如：搜尋、點擊、授權）？
        2. 用戶是否避免了使用複雜的技術術語？
        3. 回答是否符合常人邏輯？
        
        請嚴格審核。如果用戶只是隨便打字（如「你好」、「。．」或無意義內容），請判定為 FAIL。
        
        請僅回傳以下 JSON 格式（不要有其他文字）：
        {
          "passed": true | false,
          "feedback": "給用戶的簡短評語（繁體中文）"
        }
        `;

        const response = await fetch(KHOJ_JUDGE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ q: prompt })
        });

        if (!response.ok) throw new Error('Judge unavailable');
        
        const data = await response.json();
        // Khoj returns response in a 'response' field usually, or direct JSON if custom agent
        // For simplicity in this mockup, we parse the text output as JSON
        const judgeResult = JSON.parse(data.response.match(/\{.*\}/s)[0]);
        return judgeResult;
    } catch (e) {
        console.error('Judge Error:', e);
        // Fallback: If Khoj fails, we use a simple local logic to avoid blocking the user
        if (userMessage.length > 5) return { passed: true, feedback: "（系統備援模式）判定通過！" };
        return { passed: false, feedback: "請輸入更具體的內容以完成修煉。" };
    }
}
