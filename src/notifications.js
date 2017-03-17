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

  setTimeout(setupPushes, 5000);
})(window);
