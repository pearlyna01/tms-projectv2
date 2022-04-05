const express = require('express');
const app = express();

const session = require('express-session');
const bodyParser = require('body-parser');

// require controllers
const apiControl = require('./controllers/apicontroller');
// const dbControl = require('./controllers/dbcontroller');

var port = process.env.PORT || 3001;

// Setup the body parser to handle form submits
app.use(bodyParser.urlencoded({extended: true})); 
// Session setup
app.use(session({secret: 'super-secret'})); 

// test api on client end
app.post('/testApi', (req,res) => {
    console.log('api works!');
    res.redirect('/');
});

// pass app to controllers
apiControl(app);
// dbControl(app);

// listening to port
app.listen(port, () => {
    console.log(`Listening on port ${port}. \n go to http://localhost:${port}`);
});