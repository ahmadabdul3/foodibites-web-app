'use strict';
import models from 'src/db/models';

export default function Product(sequelize, DataTypes) {
  const productModel = sequelize.define('product', {
    name: DataTypes.TEXT,
    brand: DataTypes.TEXT,
    barcodeValue: DataTypes.TEXT,
    barcodeType: DataTypes.TEXT,
    servingSize: DataTypes.TEXT,
    servingsPerContainer: DataTypes.TEXT,
    calories: DataTypes.TEXT,
    totalFat: DataTypes.TEXT,
    saturatedFat: DataTypes.TEXT,
    transFat: DataTypes.TEXT,
    cholesterol: DataTypes.TEXT,
    sodium: DataTypes.TEXT,
    totalCarbs: DataTypes.TEXT,
    dietaryFiber: DataTypes.TEXT,
    totalSugars: DataTypes.TEXT,
    addedSugars: DataTypes.TEXT,
    protein: DataTypes.TEXT,
    vitaminA: DataTypes.TEXT,
    vitaminC: DataTypes.TEXT,
    calcium: DataTypes.TEXT,
    iron: DataTypes.TEXT,
    dataInputStatus: DataTypes.TEXT
  }, {});

  productModel.associate = function(models) {
    productModel.belongsToMany(models.ingredient, { through: models.productIngredient });
  };

  productModel.createWithRelations = async ({ data }) => {
    let transaction;
    const ingredientModel = models.ingredient;
    const productIngredientModel = models.productIngredient;
    const { ingredients } = data;
    const existingIngredients = await ingredientModel.getExistingIngredients({
      ingredients
    });
    const nonExistantIngredients = ingredientModel.determineNewIngredients({
      ingredients, existingIngredients
    });

    try {
      transaction = await sequelize.transaction();
      const newIngredients = await ingredientModel.createNewIngredients({
        ingredients: nonExistantIngredients, transaction
      });
      let newProduct = await productModel.create(data, { transaction });
      newProduct = newProduct.get({ raw: true });
      const productIngredients = [...existingIngredients, ...newIngredients].map(i => {
        return { ingredientId: i.id, productId: newProduct.id };
      });
      await productIngredientModel.bulkCreate(productIngredients, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
    }
  };

  return productModel;
};
