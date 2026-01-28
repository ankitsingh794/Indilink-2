const express = require("express");
const cors = require("cors");

const userRoutes = require('./routes/user.routes');
const sellerRoutes = require('./routes/seller.routes');
const categoriesRoutes = require('./routes/categories');

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  res.send({ status: true, message: "Server is up" });
});

// API Routes
app.use("/api", userRoutes);
app.use("/api", sellerRoutes);
// app.use("/api/categories", categoriesRoutes); 

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
