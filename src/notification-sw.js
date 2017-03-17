self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.', event.notification.title);
  event.notification.close();
  //window.history.pushState({}, null, '/goals-tracking-specific');
  //window.dispatchEvent(new CustomEvent('location-changed'));
});