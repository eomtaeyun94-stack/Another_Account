const games = [
"리그오브레전드",
"발로란트",
"배틀그라운드",
"메이플스토리",
"로스트아크",
"피파온라인",
"오버워치",
"서든어택",
"스타크래프트"
];

/* 초성 */
const cho=["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];

function getChosung(text){
let r="";
for(let c of text){
let code=c.charCodeAt(0)-44032;
if(code>-1 && code<11172){
r+=cho[Math.floor(code/588)];
}else r+=c;
}
return r;
}

/* ELEMENTS */
const input=document.getElementById("searchInput");
const suggest=document.getElementById("suggestBox");
const searchBox=document.getElementById("searchBox");
const result=document.getElementById("noResult");

/* SEARCH EXPAND */
input.addEventListener("focus",()=>searchBox.classList.add("active"));
input.addEventListener("blur",()=>setTimeout(()=>searchBox.classList.remove("active"),150));

/* TYPING SUGGEST */
input.addEventListener("input",(e)=>{
const v=e.target.value;

if(!v){
suggest.style.display="none";
return;
}

const f=games.filter(g=>g.includes(v)||getChosung(g).includes(v));

suggest.style.display="block";
suggest.innerHTML=f.map(g=>`<div onclick="selectGame('${g}')">${g}</div>`).join("");
});

function selectGame(g){
input.value=g;
suggest.style.display="none";
}

/* SEARCH */
function search(){
const v=input.value;

const f=games.filter(g=>g.includes(v)||getChosung(g).includes(v));

document.querySelectorAll(".item").forEach(i=>i.style.display="none");

let found=false;

document.querySelectorAll(".item").forEach(i=>{
if(i.dataset.name.includes(v)){
i.style.display="block";
found=true;
}
});

result.style.display=found?"none":"block";
}

/* RESET */
function resetAll(){
input.value="";
document.querySelectorAll(".item").forEach(i=>i.style.display="block");
result.style.display="none";
suggest.style.display="none";
}

/* MODAL */
function openModal(){
document.getElementById("modal").style.display="flex";
}
function closeModal(){
document.getElementById("modal").style.display="none";
}
