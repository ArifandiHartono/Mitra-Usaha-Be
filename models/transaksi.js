'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  transaksi.init({
    tanggal: DataTypes.DATE,
    invoice: DataTypes.STRING,
    total: DataTypes.DECIMAL,
    pembayaran: DataTypes.DECIMAL,
    kembalian: DataTypes.DECIMAL,
    banyak_item: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'transaksi',
  });
  return transaksi;
};