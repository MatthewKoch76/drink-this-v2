const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');
const app = express();

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
  extended: true
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api/posts/', postRoutes);

module.exports = app;