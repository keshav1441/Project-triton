// public/sw.js
self.addEventListener("install", () => {
  console.log("Service Worker installed");
});

self.addEventListener("fetch", () => {
  // Optional: cache strategy
});
