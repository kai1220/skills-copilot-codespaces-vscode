// create web server
const express = require("express");
const app = express();
const port = 3000;
// connect to database
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/express-demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// create schema
const commentSchema = new mongoose.Schema({
  username: String,
  comment: String,
});
// create model
const Comment = mongoose.model("Comment", commentSchema);

// set template engine
app.set("view engine", "ejs");
app.set("views", "./views");

// set body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set static folder
app.use(express.static("public"));

// handle GET request
app.get("/", (req, res) => {
  Comment.find().then((comments) => {
    res.render("home", { comments });
  });
});

// handle POST request
app.post("/", (req, res) => {
  const { username, comment } = req.body;
  const newComment = new Comment({ username, comment });
  newComment.save().then(() => {
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});