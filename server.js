const config = require('./config');
const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const apiKey = config.apiKey;
const extUrl = 'http://www.omdbapi.com';

app.use(express.static(path.join(__dirname)));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/api', (req, res) =>
  request({
    url: `${extUrl}${req.url.replace('/api', '')}&apikey=${apiKey}`,
    method: req.query.method,
  })
    .on('error', err => console.log(err))
    .pipe(res),
);

app.listen(8080);
