const express = require('express');
const router = express.Router();
const Post = require('../models/post').post;
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const GridStorage = require('multer-gridfs-storage');
const GridFSStream = require('gridfs-stream');
const URI = require('../models/post').uri;
const connection = mongoose.createConnection(URI);

// Init gfs
let gfs;
connection.once('open', () => {
  // Init stream
  gfs = GridFSStream(connection.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridStorage({
  url: URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
        const filename = file.originalname;
        const fileData = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileData);
    });
  }
});
const upload = multer({ storage });

router.get('/', (req, res) => {
  Post.find({}).exec( (err, posts) => {
    if (err) throw err;
    gfs.files.find().toArray((err, files) => {
        res.render('home', { 
          posts: posts,
          files: files 
        });
    });
  });
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

router.post('/upload', upload.single('file'), (req, res) => {
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
          data: req.file.filename,
          contentType: req.file.contentType
        },
        body: body,
        date: d,
        tags: tags,
        recipe: recipe,
        likes: likes,
        comments: comments
    };
    // console.log(JSON.stringify(req.file) + '\n' + req.path + '\n' + req.file.contentType);
    const newPost = new Post(postData);
    newPost.save( (err) => {
        if (err) throw err;
        console.log("Posted.");
    });
    res.redirect('/');
});
  
router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    });
});

router.post('/files/:id', (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, g) => {
    if (err) throw err;
    res.redirect('/');
  });
});

router.get('/uploads/:file', (req, res) => {
    // console.log(path.join(__dirname,req.path));
    const dir = '..' + req.path;
    console.log('PATH: ' + dir);
    var bitmap = fs.readFileSync(dir);
    req.path = new Buffer(bitmap).toString('base64');
    res.send(req);
});


module.exports = {
    router: router
}