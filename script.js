const API_KEY = "AIzaSyDl25IaXhLF9pQMOrc9MQig3E8xo3XgjvM";

const chatDisplay = document.getElementById('chat-display');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const greeting = document.getElementById('greeting-area');
const chips = document.getElementById('quick-chips');

async function handleSend() {
    const text = userInput.value.trim();
    if (!text) return;

    // 첫 질문 시 인사말과 칩 숨기기
    if (greeting) greeting.style.display = 'none';
    if (chips) chips.style.display = 'none';

    // 내 메시지 표시
    addMessage(text, 'user');
    userInput.value = "";

    // AI 로딩 상태 표시
    const loadingMessage = addMessage("생각 중...", "ai");
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: text }] }] })
        });
        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;
        
        loadingMessage.innerText = aiText; // 로딩 문구를 실제 답변으로 교체
    } catch (e) {
        loadingMessage.innerText = "오류가 발생했습니다. 키를 확인해 주세요.";
    }
}

function addMessage(text, role) {
    const div = document.createElement('div');
    div.classList.add('message', role === 'user' ? 'user-message' : 'ai-message');
    div.innerText = text;
    chatDisplay.appendChild(div);
    window.scrollTo(0, document.body.scrollHeight);
    return div;
}

sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });
