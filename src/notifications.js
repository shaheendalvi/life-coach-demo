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
  }
 
  window.displayNotification = function(title, msg, icon) {
    new Notification(title, {body: msg, icon: icon || '/images/logo.jpg'});
  };

  setTimeout(setupPushes, 5000);
})(window);
