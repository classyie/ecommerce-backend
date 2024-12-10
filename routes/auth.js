const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const data = req.body;
  const hashedPassword = bcrypt.hashSync(data.password, 10);
  try {
    const user = await db.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [data.email, hashedPassword]
    );
    console.log(user.rows[0]);
    res.status(201).send("User registered successfully");
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// Login route
router.post('/login', async (req, res) => {
  const data = req.body;
  try {
    const user = await db.query('SELECT * FROM users WHERE email=$1', [data.email]);
    if (!user.rows[0]) return res.status(401).send("Invalid credentials");

    const isMatch = bcrypt.compareSync(data.password, user.rows[0].password);
    if (isMatch) {
      res.status(200).send("Logged in successfully");
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
