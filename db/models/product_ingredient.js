'use strict';
export default function ProductIngredient(sequelize, DataTypes) {
  const productIngredientModel = sequelize.define('productIngredient', {
    productId: DataTypes.INTEGER,
    ingredientId: DataTypes.INTEGER
  }, {});
  productIngredientModel.associate = function(models) {

  };

  return productIngredientModel;
};
