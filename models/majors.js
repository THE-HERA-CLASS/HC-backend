'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Majors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Majors.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Majors',
    }
  );
  return Majors;
};
