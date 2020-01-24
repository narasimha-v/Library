if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const expresslayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(bodyparser.urlencoded({ limit: "10mb", extended: false }));
app.use(expresslayout);
app.use(express.static("public"));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on("error", error => console.error(error));
mongoose.connection.once("open", () => console.log("Connected to Mongo DB"));

app.listen(process.env.PORT || 3000, err => {
  if (!err) {
    console.log("Server Started");
  }
});

app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);
