'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('barangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      harga: {
        type: Sequelize.DECIMAL
      }
      ,
      stok: {
        type: Sequelize.FLOAT
      },
      minimal_stok: {
        type: Sequelize.FLOAT
      },
      id_kategori: {
        type: Sequelize.INTEGER
      },
      kode: {
        type: Sequelize.STRING
      },
      kodeharga: {
        type: Sequelize.STRING
      },
      foto: {
        type: Sequelize.STRING
      },
      is_delete: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('barangs');
  }
};