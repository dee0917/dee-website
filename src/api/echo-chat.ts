// 艾可 (Echo) 互動接口組件 - 模組 B 核心
// 負責在前端頁面建立與 OpenClaw Gateway 的通訊

import { useState } from 'react';

export const useEchoChat = (articleTitle: string) => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const askEcho = async (question: string) => {
        setIsLoading(true);
        // 技術原理：這裡直接調用 OpenClaw Gateway 的 /agent 接口
        // 傳入艾可的 Persona 設定與當前文章標題作為上下文
        // 達成「艾可可以回答」且「不需額外外部 API」的目標
        
        try {
            // 偽代碼：實際實裝時會透過 websocket 或 fetch 與本地 OpenClaw 通訊
            console.log(`Asking Echo about ${articleTitle}: ${question}`);
            // response = await fetch('http://localhost:18789/agent', ...)
        } finally {
            setIsLoading(false);
        }
    };

    return { messages, askEcho, isLoading };
};
