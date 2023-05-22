'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Questions.init(
    {
      exam_id: DataTypes.INTEGER,
      sort_num: DataTypes.INTEGER,
      question_num: DataTypes.INTEGER,
      question: DataTypes.TEXT,
      example: DataTypes.TEXT,
      choice: DataTypes.TEXT,
      answer: DataTypes.STRING,
      solve: DataTypes.TEXT,
      bookmark_count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Questions',
    }
  );
  return Questions;
};
