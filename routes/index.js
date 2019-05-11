var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var fs = require('fs');

const db = {
    'stuffed avocados' : { name: 'Stuffed Avocados', pic: 'pics/stuffed-avocado.jpg'},
    'shrimp tacos' : { name: 'Shrimp Tacos', pic: 'pics/shrimp-tacos.jpg'},
    'salad' : { name: 'Mysterious Vegan Salad', pic: 'pics/salad.png'}
}

router.get('/', (req, res) => {
    Post.find({}).exec( (err, posts) => {
        if (err) throw err;
        res.render('home', {
            posts: posts
        });
    });
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
    const name = req.body.name;
    const body = req.body.message;
    const recipe = req.body.instructions;
    const tags = req.body.tags;
    const likes = req.body.likes;
    const comments = req.body.comments;
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const d = `${month}/${day}/${year}`;

    const postData = {
        name: name,
        image: {
            
        },
        body: body,
        date: d,
        tags: tags,
        recipe: recipe,
        likes: likes,
        comments: comments
    };

    const newPost = new Post(postData);
    newPost.save( (err) => {
        if (err) throw err;
        console.log("Posted.");
    });
    res.redirect('/');
});


module.exports = {
    router: router
}