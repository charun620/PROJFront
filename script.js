const express = require("express");
const axios = require("axios");
const app = express();
const path = require("path");
var BodyParser = require("body-parser");
const base_url = "http://localhost:3000";
// const base_url = "http://node52307-chern.proen.app.ruk-com.cloud/books";

app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));


app.get("/", async (req, res) => {
  try {
      const response = await axios.get(base_url + '/warehouse');
      res.render("books", { books: response.data });
  } catch (err) {
      console.error(err);
      res.status(500).send('Error');
  }
});

app.get("/book/:id" , async (req, res) => {
  try {
      const response = await axios.get(base_url + '/warehouse/' + req.params.id);
      res.render("book", { book: response.data });
  } catch (err) {
      console.error(err);
      res.status(500).send('Error');
  }
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create", async (req, res) => {
  try {
      const data = { title: req.body.title, author: req.body.author };
      await axios.post(base_url + '/warehouse', data);
      res.redirect("/");
  } catch (err) {
      console.error(err);
      res.status(500).send('Error');
  }
});

app.get("/update/:id", async (req, res) => {
  try {
      const response = await axios.get(
          base_url + '/warehouse/' + req.params.id);
          res.render("update", {book: response.data});
      } catch (err) {
          console.error(err);
          res.status(500).send('Error');
      }
});

app.post("/update/:id", async (req, res) => {
  try {
      const data = { title : req.body.title, author: req.body.author };
      await axios.put(base_url + '/warehouse/' + req.params.id, data);
      res.redirect("/");
  } catch (err) {
      console.error(err);
      res.status(500).send('Error');
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
      await axios.delete(base_url + '/warehouse/' + req.params.id);
      res.redirect("/");
  } catch (err) {
      console.error(err);
      res.status(500).send('Error');
  }
});

app.listen(777, () => {
   console.log('Server started on port 777');
});

// app.listen(5500, () => {
//   console.log('Server started on port 5500');
// });
