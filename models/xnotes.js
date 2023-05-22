'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Xnotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Xnotes.init(
    {
      user_id: DataTypes.INTEGER,
      exam_id: DataTypes.INTEGER,
      question_id: DataTypes.INTEGER,
      answer: DataTypes.STRING,
      marking: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Xnotes',
    }
  );
  return Xnotes;
};
