var express = require('express');
var router = express.Router();
var Post = require('../models/post');

const db = {
    'stuffed avocados' : { name: 'Stuffed Avocados', pic: 'pics/stuffed-avocado.jpg'},
    'shrimp tacos' : { name: 'Shrimp Tacos', pic: 'pics/shrimp-tacos.jpg'},
    'salad' : { name: 'Mysterious Vegan Salad', pic: 'pics/salad.png'}
}

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/food', (req, res) => {
    res.send(db);
});

router.get('/food/:foodid', (req, res) => {
    const food = req.params.foodid;
    const val = db[food];
    if (val) {
        res.send(val);
    } else {
        res.send({});
    }
});

router.post('/postRecipe', (req,res) => {
    console.log(req.body);
    res.redirect('/');
});


module.exports = {
    router: router
}