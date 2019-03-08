import express from 'express';
import http from 'src/services/http';
import models from 'src/db/models';

const productModel = models.product;
const router = express.Router();

router.post('/', createProduct);

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
