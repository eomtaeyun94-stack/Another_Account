// 주의: 이 방식은 클라이언트 측에 키가 노출됩니다. 테스트용으로만 확인하세요!
async function askAI(prompt) {
    const API_KEY = "// 주의: 이 방식은 클라이언트 측에 키가 노출됩니다. 테스트용으로만 확인하세요!
async function askAI(prompt) {
    const API_KEY = "발급받으신_키_여기에_입력"; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// 입력창에서 엔터를 쳤을 때 실행되는 로직 예시
document.querySelector('.search-box input').addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const userText = e.target.value;
        e.target.value = "답변 생성 중...";
        
        try {
            const aiResponse = await askAI(userText);
            alert("AI 답변: " + aiResponse); // 실제로는 화면에 예쁘게 띄우는 코드를 짜야 합니다.
        } catch (error) {
            console.error("에러 발생:", error);
        }
        e.target.value = "";
    }
});"; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// 입력창에서 엔터를 쳤을 때 실행되는 로직 예시
document.querySelector('.search-box input').addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const userText = e.target.value;
        e.target.value = "답변 생성 중...";
        
        try {
            const aiResponse = await askAI(userText);
            alert("AI 답변: " + aiResponse); // 실제로는 화면에 예쁘게 띄우는 코드를 짜야 합니다.
        } catch (error) {
            console.error("에러 발생:", error);
        }
        e.target.value = "";
    }
});
