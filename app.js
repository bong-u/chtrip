// ── 상태 ────────────────────────────────
let cat = "all";
let pinyinHidden = localStorage.getItem("pinyinHidden") === "1";
const $ = (id) => document.getElementById(id);

// ── 음성 (Azure mp3 우선 → 내장음성 fallback) ──
let zhVoice = null;
function pickVoice() {
  const v = speechSynthesis.getVoices();
  zhVoice =
    v.find((x) => /zh[-_]CN/i.test(x.lang) && /xiaoxiao|female|mei|ting/i.test(x.name)) ||
    v.find((x) => /zh[-_]CN/i.test(x.lang)) ||
    v.find((x) => /^zh/i.test(x.lang)) || null;
}
if ("speechSynthesis" in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }

let audioEl = null;
const missingMp3 = new Set();

function speak(card, rowEl) {
  if (!card) return;
  if (rowEl) { rowEl.classList.add("playing"); setTimeout(() => rowEl.classList.remove("playing"), 1500); }

  if (!missingMp3.has(card.id)) {
    if (audioEl) { audioEl.pause(); audioEl = null; }
    const a = new Audio(`audio/${card.id}.mp3`);
    audioEl = a;
    a.onerror = () => { missingMp3.add(card.id); speakTTS(card); };
    a.play().catch(() => { missingMp3.add(card.id); speakTTS(card); });
    return;
  }
  speakTTS(card);
}

function speakTTS(card) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(card.hanzi);
  u.lang = "zh-CN";
  if (zhVoice) u.voice = zhVoice;
  u.rate = 0.85;
  speechSynthesis.speak(u);
}

// ── 카테고리 ────────────────────────────
function buildCats() {
  const nav = $("cats");
  nav.innerHTML = "";
  window.CATEGORIES.forEach((c) => {
    const b = document.createElement("button");
    b.className = "cat-btn" + (c.key === cat ? " active" : "");
    b.textContent = c.label;
    b.onclick = () => { cat = c.key; buildCats(); renderList(); window.scrollTo(0, 0); };
    nav.appendChild(b);
  });
}

// ── 리스트 렌더 ─────────────────────────
function renderList() {
  const list = $("list");
  list.innerHTML = "";
  const items = cat === "all" ? window.PHRASES : window.PHRASES.filter((p) => p.cat === cat);

  items.forEach((p) => {
    const row = document.createElement("div");
    row.className = "row" + (pinyinHidden ? " hide-pinyin" : "");
    row.innerHTML =
      `<div class="row-text">` +
        `<div class="ko">${p.ko}</div>` +
        `<div class="pinyin">${p.pinyin}</div>` +
      `</div>` +
      `<button class="row-play" aria-label="발음 듣기">▶︎</button>`;
    // 행 전체 탭 → 재생 + (숨김 모드면) 병음 잠깐 공개
    row.querySelector(".row-play").onclick = (e) => { e.stopPropagation(); speak(p, row); };
    row.onclick = () => { speak(p, row); if (pinyinHidden) row.classList.toggle("peek"); };
    list.appendChild(row);
  });
}

// ── 병음 가리기 토글 ────────────────────
function toggleHide() {
  pinyinHidden = !pinyinHidden;
  localStorage.setItem("pinyinHidden", pinyinHidden ? "1" : "0");
  $("hideState").textContent = pinyinHidden ? "숨김" : "보임";
  $("hideBtn").classList.toggle("on", pinyinHidden);
  renderList();
}
$("hideBtn").onclick = toggleHide;

// ── 초기화 ──────────────────────────────
$("hideState").textContent = pinyinHidden ? "숨김" : "보임";
$("hideBtn").classList.toggle("on", pinyinHidden);
buildCats();
renderList();

if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
