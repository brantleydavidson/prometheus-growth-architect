if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => {
        console.log('Service worker registered successfully');
      })
      .catch((err) => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
} 