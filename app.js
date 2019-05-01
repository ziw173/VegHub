var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var expressValidator = require('express-validator');
var home = require('./routes/home');

var app = express();

//template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//static folder
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', (process.env.PORT || 3000));

//Routes
app.use('/', home.router);

var server = app.listen(app.get('port'), () => {
    console.log('Server started on port ' + app.get('port'));
});