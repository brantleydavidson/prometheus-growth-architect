// Service Worker Registration with Update Handling
(function() {
  'use strict';
  
  // Only register service worker in production
  if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
    // Wait for window load to not impact performance
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
          console.log('ServiceWorker registered with scope:', registration.scope);
          
          // Check for updates every hour
          setInterval(() => {
            registration.update();
          }, 3600000);
          
          // Handle updates
          registration.addEventListener('updatefound', function() {
            const newWorker = registration.installing;
            
            newWorker.addEventListener('statechange', function() {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available
                console.log('New service worker available, refresh to update.');
                
                // Show update notification if you have one
                if (window.showUpdateNotification) {
                  window.showUpdateNotification();
                }
              }
            });
          });
        })
        .catch(function(error) {
          console.error('ServiceWorker registration failed:', error);
        });
        
      // Handle controller change
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', function() {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    });
  }
})(); 