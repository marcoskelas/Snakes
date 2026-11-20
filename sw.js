// Serpiente de Setas — service worker (generado por crear-version-github.ps1)
const CACHE = 'serpiente-setas-20261120-021407';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];
const MUSIC = ['musica-arcade.mp3', 'musica-pasillo.mp3', 'musica-intro.mp3', 'musica-final.mp3'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
    // la música se guarda en segundo plano para tenerla también sin conexión
    .then(() => caches.open(CACHE).then(c => Promise.all(MUSIC.map(m => c.match(m).then(r => r || c.add(m).catch(() => {})))))));
});

// Safari (iOS) pide la música por trozos (cabecera Range): se responde con el trozo pedido desde la caché.
async function rangeResponse(req, res) {
  const buf = await res.arrayBuffer(), size = buf.byteLength;
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.get('range') || '');
  const start = m && m[1] ? +m[1] : 0, end = m && m[2] ? Math.min(+m[2], size - 1) : size - 1;
  return new Response(buf.slice(start, end + 1), { status: 206, headers: {
    'Content-Type': 'audio/mpeg', 'Content-Range': 'bytes ' + start + '-' + end + '/' + size,
    'Content-Length': String(end - start + 1), 'Accept-Ranges': 'bytes' } });
}

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  if (url.pathname.endsWith('.mp3')) {
    e.respondWith(caches.match(url.pathname.split('/').pop(), { ignoreSearch: true }).then(hit => {
      if (!hit) return fetch(req);
      return req.headers.has('range') ? rangeResponse(req, hit) : hit;
    }));
    return;
  }
  if (req.mode === 'navigate') { // la página: primero internet (para recibir actualizaciones), si no hay, la copia guardada
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put('index.html', copy)); return r; })
      .catch(() => caches.match('index.html')));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req)));
});