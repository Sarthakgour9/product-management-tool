require("dotenv").config({ path: "./server/.env" });
const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(3000, ()=>{
 console.log("Server running on port 3000");
});