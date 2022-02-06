var http = require('http');
const express = require('express');
const app = express();
var { answerFunction } = require('./expressGatewayAnswer.js');
var { expressCors } = require('./expressCors.js');

app.get('/fb', expressCors, answerFunction);
http.createServer(app).listen(8081);
console.log('Express server listening on 8081');