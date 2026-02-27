# Dee's AI Life Lab - 文章標準化規格 (v2.0)

為了確保每一篇文章都能完美觸發「沉浸式遊戲化體驗」，所有新撰寫或改寫的文章必須嚴格遵循以下 TypeScript 結構與內容標準。

## 1. 資料結構 (Schema)

```typescript
export const insight = {
    id: number,                 // 唯一 ID
    category: string,           // 分類 (如：入門心法, 生活應用)
    themeColor: string,         // 主題色 (emerald, amber, rose, blue, violet, teal, zinc)
    difficulty_level: number,   // 難度星等 (1-5)
    level: number,              // 地圖等級 (1: 新手村, 2: 實戰平原, 3: 巔峰聖殿)
    tags: string[],             // 標籤 (需含 # 符號)
    title: string,              // 吸引人的大標題 (真人語氣)
    summary: string,            // 列表頁顯示的短摘要
    date: string,               // 2026 年時間線日期 (格式: 2026.MM.DD)
    readTime: string,           // 預估閱讀時間 (如: 5 分鐘)
    
    // --- 沉浸式內容區塊 ---
    pain_point: string,         // 生活痛點 (用「你是不是也...」開頭)
    scenario: string,           // 應用場景描述
    solution: string,           // AI 解決方案摘要
    
    example: {
        wrong: string,          // ❌ 以前/錯誤的做法
        right: string           // ✅ 現在/正確的做法 (實踐後的成果)
    },

    // --- 教學步驟 (核心解鎖邏輯) ---
    // 必須至少 3 個步驟，每個步驟都會產生一個「我了解了」按鈕
    steps: [
        {
            title: string,      // 步驟標題
            body: string,       // 步驟內文 (不超過 3 行)
            dee_tip: string     // Dee 的私房小提示 (發光提示區)
        }
    ],

    // --- 互動測驗 (Boss Battle) ---
    quiz: {
        question: string,       // 挑戰問題
        options: string[],      // 四個選項
        answer: number,         // 正確選項索引 (0-3)
        explanation: string     // 答對/答錯後的詳細解釋
    },

    // --- 獎勵與寶物 ---
    skill_badge: string,        // 獲得的勳章名稱 (含 Emoji，如: 🧠 記憶大師)
    practice_kit: {
        title: string,          // 寶物標題 (如: 萬用指令包)
        description: string,    // 寶物描述 (這份指令能解決什麼)
        command: string         // 核心指令內容 (可複製)
    },

    // 備註：content 欄位現在應留空 ""，所有內容由結構化欄位提供
    content: "" 
};
```

## 2. 內容寫作標準 (Copywriting Rules)

1.  **語氣**：100% 真人感。使用「我之前也覺得...」、「直到我試了...」、「相信我...」等口吻。
2.  **去技術化**：不要講 API、Token、模型架構。要講「大腦」、「記憶」、「分身」、「老師」。
3.  **手機優先**：內文段落每段不超過 3 行，方便快速掃讀。
4.  **指令品質**：`practice_kit.command` 內的指令必須是「填空式」或「即插即用」，且在 ChatGPT/Claude 上實測效果驚人。
5.  **痛點共感**： pain_point 必須描述一個具體、讓人心煩的生活場景（如：下班累得要死還要幫小孩想故事）。

## 3. 互動流程 (Interaction Flow)

1.  讀者閱讀完痛點與對比。
2.  進入「一步一步來」區域。
3.  點擊第一個步驟的 **「我了解了 ✓」**，第二個步驟才會變亮。
4.  按完所有步驟後，觸發 **螢幕震動與重力掉落特效**，解鎖寶物箱。
5.  完成測驗並領取勳章。
