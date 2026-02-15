/**
 * 歡迎郵件 Edge Function
 * 
 * 這個檔案是 send-welcome Edge Function 的原始碼
 * 修改後需要重新部署到 Supabase
 * 
 * 部署方式：
 * 1. 修改此檔案中的內容
 * 2. 使用 Supabase CLI 或請 Claude 幫你重新部署
 */

// =====================
// 📧 可自訂設定區
// =====================

// 你的網站網址（上線後請更新）
const SITE_URL = "https://dee-ai.com";

// 發送者設定（需要在 Resend 驗證網域後更新）
const FROM_EMAIL = "Dee <onboarding@resend.dev>";

// 郵件主旨
const EMAIL_SUBJECT = "🎉 歡迎加入！你的 AI 學習之旅從這裡開始";


// =====================
// 📝 郵件內容模板
// =====================

function generateWelcomeEmail(name?: string): string {
  const greeting = name ? `嗨，${name}！` : "嗨，新朋友！";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse;">
          
          <!-- ====== 頭部區域 ====== -->
          <tr>
            <td style="padding-bottom: 30px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>
              <span style="font-family: 'Georgia', serif; font-size: 32px; font-style: italic; color: #ffffff;">Dee.</span>
              <p style="margin: 8px 0 0 0; color: #71717a; font-size: 14px;">AI 生活實驗室</p>
            </td>
          </tr>
          
          <!-- ====== 主要內容區 ====== -->
          <tr>
            <td style="background: linear-gradient(135deg, rgba(66, 133, 244, 0.15) 0%, rgba(52, 168, 83, 0.1) 100%); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 48px 40px;">
              
              <!-- 問候語 -->
              <h1 style="margin: 0 0 24px 0; color: #ffffff; font-size: 28px; font-weight: 700; line-height: 1.3;">
                ${greeting}
              </h1>
              
              <!-- 歡迎語 - 可自由修改 -->
              <p style="margin: 0 0 24px 0; color: #e5e5e5; font-size: 18px; line-height: 1.7;">
                歡迎加入我的 AI 學習圈！很高興你選擇跟我一起探索 AI 的無限可能。
              </p>
              
              <!-- ====== 價值說明區塊 ====== -->
              <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <p style="margin: 0 0 16px 0; color: #4285F4; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                  在這裡，你會學到…
                </p>
                <table style="width: 100%; border-collapse: collapse;">
                  <!-- 項目 1 - 可自由修改 -->
                  <tr>
                    <td style="padding: 8px 0; color: #a1a1aa; font-size: 15px;">
                      <span style="color: #34A853; margin-right: 8px;">✓</span> 如何用 AI 解決日常大小事，省下寶貴時間
                    </td>
                  </tr>
                  <!-- 項目 2 - 可自由修改 -->
                  <tr>
                    <td style="padding: 8px 0; color: #a1a1aa; font-size: 15px;">
                      <span style="color: #34A853; margin-right: 8px;">✓</span> 小孩到長輩都能懂的簡單教學
                    </td>
                  </tr>
                  <!-- 項目 3 - 可自由修改 -->
                  <tr>
                    <td style="padding: 8px 0; color: #a1a1aa; font-size: 15px;">
                      <span style="color: #34A853; margin-right: 8px;">✓</span> 實用的 Prompt 技巧和工作流程
                    </td>
                  </tr>
                  <!-- 項目 4 - 可自由修改 -->
                  <tr>
                    <td style="padding: 8px 0; color: #a1a1aa; font-size: 15px;">
                      <span style="color: #34A853; margin-right: 8px;">✓</span> 第一手的 AI 新知和實戰心得
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- ====== 個人引言區 ====== -->
              <p style="margin: 0 0 32px 0; color: #a1a1aa; font-size: 16px; line-height: 1.7; border-left: 3px solid #4285F4; padding-left: 16px;">
                「我相信 AI 不是來取代人類的，而是讓我們把時間花在更重要的事情上。」<br><br>
                — Dee
              </p>
              
              <!-- ====== CTA 按鈕 ====== -->
              <div style="text-align: center;">
                <a href="${SITE_URL}/insights" 
                   style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #4285F4 0%, #34A853 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 20px rgba(66, 133, 244, 0.3);">
                  開始探索 AI 世界 →
                </a>
              </div>
              
            </td>
          </tr>
          
          <!-- ====== 底部資訊區 ====== -->
          <tr>
            <td style="padding-top: 32px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; text-align: center; width: 50%;">
                    <div style="font-size: 24px; margin-bottom: 8px;">📬</div>
                    <p style="margin: 0; color: #a1a1aa; font-size: 13px;">新文章發布時<br>立即通知你</p>
                  </td>
                  <td style="width: 16px;"></td>
                  <td style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; text-align: center; width: 50%;">
                    <div style="font-size: 24px; margin-bottom: 8px;">💡</div>
                    <p style="margin: 0; color: #a1a1aa; font-size: 13px;">實用技巧<br>簡單易懂</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- ====== 頁尾 ====== -->
          <tr>
            <td style="padding-top: 40px; text-align: center;">
              <p style="margin: 0 0 16px 0; color: #71717a; font-size: 13px;">
                有任何問題嗎？直接回覆這封信，我會親自回答你！
              </p>
              <p style="margin: 0; color: #52525b; font-size: 12px;">
                © 2024 Dee. AI 生活實驗室
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}


// =====================
// 🔧 Edge Function 程式碼（通常不需修改）
// =====================

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

interface WelcomePayload {
  email: string;
  name?: string;
}

Deno.serve(async (req: Request) => {
  // CORS headers
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      }
    });
  }

  try {
    const payload: WelcomePayload = await req.json();

    if (!payload.email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    const emailHtml = generateWelcomeEmail(payload.name);

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [payload.email],
        subject: EMAIL_SUBJECT,
        html: emailHtml
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to send welcome email: ${errorText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });

  } catch (error) {
    console.error("Detailed Error Log:", error);
    return new Response(JSON.stringify({
      error: error.message,
      details: String(error)
    }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
});
