const express = require("express");
const router = express.Router();
const Book = require("../models/Books");
const Author = require("../models/Author");
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

//Used for hosting file on cloud server
//const path = require("path");
// const fs = require("fs");
// const uploadPath = path.join("public", Book.coverImageBasePath);
// const multer = require("multer");
// const upload = multer({
//   dest: uploadPath,
//   fileFilter: (req, file, callback) => {
//     callback(null, imageMimeTypes.includes(file.mimetype));
//   }
// });

//All Books Route
router.get("/", async (req, res) => {
  let query = Book.find();
  if (req.query.title != null && req.query.title != "") {
    query = query.regex("title", RegExp(req.query.title, "i"));
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore != "") {
    query = query.lte("publishDate", req.query.publishedBefore);
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter != "") {
    query = query.gte("publishDate", req.query.publishedAfter);
  }
  try {
    const books = await query.exec();
    res.render("books/index", { books: books, searchOptions: req.query });
  } catch (error) {
    res.redirect("/");
  }
});

//Create Books Route
router.post("/", async (req, res) => {
  //const fileName = req.file != null ? req.file.filename : null;
  const { title, author, publishDate, pageCount, description } = req.body;
  const book = new Book({
    title,
    author,
    publishDate: new Date(publishDate),
    pageCount,
    description
  });
  saveCover(book, req.body.cover);
  try {
    const newBook = await book.save();
    //res.redirect(`books/${newBook.id}`);
    res.redirect("books");
  } catch (error) {
    console.error(error.message);
    renderNewPage(res, book, true);
  }
});

//New Books Route
router.get("/new", async (req, res) => {
  renderNewPage(res, new Book());
});

async function renderNewPage(res, book, hasError = false) {
  try {
    const authors = await Author.find({});
    const params = { authors: authors, book: book };
    if (hasError) {
      params.errorMessage = "Error creating book";
    }
    res.render("books/new", params);
  } catch (error) {
    res.redirect("/books");
  }
}

//Removing books from server
// function removeBookCover(fileName) {
//   fs.unlink(path.join(uploadPath, fileName), err => {
//     if (err) {
//       console.error(err);
//     }
//   });
// }

function saveCover(book, coverEncoded) {
  if (coverEncoded == null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    book.coverImage = new Buffer.from(cover.data, "base64");
    book.coverImageType = cover.type;
  }
}

module.exports = router;
