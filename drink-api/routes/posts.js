const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post('', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save()
    .then(createdPost => {
      res.status(201).json({
        info: 'post added',
        postId: createdPost._id
      });
    });
});

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post)
    .then(result => {
      res.status(200).json({
        info: 'updated'
      })
    })
});

//get all
router.get('', (req, res) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        info: 'got posts',
        posts: documents
      });
    });
});

//get one
router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      req.status(404).json({info: 'post not found'});
    }
  });
});

router.delete('/:id', (req, res) => {
  Post.deleteOne({
    _id: req.params.id
  }).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'post deleted'
    });
  });
});

module.exports = router;