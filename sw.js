// 오프라인 캐싱 — 중국 현지에서 데이터 없이도 실행되도록
const CACHE = "chtrip-v10";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./phrases.js",
  "./manifest.json",
  "./icon.svg",
];

// 설치 시: 앱 파일 + 모든 mp3(audio/manifest.json 기준)를 미리 다운로드 → 오프라인 100% 재생
self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(ASSETS);
    try {
      const res = await fetch("audio/manifest.json", { cache: "no-cache" });
      const files = await res.json();
      // 하나 실패해도 전체가 안 깨지게 개별 처리
      await Promise.all(files.map((f) =>
        c.add(`audio/${f}`).catch(() => {})
      ));
    } catch (_) { /* manifest 없으면 런타임 캐싱으로 폴백 */ }
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = e.request.url;

  // 음성 mp3: 캐시 우선(안 바뀜) + 처음 재생 시 런타임 캐싱 → 오프라인 재생
  if (url.includes("/audio/")) {
    e.respondWith(
      caches.match(e.request).then((hit) =>
        hit || fetch(e.request).then((res) => {
          if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
          return res;
        })
      )
    );
    return;
  }

  // 앱 파일(html/js/css/json): 네트워크 우선 → 수정 즉시 반영, 오프라인이면 캐시로 폴백
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
