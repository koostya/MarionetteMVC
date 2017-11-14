var express = require('express');
var app = express();
var path = require('path');
const bodyParser = require('body-parser')

app.use(express.static('./'));
app.use(bodyParser())

const arr = [];

app.put('/items', function(req, res) {
    res.send(req.body);
});

app.get('/items', function(req, res) {
    res.send(req.body);
});

app.post('/items', function(req, res) {
    res.send(req.body);
});

app.delete('/items', function(req, res) {
    res.send(req.body);
});

app.listen(8080, function() {
    console.log('Server started');
});