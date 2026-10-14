// Nowa wersja service workera od razu przejmuje stronę
// bez czekania na zamknięcie kart.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.clients.claim()
  );
});


// Kliknięcie w powiadomienie:
// zamykamy je i otwieramy albo przywołujemy aplikację.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url =
    event.notification.data?.url || './';

  event.waitUntil(
    (async () => {
      const clientsList =
        await self.clients.matchAll({
          type: 'window',
          includeUncontrolled: true,
        });

      for (const client of clientsList) {
        if ('focus' in client) {
          return client.focus();
        }
      }

      return self.clients.openWindow(url);
    })()
  );
});


// Wiadomość z serwera.
// Oczekujemy JSON-a:
// {
//   "title": "...",
//   "body": "..."
// }
//
// Obsługujemy również zwykły tekst.
self.addEventListener('push', (event) => {
  let message = {
    title: 'Web Push',
    body: event.data
      ? event.data.text()
      : '',
  };

  try {
    message = event.data.json();
  } catch (err) {
    // To nie był JSON - zostaje zwykły tekst.
  }

  event.waitUntil(
    self.registration.showNotification(
      message.title,
      {
        body: message.body,
        icon: 'android.png',

        data: {
          url: './',
        },
      }
    )
  );
});