const V='eltiam-v28',PRE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./fonts/vazirmatn-400.woff2','./fonts/vazirmatn-600.woff2','./fonts/vazirmatn-800.woff2','./img/p1.webp','./img/p2.webp','./img/logo-slide2.webp','./img/spine-3d.webp','./img/spine.webp','./img/yalda.webp'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(PRE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
function put(req,r){if(r&&r.ok&&r.status===200){const c=r.clone();caches.open(V).then(x=>x.put(req,c))}return r}
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET'||!q.url.startsWith(self.location.origin)||q.url.includes('.mp4'))return;
if(q.mode==='navigate'||q.url.endsWith('/')||q.url.includes('.html')||q.url.includes('content.json')||q.url.includes('/admin/')){
 // network first, but fall back to cache after 2.5s on slow/filtered networks
 e.respondWith(new Promise(res=>{let done=false;const net=fetch(q.mode==='navigate'?new Request(q.url,{cache:'no-cache'}):q).then(r=>put(q,r));
  const t=setTimeout(()=>caches.match(q).then(c=>{if(c&&!done){done=true;res(c)}}),2500);
  net.then(r=>{clearTimeout(t);if(!done){done=true;res(r)}}).catch(()=>caches.match(q).then(c=>{if(!done){done=true;res(c||caches.match('./index.html'))}}))}));return}
 // static files (images, fonts, js, icons): cache first, update in background
 e.respondWith(caches.match(q).then(c=>{const n=fetch(q).then(r=>put(q,r)).catch(()=>c);return c||n}))});
