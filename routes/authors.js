const express = require("express");
const router = express.Router();
const Author = require("../models/Author");

//All Authors Route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name !== null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("author/index", { authors: authors, searchOptions: req.query });
  } catch (error) {
    res.redirect("/");
  }
});

//New Authors Route
router.get("/new", (req, res) => {
  res.render("author/new", { author: new Author() });
});

//Create Author Route - adding a new author
router.post("/", async (req, res) => {
  let author;
  try {
    author = await Author.findOne({ name: req.body.name });
    if (author) {
      return res.render("author/new", {
        author: author,
        errorMessage: "Author already Exists"
      });
    }
    author = new Author({
      name: req.body.name
    });
    const newAuthor = await author.save();
    //res.redirect(`authors/${(newAuthor.id)}`)
    res.redirect("authors");
  } catch (error) {
    console.error(error.message);
    res.render("author/new", {
      author: author,
      errorMessage: "Error Creating Author"
    });
  }
});

module.exports = router;
