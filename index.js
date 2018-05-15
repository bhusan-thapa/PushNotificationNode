'use strict';
const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());
const publicVapidKey =
  'BJucqhO6JALO9msZ7HQBYB7-iPAd4hjDygFKiZZdZUeATTOWN-gwRZoomjltSOJueSh4Vzpq3rtjDwevauMX6bk';
const privateVapidKey = 'VjhIZvBOi9GIVchdFXAV40txM8cylUjmlxapIY0ebn4';

webpush.setVapidDetails(
  'mailto:test@test.com',
  publicVapidKey,
  privateVapidKey
);

app.post('/subscribe', (req, res) => {
  //Get push subscription object
  const subscription = req.body;
  res.status(201).json({});
  //Create payload
  const payload = JSON.stringify({ title: 'Push Test' });
  // pass object to sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.log('err', err));
});
app.listen(5000, () => console.log('App running '));
