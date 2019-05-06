var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('recipe');
});

module.exports = {
    router: router
}