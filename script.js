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


app.get("/warehouse", async (req, res) => {
  try {
    const products = await axios.get(`${base_url}/products`);
    const companies = await axios.get(`${base_url}/companies`);
    const productCompanyRelations = await axios.get(`${base_url}/productCompanyRelations`);
    
    res.render("warehouse", {
      products: products.data,
      companies: companies.data,
      productCompanyRelations: productCompanyRelations.data
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


app.get("/products", async (req, res) => {
  try {
      const products = await axios.get(`${base_url}/products`);
      res.render("products/products", { products: products.data });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
  }
});

// Edit product page
app.get("/products/edit/:id", async (req, res) => {
  try {
      const product = await axios.get(`${base_url}/products/${req.params.id}`);
      res.render("products/editProduct", { product: product.data });
  } catch (error) {
      console.error(error);
      res.status(404).json({ message: error.message });
  }
});

app.post("/products/edit/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = {
      ProductName: req.body.productName,
      StockQuantity: req.body.stockQuantity
      // Add other properties as needed
    };

    await axios.put(`${base_url}/products/${productId}`, updatedProduct);

    res.redirect(`/products/edit/${productId}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product" });
  }
});


// Delete product page
app.get("/products/delete/:id", async (req, res) => {
  try {
      await axios.delete(`${base_url}/products/${req.params.id}`);
      res.redirect("/products");
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
  }
});

// Add new product page
app.get("/products/add", (req, res) => {
  res.render("addProduct");
});


app.get("/companies", async (req, res) => {
  try {
    const companies = await Company.find(); // Fetch companies from your database
    res.render("companyPage", { Company: companies });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Define for create edit, and delete companies
app.get("/companies", async (req, res) => {
  try {
      const companies = await axios.get(`${base_url}/companies`);
      res.render("companies/companies", { companies: companies.data });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
  }
});
// Create Company 
app.get("/companies/create", (req, res) => {
  res.render("createCompanyForm");
});

app.post("/companies/create", async (req, res) => {
  try {
    const response = await axios.post(`${base_url}/companies`, req.body);
    res.redirect("/companies");
  } catch (error) {
    res.status(400).send("Bad Request");
  }
});

// Edit Company 
app.get("/companies/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${base_url}/companies/${req.params.id}`);
    res.render("editCompanyForm", { Company: response.data });
  } catch (error) {
    res.status(404).send("Not Found");
  }
});

app.post("/companies/edit/:id", async (req, res) => {
  try {
    await axios.put(`${base_url}/companies/${req.params.id}`, req.body);
    res.redirect("/companies");
  } catch (error) {
    res.status(400).send("Bad Request");
  }
});

// Delete Company
app.get("/companies/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${base_url}/companies/${req.params.id}`);
    res.redirect("/companies");
  } catch (error) {
    res.status(404).send("Not Found");
  }
});


app.listen(777, () => {
   console.log('Server started on port 777');
});

// app.listen(5500, () => {
//   console.log('Server started on port 5500');
// });

