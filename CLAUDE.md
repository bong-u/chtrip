# chtrip — 중국 여행회화 PWA

성조 발음 들으며 암기하는 오프라인 지원 PWA. 빌드 과정 없는 순수 정적 앱(HTML/CSS/JS).

## 구조
- `index.html` / `styles.css` / `app.js` — 스크롤 리스트 UI (위→아래 한 문장씩, 행 탭하면 발음 재생)
- `phrases.js` — 회화 데이터 (`window.PHRASES`, `window.CATEGORIES`). 화면엔 **한국어(ko)+병음(pinyin)** 만, `hanzi`는 숨김(음성 생성용)
- `generate_audio.py` — edge-tts로 `audio/<id>.mp3` 생성 + `audio/manifest.json` 갱신
- `sw.js` — 서비스워커. 앱 파일은 **네트워크 우선**, mp3는 설치 시 manifest 기준 **전체 사전 캐싱(precache)**
- `manifest.json` — PWA 매니페스트 / `icon.svg` — 아이콘

## 카테고리 (6개)
전체 / 기본(숫자 포함) / 쇼핑 / 음식점 / 교통 / 시간. 회화 현재 44개.

## 회화 추가·수정 워크플로 (중요)
1. `phrases.js`에 항목 추가 (id는 카테고리별 대역: 기본 1~39, 쇼핑 40~, 음식 60~, 교통 80~, 시간 100~)
2. `source .venv/bin/activate && python generate_audio.py` — 없는 것만 생성, manifest 자동 갱신
   - 내용 바뀐 기존 항목은 해당 mp3 지우고 재생성 (`rm audio/<id>.mp3`) 또는 `FORCE=1`
   - 옵션: `VOICE=zh-CN-YunxiNeural`(남성), `RATE=-15%`(더 천천히)
3. 삭제한 회화는 `audio/<id>.mp3`도 지우기
4. **`sw.js`의 `CACHE = "chtrip-vN"` 버전을 한 칸 올리기** — 안 올리면 설치된 폰이 옛 음성 물고 있음
5. 커밋·푸시 (커밋은 사용자가 직접 함, conventional commits `feat:`/`fix:` 등)

## 음성
- **edge-tts** (Python, 무료·무API키, Microsoft 뉴럴 음성) 사용. 기본 목소리 `zh-CN-XiaoxiaoNeural`
- 앱 재생: mp3 우선 → 실패 시 브라우저 내장 Web Speech(`zh-CN`) 폴백
- 숫자 카드는 쉼표(`一，二，…`)로 끊어 읽게 생성

## 환경·배포
- Python venv: `.venv` (CPython 3.11, edge-tts 7.2.8). `.gitignore`에 `.venv/` 제외
- 로컬 실행: `python3 -m http.server 8137` → `http://localhost:8137` (⚠️ SW는 https/localhost에서만 동작, LAN IP http는 안 됨)
- 배포: **GitHub Pages** (repo `bong-u/chtrip`, public, main 브랜치 root) → `https://bong-u.github.io/chtrip/`
- 오프라인 팁: 여행 전 와이파이에서 앱 한 번 열면 SW가 전체 mp3 미리 받음

## 다음 후보 (미정)
회화 추가 / 즐겨찾기·복습 모드 / 디자인 개선
