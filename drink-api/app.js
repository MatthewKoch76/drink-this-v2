const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('../drink-api/models/post');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
})

mongoose.connect('mongodb+srv://Matthew:gYBM5yVnvMtROKMv@drink-this-2-rz6uj.mongodb.net/drinks?retryWrites=true', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to database')
  })
  .catch(() => {
    console.group('Connection Failed')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    info: 'post added'
  })
});

app.get('/api/posts', (req, res) => {
  Post.find()
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        info: 'got posts',
        posts: documents
      });
    });
});

app.delete('/api/posts/:id', (req, res) => {
  Post.deleteOne({
    _id: req.params.id
  }).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'post deleted'
    });
  });
});

module.exports = app;