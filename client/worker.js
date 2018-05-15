console.log('serviceWorker loaded');
self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('Push Recieved');
  self.registration.showNotification(data.title, {
    body: 'Notified by Shumsher',
    icon: 'http://image.ibb.co/frYOFd/tmlogo.png'
  });
});
