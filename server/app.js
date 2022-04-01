const express = require('express');
const app = express();

var port = process.env.PORT || 3001;

app.post('/testApi', (req,res) => {
    console.log('api works!');
    res.redirect('/');
});

app.listen(port);