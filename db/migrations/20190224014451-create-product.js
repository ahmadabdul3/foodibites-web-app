'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.TEXT
      },
      brand: {
        type: Sequelize.TEXT
      },
      barcodeValue: {
        type: Sequelize.TEXT
      },
      barcodeType: {
        type: Sequelize.TEXT
      },
      servingSize: {
        type: Sequelize.TEXT
      },
      servingsPerContainer: {
        type: Sequelize.TEXT
      },
      calories: {
        type: Sequelize.TEXT
      },
      totalFat: {
        type: Sequelize.TEXT
      },
      saturatedFat: {
        type: Sequelize.TEXT
      },
      transFat: {
        type: Sequelize.TEXT
      },
      cholesterol: {
        type: Sequelize.TEXT
      },
      sodium: {
        type: Sequelize.TEXT
      },
      totalCarbs: {
        type: Sequelize.TEXT
      },
      dietaryFiber: {
        type: Sequelize.TEXT
      },
      totalSugars: {
        type: Sequelize.TEXT
      },
      addedSugars: {
        type: Sequelize.TEXT
      },
      protein: {
        type: Sequelize.TEXT
      },
      vitaminA: {
        type: Sequelize.TEXT
      },
      vitaminC: {
        type: Sequelize.TEXT
      },
      calcium: {
        type: Sequelize.TEXT
      },
      iron: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
};