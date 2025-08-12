import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;
const app = express();

app.use(cors());
app.use(express.json());

// Connect to Postgres
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "dashboard",
  password: process.env.DB_PASS || "your_password",
  port: process.env.DB_PORT || 5432,
});

// ✅ GET all users
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add a user
app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete a user
app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET all posts
app.get("/api/posts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add a post
app.post("/api/posts", async (req, res) => {
  try {
    const { title, author, image } = req.body;
    const result = await pool.query(
      "INSERT INTO posts (title, author, image) VALUES ($1, $2, $3) RETURNING *",
      [title, author, image]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete a post
app.delete("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM posts WHERE id = $1", [id]);
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
