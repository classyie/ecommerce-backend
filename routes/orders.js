const express = require('express');

const db = require('../db');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const orders = await db.query('select * from orders');
        res.json(orders.rows);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const order = await db.query(
            'INSERT INTO orders (user_id, product_id) VALUES ($1, $2) RETURNING *',
            [userId, productId]
        );
        res.status(201).json(order.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;