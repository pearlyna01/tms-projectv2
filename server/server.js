const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();

// require controllers
const dbControl = require('./controllers/dbcontroller');

var port = process.env.PORT || 3001;

// Setting up config.env file variables
dotenv.config({path : './config/.env'})

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
    cookie: { 
        secure: false,
        maxAge: 10 * 60 * 60 * 1000
    }
}));

// pass app to controllers
dbControl(app);
//apiControl(app);

const user = require('./routes/user');
const task = require('./routes/task');
app.use('/',user);
app.use('/task',task);

// listening to port
app.listen(port, () => {
    console.log(`Listening on port ${port}. \n go to http://localhost:${port}`);
});