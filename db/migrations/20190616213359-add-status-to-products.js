'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'products',
      'dataInputStatus',
      Sequelize.TEXT,
      { defaultValue: 'incomplete' },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'products',
      'dataInputStatus'
    );
  }
};
