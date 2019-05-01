var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/recipe', (req, res) => {
    res.render('recipe');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/profile', (req, res) => {
    res.render('profile');
});


module.exports = {
    router: router
}