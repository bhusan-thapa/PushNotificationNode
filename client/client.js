const publicVapidKey =
  'BJucqhO6JALO9msZ7HQBYB7-iPAd4hjDygFKiZZdZUeATTOWN-gwRZoomjltSOJueSh4Vzpq3rtjDwevauMX6bk';

//Check for service worker
if ('serviceWorker' in navigator) {
  send().catch(err => console.log(err));
}
//Register service worker, register push and send the push
async function send() {
  console.log('Registering service worker....');
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  });
  console.log('serviceWorker is registered!!');
  //Register push
  console.log('Registering push ...');
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log('Sending push Notification');
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
  console.log('Push sent');
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
