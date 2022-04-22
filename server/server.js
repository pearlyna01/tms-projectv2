const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

// require controllers
const apiControl = require('./controllers/apicontroller');
const dbControl = require('./controllers/dbcontroller');

var port = process.env.PORT || 3001;

// Setup the body parser to handle form submits
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

// Session setup
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(session({
    secret: "aSecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// app.get('/index.js', function (req, res) {
//     res.sendFile('index.js');
// });

// test api on client end
// app.post('/testApi', (req,res) => {
//     console.log('api works!');
//     res.redirect('/');
// });

// pass app to controllers
dbControl(app);
apiControl(app);

// listening to port
app.listen(port, () => {
    console.log(`Listening on port ${port}. \n go to http://localhost:${port}`);
});