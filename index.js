var express = require('express')

var app = express();

app.use(express.static('static'));
app.use(express.json());

var server = app.listen(3000, () => {
    console.log('server is running on port', server.address().port);
})


