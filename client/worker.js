console.log('serviceWorker loaded');
self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('Push Recieved');
  self.registration.showNotification(data.title, {
    body: 'Notified by Shumsher',
    icon:
      'https://image.freepik.com/free-icon/cia-shield-symbol-with-an-eagle_318-64615.jpg'
  });
});
