const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/products', (req, res) => {
  res.render('products');
});

router.get('/cart', (req, res) => {
  res.render('cart');
});

router.get('/product', (req, res) => {
  res.render('product');
});


module.exports = router;
