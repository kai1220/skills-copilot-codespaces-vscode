// create web server using express
// load express module
const express = require('express');
// create express object
const app = express();

// load body-parser module
const bodyParser = require('body-parser');
// load mongoose module
const mongoose = require('mongoose');
// connect to database
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });
// create schema
const commentSchema = new mongoose.Schema({
  name: String,
  comment: String
});
// create model
const Comment = mongoose.model('Comment', commentSchema);

// configure body-parser
app.use(bodyParser.urlencoded({ extended: true }));
// set view engine
app.set('view engine', 'ejs');
// serve static files
app.use(express.static('public'));

// root route
app.get('/', (req, res) => {
  // find all comments from database
  Comment.find({}, (err, comments) => {
    if (err) {
      console.log(err);
    } else {
      // render index.ejs with comments
      res.render('index', { comments: comments });
    }
  });
});

// new route
app.get('/new', (req, res) => {
  // render new.ejs
  res.render('new');
});

// create route
app.post('/', (req, res) => {
  // create new comment
  Comment.create(req.body.comment, (err, newComment) => {
    if (err) {
      console.log(err);
    } else {
      // redirect to root route
      res.redirect('/');
    }
  });
});

// start server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
