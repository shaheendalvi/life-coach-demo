(function(window) {
  'use strict';

  function setupPushes() {
    if (Notification.permission === 'denied') {
      alert('User has blocked push notification.');
      return;
    }

    if (!('PushManager' in window)) {
      alert('Sorry, Push notification isn\'t supported in your browser.');
      return;
    }
    
    Notification.requestPermission();

    if(navigator.serviceWorker) {
      navigator.serviceWorker.ready
        .then(function(registration) {
          registration.pushManager.subscribe({
            userVisibleOnly: true //Always show notification when received
          });
        });
    }
  }
 
  window.displayNotification = function(title, msg, icon) {
    if(navigator.serviceWorker) {
      navigator.serviceWorker.ready
      .then(function(registration) {
        registration.showNotification(title, {body: msg, icon: icon || '/images/logo.jpg'});
       });
    }
  };
  
  window.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.', event.notification.title);
    event.notification.close();
    window.history.pushState({}, null, '/goals-tracking-specific');
    //window.dispatchEvent(new CustomEvent('location-changed'));
  });

  setTimeout(setupPushes, 5000);
})(window);
