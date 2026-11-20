const V='dodge-v35',FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(FILES.map(f=>fetch(new Request(f,{cache:'reload'})).then(r=>c.put(f,r))))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==V).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{if(r.ok){const c=r.clone();caches.open(V).then(ch=>ch.put(e.request,c))}return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))))});
