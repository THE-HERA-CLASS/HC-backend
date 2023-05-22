'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Examinfos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Examinfos.init(
    {
      year: DataTypes.INTEGER,
      round: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Examinfos',
    }
  );
  return Examinfos;
};
