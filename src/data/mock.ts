// 洞察文章 - 4.0 終極架構版
// 採用「分模組管理」模式：每篇文章為獨立檔案，杜絕數據覆蓋錯誤
import { INSIGHTS_LIST } from './insights';

export const INSIGHTS = INSIGHTS_LIST;

// 解決方案 (保持單一檔案)
export const SOLUTIONS = [
    {
        id: 101,
        title: "AI 入門懶人包",
        type: "免費資源",
        desc: "從零開始學 AI，用最白話的方式帶你入門，保證看得懂。",
        detail: "一份 PDF 指南，包含 10 個最實用的 AI 使用場景。",
        action: "免費下載"
    }
];

// 學員回饋 (保持單一檔案)
export const TESTIMONIALS = [
    {
        name: "林小姐",
        role: "二寶媽・34歲",
        text: "以前小孩問為什麼下雨我都要查半天，現在用 Dee 教的故事指令，AI 編出的故事連兒子都聽得一愣一愣的，真的救了我的下班時間！"
    },
    {
        name: "阿國",
        role: "傳產業務・45歲",
        text: "我這年紀最怕學新東西，但 Dee 的文章沒術語，看一遍就會叫 AI 幫我寫回訪信，速度快一倍，重點是聽起來還很得體。"
    },
    {
        name: "王奶奶",
        role: "退休教師・68歲",
        text: "本來以為 AI 是給年輕人玩的，沒想到我竟然可以用它查到長照補助細節！Dee 的方法真的很白話。"
    }
];
