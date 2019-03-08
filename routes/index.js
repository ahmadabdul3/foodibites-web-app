import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import http from 'src/services/http';
import productRoutes from './product';

const router = express.Router();
router.use('/product', productRoutes);

// send all requests to index.html so browserHistory in React Router works
router.get('*', (req, res) => {
  const filePath = path.join(__dirname, '../views/index.pug');
  res.render(path.resolve(filePath));
});

module.exports = router;
