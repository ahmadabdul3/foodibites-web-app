import express from 'express';
import http from 'src/services/http';
import models from 'src/db/models';

const productModel = models.product;
const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);

export default router;

async function createProduct(req, res) {
  const { product } = req.body;
  try {
    const newProduct = await productModel.createWithRelations({ data: product });
    res.json({ message: 'successfully created new product', product: newProduct });
  } catch (e) {
    console.log('error', e);
    res.status(422).json({ message: 'Could not create product', e });
  }
}

async function getProducts(req, res) {
  try {
    const products = await productModel.findAll();
    res.json({ products, message: 'sucess' });
  } catch (e) {
    console.log('error', e);
    res.status(422).json({ message: 'Failed to fetch data from database', e });
  }
}
