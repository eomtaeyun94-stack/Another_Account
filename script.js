// 1. 여기에 발급받으신 Gemini API 키를 넣으세요.
const API_KEY = "AIzaSyDl25IaXhLF9pQMOrc9MQig3E8xo3XgjvM"; 

const chatDisplay = document.getElementById('chat-display');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const greeting = document.getElementById('greeting-area');
const chips = document.getElementById('quick-chips');

async function handleSend() {
    const text = userInput.value.trim();
    if (!text) return;

    if (greeting) greeting.style.display = 'none';
    if (chips) chips.style.display = 'none';

    addMessage(text, 'user');
    userInput.value = "";

    // 대기 상태 메시지
    const loadingMessage = addMessage("생각 중...", "ai");

    try {
        // 제미나이 API 호출 (가장 안정적인 v1beta 버전)
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: text }] }]
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        const aiResponse = data.candidates[0].content.parts[0].text;
        loadingMessage.innerText = aiResponse;

    } catch (error) {
        console.error("Error:", error);
        loadingMessage.innerText = "오류가 발생했습니다: " + error.message;
    }
}

function addMessage(text, role) {
    const div = document.createElement('div');
    div.classList.add('message', role === 'user' ? 'user-message' : 'ai-message');
    div.innerText = text;
    chatDisplay.appendChild(div);
    
    // 자동 스크롤
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    return div;
}

sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});
