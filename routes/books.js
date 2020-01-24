const express = require("express");
const router = express.Router();
const Book = require("../models/Books");
const Author = require("../models/Author");

//All Books Route
router.get("/", async (req, res) => {
  try {
    res.send("test");
  } catch (error) {}
});

//New Books Route
router.get("/new", async (req, res) => {
  try {
    const authors = await Author.find({});
    const book = new Book();
    res.render("books/new", { authors: authors, book: book });
  } catch (error) {
    res.redirect("/books");
  }
});

//Create Books Route
router.post("/", async (req, res) => {
  const { title, author, publishDate, pageCount, description } = req.body;
  try {
    const book = new Book({
      title,
      author,
      publishDate: new Date(publishDate),
      pageCount,
      description
    });
  } catch (error) {}
});

module.exports = router;
