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
    c: DataTypes.STRING,
    stok: DataTypes.FLOAT,
    harga: DataTypes.DECIMAL,
    minimal_stok: DataTypes.FLOAT,
    id_kategori: DataTypes.INTEGER,
    kode: DataTypes.STRING,
    kodeharga : DataTypes.STRING,
    foto:DataTypes.STRING,
    is_delete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'barang',
  });
  return barang;
};