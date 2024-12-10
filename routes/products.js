const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res)=>{
    try{
        const products = await db.query('select * from products');
        res.json(products.rows);
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;