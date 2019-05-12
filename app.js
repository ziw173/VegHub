const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const expressValidator = require('express-validator');
const index = require('./routes/index');
const recipe = require('./routes/recipe');
const register = require('./routes/register');
const profile = require('./routes/profile');
const singleRecipe = require('./routes/singleRecipe');
const URI = require('./models/post').uri;
const mongoose = require('mongoose');


const app = express();

//template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//port
app.set('port', (process.env.PORT || 3000));

//Routes
app.use('/', index.router);
app.use('/recipe', recipe.router);
app.use('/register', register.router);
app.use('/profile', profile.router);
app.use('/singleRecipe', singleRecipe.router);

//Connect DB
mongoose.connect(URI,
    {useNewUrlParser: true}, (err) => {
        if (err) throw err;
        console.log("The Mongoose connection is ready.");
});

//Start server
const server = app.listen(app.get('port'), () => {
    console.log('Server started on port ' + app.get('port'));
});