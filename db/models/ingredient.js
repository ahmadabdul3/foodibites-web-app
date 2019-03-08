'use strict';
export default function Ingredient(sequelize, DataTypes) {
  const ingredientModel = sequelize.define('ingredient', {
    name: DataTypes.TEXT
  }, {});

  ingredientModel.associate = function(models) {

  };

  // - this method assumes ingredients is an array of strings
  ingredientModel.createNewIngredients = async ({
    ingredients, transaction, lowered = false
  }) => {
    if (!lowered) ingredients = lowerIngredients({ ingredients });

    const newIngredients = await ingredientModel.bulkCreate(ingredients, {
      transaction,
      returning: true,
      raw: true,
    });

    return newIngredients.map(i => i.get({ raw: true }));
  };

  ingredientModel.getExistingIngredients = async ({
    ingredients, lowered = false
  }) => {
    if (!lowered) ingredients = lowerIngredients({ ingredients });
    const ingredientStrings = ingredients.map(i => i.name);

    return await ingredientModel.findAll({
      where: { name: ingredientStrings },
      raw: true,
    });
  };

  ingredientModel.determineNewIngredients = ({
    ingredients, existingIngredients, lowered = false
  }) => {
    if (!lowered) ingredients = lowerIngredients({ ingredients });
    const existingIngredientsObject = existingIngredients.reduce((all, i) => {
      all[i.name] = i;
      return all;
    }, {});

    return ingredients.filter(i => !existingIngredientsObject[i.name]);
  };

  return ingredientModel;
};

function lowerIngredients({ ingredients }) {
  return ingredients.map(i => ({ name: i.name.toLowerCase() }));
}
