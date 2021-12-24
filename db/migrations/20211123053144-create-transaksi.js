'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transaksis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tanggal: {
        type: Sequelize.DATE
      },
      invoice: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.DECIMAL
      },
      pembayaran: {
        type: Sequelize.DECIMAL
      },
      kembalian: {
        type: Sequelize.DECIMAL
      },
      banyak_item: {
        type: Sequelize.FLOAT
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transaksis');
  }
};