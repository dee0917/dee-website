import { InsightArticle } from '../../types/insight';

export const insight: InsightArticle = {
    id: 101,
    category: "數位遺產",
    themeColor: "indigo",
    difficulty_level: 2,
    level: 1,
    tags: ["#自動記憶", "#ClaudeCode", "#數位筆記", "#長輩友善", "#資訊斷層"],
    title: "AI 也有記性了！如何讓它像老朋友一樣記住你的習慣？",
    summary: "Claude Code 推出的『自動記憶』功能，讓 AI 終於能像資深學徒一樣，跨天、跨設備記住你交代過的每一件事。本篇教你如何讓 AI 成為最懂你的數位管家。",
    date: "2026.03.02",
    readTime: "5 分鐘",
    pain_point: "每次跟 AI 講話都要重頭解釋你是誰、喜歡什麼顏色、哪裡有舊傷？AI 就像金魚一樣，轉頭就忘記你上一秒交代的事？",
    example: {
        wrong: "「哎呀，這個電腦真的不行，我昨天才跟它講過要幫我查醫生，今天它又問我要查什麼。」",
        right: "讓 AI 自動維護一個『我的記憶檔案』。下次開口它會說：『王奶奶，我們昨天說好要查週三的門診對吧？』"
    },
    persona_overrides: {
        non_tech_senior: {
            pain_point: "老是記不住手機怎麼操作，問小孩又怕被嫌煩？",
            example: {
                wrong: "「我又忘了怎麼傳照片了，還是算了。」",
                right: "對 AI 說：『請記住我最常忘記傳照片的步驟』→ 下次問它，它會用你最習慣的方式溫柔提醒妳。"
            }
        },
        data_sovereign: {
            pain_point: "想要 AI 有記憶，但又怕這些私密記憶被大公司拿去亂用？",
            example: {
                wrong: "「記憶功能雖然方便，但我的隱私不就全沒了？」",
                right: "利用 Claude Code 的本地 MEMORY.md 模式，記憶鎖在自己電腦裡，雲端大廠想看也看不到。"
            }
        }
    },
    steps: [
        {
            title: "核心概念：什麼是 AI 的『長效記憶』？",
            body: "過去的 AI 像是一次性免洗餐具，用完就丟。現在透過 Claude Code 的技術，AI 會在你的設備裡寫一本『專屬日記』(MEMORY.md)。下次互動時，它會先翻開日記，看看你們之前聊到哪裡。",
            dee_tip: "這就是所謂的『連續性』。對於不愛打字的長輩，這簡直是救星。"
        },
        {
            title: "實戰教學：三步驟開啟你的記憶管家",
            body: "1. 選擇具備記憶功能的工具（如 Claude Code）。\\n2. 授權 AI 在本地建立記憶文件。\\n3. 正常對話，AI 會自動提煉重點存檔。",
            dee_tip: "如果你不方便操作電腦，也可以請身邊的年輕人幫你設定好『自動存檔』。"
        }
    ],
    quiz: {
        question: "有了『自動記憶』功能後，AI 會發生什麼變化？",
        options: [
            "它會開始偷我的錢",
            "它能記住我之前的習慣，減少重複解釋",
            "它會自動幫我把手機關機",
            "它會變得很吵，一直跟我聊天"
        ],
        answer: 1,
        explanation: "AI 的記憶是用來提升服務品質的，它能記住你的喜好、過往的操作步驟，讓你不用每次都重學。"
    },
    skill_badge: "🧠 記憶連續性",
    practice_kit: {
        title: "跟你的 AI 學徒說句話",
        description: "試著對你的 AI 說這段話，看看它能不能幫你記住：",
        command: `請扮演我的「數位記憶助理」。
我最容易忘記的藥物服用時間是 [填入你的時間，例如：早餐後]。
請幫我記住這件事，並且當我問你「我該注意什麼」的時候，主動提醒我。`
    }
};
