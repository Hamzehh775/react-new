
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;
const app = express();

app.use(cors());            // allow requests from your Vite dev server
app.use(express.json());    // parse JSON bodies

// configure postgres pool from .env
const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "",
  database: process.env.PGDATABASE || "admin_dashboard",
  port: Number(process.env.PGPORT || 5432),
});

// GET all users
app.get("/api/users", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users ORDER BY id ASC");
    res.json(rows);
  } catch (e) {
    console.error("GET /api/users error:", e);
    res.status(500).json({ error: "Database error" });
  }
});
app.get('/api/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Database error' });
  }
});


// POST create user
app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.json(rows[0]);
  } catch (e) {
    console.error("POST /api/users error:", e);
    res.status(500).json({ error: error.message });
  }
});


// Get all posts
app.get("/api/posts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Create a new post
app.post("/api/posts", async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a post by ID
app.delete("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM posts WHERE id = $1", [id]);
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// DELETE user by id
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/users/:id error:", e);
    res.status(500).json({ error: "Database error" });
  }
});

const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
