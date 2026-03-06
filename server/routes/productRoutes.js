const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM products ORDER BY id ");
  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const { name, price, category, status } = req.body;

  await db.query(
    "INSERT INTO products (name, price, category, status) VALUES ($1, $2, $3, $4)",
    [name, price, category, status],
  );

  res.json({ message: "Product created" });
});

router.put("/:id", async (req, res) => {
  const { name, price, category, status } = req.body;

  await db.query(
    "UPDATE products SET name = $1, price = $2, category = $3, status = $4 WHERE id = $5",
    [name, price, category, status, req.params.id],
  );

  res.json({ message: "Product updated" });
});

router.delete("/:id", async (req, res) => {
  await db.query("DELETE FROM products WHERE id = $1", [req.params.id]);
  res.json({ message: "Product deleted" });
});

module.exports = router;
