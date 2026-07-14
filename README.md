# chtrip

중국 여행에서 바로 쓰는 회화를 성조 발음을 들으며 암기하는 오프라인 지원 PWA.

**[bong-u.github.io/chtrip](https://bong-u.github.io/chtrip/)**

## 특징

- 한 문장씩 스크롤 리스트 — 화면엔 한국어 + 병음(pinyin), 행을 탭하면 발음 재생
- 원어민 수준 중국어 음성 (Microsoft 뉴럴 TTS로 미리 생성한 mp3)
- 오프라인 지원 — 여행 전 한 번 열어두면 전체 음성을 미리 받아 비행기·현지에서도 재생
- 홈 화면에 설치 가능한 PWA
- 카테고리별 분류 — 전체 / 기본 / 쇼핑 / 음식점 / 교통 / 시간

## 사용법

여행 전 와이파이 환경에서 앱을 한 번 열어둘 것. 서비스워커가 전체 음성을
미리 캐싱하므로, 이후에는 데이터·와이파이 없이도 발음 재생 가능.

## 구조

| 파일 | 설명 |
|------|------|
| `index.html` / `styles.css` / `app.js` | 스크롤 리스트 UI |
| `phrases.js` | 회화 데이터 (`window.PHRASES`, `window.CATEGORIES`) |
| `generate_audio.py` | edge-tts로 `audio/<id>.mp3` 생성 + `manifest.json` 갱신 |
| `sw.js` | 서비스워커 — 앱 파일은 네트워크 우선, 음성은 설치 시 전체 사전 캐싱 |
| `manifest.json` / `icon.svg` | PWA 매니페스트 / 아이콘 |

## 로컬 실행

```bash
python3 -m http.server 8137
# → http://localhost:8137
```

> 서비스워커는 `https` 또는 `localhost`에서만 동작. LAN IP(http)로는 오프라인 캐싱 불가.

## 음성 생성

[edge-tts](https://github.com/rany2/edge-tts)(무료·무API키, Microsoft 뉴럴 음성) 사용.
기본 목소리는 `zh-CN-XiaoxiaoNeural`.

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install edge-tts

python generate_audio.py          # 없는 것만 생성, manifest 자동 갱신
FORCE=1 python generate_audio.py  # 전체 재생성
```

옵션: `VOICE=zh-CN-YunxiNeural`(남성), `RATE=-15%`(더 천천히)

## 회화 추가 워크플로

1. `phrases.js`에 항목 추가 (id 대역: 기본 `1~39`, 쇼핑 `40~`, 음식 `60~`, 교통 `80~`, 시간 `100~`)
2. `python generate_audio.py` 실행 — 음성 생성 및 manifest 갱신
3. `sw.js`의 `CACHE = "chtrip-vN"` 버전을 한 칸 올리기 (안 올리면 설치된 기기가 옛 음성을 계속 사용)
4. 커밋 · 푸시

## 배포

GitHub Pages (main 브랜치 root) → <https://bong-u.github.io/chtrip/>

## 라이선스

[MIT](LICENSE) © 2026 bong-u
