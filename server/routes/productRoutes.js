const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");
const db = require("../db");

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Create uploads dir if not exists
fs.ensureDirSync('uploads/images');

// Add image_url column if not exists
db.query(`
  ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url VARCHAR(255);
`).catch(err => console.log('Column already exists or other DB error:', err));

router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM products ORDER BY id ");
  res.json(result.rows);
});

router.post("/", upload.single('image'), async (req, res) => {
  const { name, price, category, status } = req.body;
  const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : null;

  await db.query(
    "INSERT INTO products (name, price, category, status, image_url) VALUES ($1, $2, $3, $4, $5)",
    [name, price, category, status, imageUrl],
  );

  res.json({ message: "Product created" });
});

router.put("/:id", upload.single('image'), async (req, res) => {
  const { name, price, category, status } = req.body;
  const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : req.body.image_url;

  await db.query(
    "UPDATE products SET name = $1, price = $2, category = $3, status = $4, image_url = $5 WHERE id = $6",
    [name, price, category, status, imageUrl, req.params.id],
  );

  res.json({ message: "Product updated" });
});

router.delete("/:id", async (req, res) => {
  await db.query("DELETE FROM products WHERE id = $1", [req.params.id]);
  res.json({ message: "Product deleted" });
});

module.exports = router;
