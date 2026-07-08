#!/usr/bin/env python3
"""edge-tts로 회화 mp3를 미리 생성 → ./audio/<id>.mp3

사용법:
    source .venv/bin/activate
    python generate_audio.py            # 없는 것만 생성
    FORCE=1 python generate_audio.py    # 전부 다시 생성
    VOICE=zh-CN-YunxiNeural python generate_audio.py   # 남성 목소리

phrases.js에서 id와 hanzi를 정규식으로 추출한다(한자 값엔 따옴표가 없음).
무료·무제한(edge-tts는 Edge 브라우저 TTS 서비스 사용, API 키 불필요).
"""
import asyncio
import os
import re
import sys
from pathlib import Path

import edge_tts

ROOT = Path(__file__).parent
OUT = ROOT / "audio"
VOICE = os.environ.get("VOICE", "zh-CN-XiaoxiaoNeural")  # 여성. 남성: zh-CN-YunxiNeural
RATE = os.environ.get("RATE", "-8%")   # 학습용으로 살짝 또박또박
FORCE = bool(os.environ.get("FORCE"))

# phrases.js 파싱: "{ id: 1, ..., hanzi: "一二三" }" 형태의 각 줄에서 id/hanzi 추출
def load_phrases():
    text = (ROOT / "phrases.js").read_text(encoding="utf-8")
    items = []
    for line in text.splitlines():
        m_id = re.search(r"\bid:\s*(\d+)", line)
        m_hz = re.search(r'\bhanzi:\s*"([^"]*)"', line)
        if m_id and m_hz:
            items.append((int(m_id.group(1)), m_hz.group(1)))
    return items


async def synth(pid, hanzi):
    out = OUT / f"{pid}.mp3"
    if out.exists() and not FORCE:
        return "skip"
    communicate = edge_tts.Communicate(hanzi, voice=VOICE, rate=RATE)
    await communicate.save(str(out))
    return "done"


def write_manifest(phrases):
    # 서비스워커가 설치 시 전부 미리 캐시할 mp3 목록
    import json
    files = [f"{pid}.mp3" for pid, _ in phrases if (OUT / f"{pid}.mp3").exists()]
    (OUT / "manifest.json").write_text(json.dumps(files, ensure_ascii=False), encoding="utf-8")
    return files


async def main():
    OUT.mkdir(exist_ok=True)
    phrases = load_phrases()
    if not phrases:
        print("❌ phrases.js에서 회화를 못 찾았어요.")
        sys.exit(1)

    done = skip = fail = 0
    for pid, hanzi in phrases:
        try:
            r = await synth(pid, hanzi)
            if r == "done":
                done += 1
                print(f"✅ {pid}.mp3  {hanzi}")
            else:
                skip += 1
        except Exception as e:  # noqa: BLE001
            fail += 1
            print(f"❌ {pid} 실패: {e}")

    files = write_manifest(phrases)
    print(f"\n완료 — 생성 {done} / 건너뜀 {skip} / 실패 {fail}")
    print(f"manifest.json 갱신: {len(files)}개 mp3")
    print(f"음성 위치: {OUT}  (목소리: {VOICE})")


if __name__ == "__main__":
    asyncio.run(main())
