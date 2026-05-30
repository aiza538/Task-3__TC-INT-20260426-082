const CACHE_NAME = "fieldops-v1";
const STATIC_ASSETS = ["/", "/index.html", "/manifest.json"];

// Install - Cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)),
  );
  self.skipWaiting();
});

// Fetch - Network first for API, Cache first for assets
self.addEventListener("fetch", (event) => {
  // API calls - Network First
  if (
    event.request.url.includes("/api/") ||
    event.request.url.includes("jsonplaceholder")
  ) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request)),
    );
    return;
  }

  // Static assets - Cache First
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((fetchResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        })
      );
    }),
  );
});

// Push Notifications
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {
    title: "FieldOps Update",
    body: "You have a new job assignment",
  };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icons/icon-192x192.png",
      badge: "/icons/icon-72x72.png",
      vibrate: [200, 100, 200],
      data: { url: data.url || "/" },
    }),
  );
});

// Notification Click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

// Background Sync
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-jobs") {
    event.waitUntil(syncPendingJobs());
  }
});

async function syncPendingJobs() {
  const cache = await caches.open("pending-jobs");
  const requests = await cache.keys();
  for (const request of requests) {
    try {
      const response = await fetch(request);
      if (response.ok) await cache.delete(request);
    } catch (error) {
      console.error("Sync failed:", error);
    }
  }
}
