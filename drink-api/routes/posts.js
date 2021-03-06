const express = require('express');
const multer = require('multer');
const router = express.Router();
const Post = require('../models/post');
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, 'images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post('', multer({
  storage: storage
}).single('image'), (req, res, next) => {
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
  Post.updateOne({
      _id: req.params.id
    }, post)
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
      req.status(404).json({
        info: 'post not found'
      });
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