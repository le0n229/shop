const express = require('express');
const fs = require('fs');

const router = express.Router();
const handler = require('../controller/handler');


router.get('/products', (req, res) => {
  fs.readFile('db/products.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
    }
  });
});

router.get('/cart', (req, res) => {
  fs.readFile('db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
    }
  });
});

router.post('/cart', (req, res) => {
  handler(req, res, 'add', 'db/userCart.json');
});
router.put('/cart/:id', (req, res) => {
  handler(req, res, 'change', 'db/userCart.json');
});

router.delete('/cart/:id', async (req, res) => {
  await handler(req, res, 'delete', 'db/userCart.json');
});


module.exports = router;
