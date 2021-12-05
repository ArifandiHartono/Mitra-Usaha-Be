'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  barang.init({
    nama: DataTypes.STRING,
    stok: DataTypes.INTEGER,
    harga: DataTypes.DECIMAL,
    minimal_stok: DataTypes.INTEGER,
    id_kategori: DataTypes.INTEGER,
    kode: DataTypes.STRING,
    foto:DataTypes.STRING,
    is_delete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'barang',
  });
  return barang;
};