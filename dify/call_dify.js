const fs = require('fs');

console.log("1. 程式開始執行...");

async function loadNews() {
    // -----------------------------------------------------
    // 請務必確認這裡的資料是否已替換
    const url = "http://localhost/v1/workflows/run"; 
    const apiKey = "app-m6Fxk57HHDLPnVbQYRqSQYQI"; 
    const userId = "0994d5b2-c936-4d4d-b71a-4f6be76adb9d";
    // -----------------------------------------------------

    console.log("2. 準備發送請求...");

    // 檢查是否還沒替換 tmp 資料
    if(url === "tmp_url" || apiKey === "tmp_api_key") {
        console.error("【錯誤】請先將代碼中的 tmp_url 和 tmp_api_key 替換成真實資料！");
        return null;
    }

    const headers = {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
    };

    const data = {
        "inputs": {
            "age": "40",
            "tu_score": "C",
            "income": "28000",
            "purpose": "Shop Renovation",
            "loan_amount": "50000"
        },
        "response_mode": "streaming",
        "user": userId
    };

    try {
        console.log(`3. 正在連接至: ${url}`);
        
        // 檢查 fetch 是否存在 (針對舊版 Node.js)
        if (typeof fetch === 'undefined') {
            throw new Error("您的 Node.js 版本太舊，不支援 fetch。請升級至 Node.js 18 以上版本。");
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        console.log(`4. 收到回應狀態碼: ${response.status}`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API 請求失敗! Status: ${response.status}, Message: ${errorText}`);
        }

        const rawString = await response.text();
        console.log(`5. 收到原始資料長度: ${rawString.length}`);
        
        // 如果想看回傳了什麼，可以把下面這行註解打開 (資料可能很長)
        // console.log("原始回傳內容:", rawString);

        const chunks = rawString.split("\n\n")
            .map(chunk => chunk.trim())
            .filter(chunk => chunk.length > 0);

        if (chunks.length === 0) {
            console.log("【警告】回應內容是空的或格式不符。");
            return null;
        }

        console.log(`6. 成功切割出 ${chunks.length} 個區塊`);

        const lastChunk = chunks[chunks.length - 1];
        let jsonStr = lastChunk;

        // 處理 data: 前綴
        if (jsonStr.startsWith("data:")) {
            jsonStr = jsonStr.substring(5).trim();
        }

        console.log("7. 正在解析 JSON...");
        const workflowFinishedJson = JSON.parse(jsonStr);
        
        // 檢查路徑是否存在
        if (workflowFinishedJson?.data?.outputs?.text) {
            return workflowFinishedJson['data']['outputs']['text'];
        } else {
            console.error("【錯誤】JSON 結構與預期不符:", JSON.stringify(workflowFinishedJson, null, 2));
            return null;
        }

    } catch (error) {
        console.error("【發生例外錯誤】:", error.message);
        return null;
    }
}

// 主執行區塊
(async () => {
    const resultData = await loadNews();

    if (resultData) {
        console.log("8. 資料取得成功，正在轉換為 Markdown...");

        let markdownContent = "";

        // 判斷回傳資料是文字還是物件
        if (typeof resultData === 'string') {
            // 如果是純文字，直接使用 (通常 LLM 會回傳已經排版好的 Markdown)
            markdownContent = resultData;
        } else {
            // 如果是 JSON 物件，把它格式化放入代碼區塊
            markdownContent = "```json\n" + JSON.stringify(resultData, null, 4) + "\n```";
        }

        // 寫入 output.md
        try {
            fs.writeFileSync('output.md', markdownContent, 'utf8');
            console.log("========================================");
            console.log("✅ 成功！檔案已儲存為 output.md");
            console.log("========================================");
        } catch (err) {
            console.error("寫入檔案失敗:", err);
        }
    } else {
        console.log("❌ 未取得有效資料，未建立檔案。");
    }
})();