const CACHE_NAME='sehati-v1';
const urlsToCache=['./','./index.html'];

self.addEventListener('install',function(e){
  e.waitUntil(caches.open(CACHE_NAME).then(function(c){return c.addAll(urlsToCache);}));
});

self.addEventListener('fetch',function(e){
  e.respondWith(caches.match(e.request).then(function(r){
    if(r)return r;
    return fetch(e.request).catch(function(){return caches.match('./index.html');});
  }));
});

self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(n){
    return Promise.all(n.filter(function(n){return n!==CACHE_NAME;}).map(function(n){return caches.delete(n);}));
  }));
});
