const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    info: 'post added'
  })
});

app.use('/api/posts', (req, res) => {
  const posts = [{
    id: '1',
    title: "title1",
    content: "content1"
  },
  {
    id: '2',
    title: "title2",
    content: "content2"
  }]
  res.status(200).json({
    info: 'got posts',
    posts: posts
  })
});

module.exports = app;