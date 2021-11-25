'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item_transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  item_transaksi.init({
    id_barang: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
    total_harga: DataTypes.NUMBER,
    id_transaksi: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'item_transaksi',
  });
  return item_transaksi;
};