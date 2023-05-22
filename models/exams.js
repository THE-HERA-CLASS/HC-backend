'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Exams.init({
    major_id: DataTypes.INTEGER,
    major_name: DataTypes.STRING,
    certificate_id: DataTypes.INTEGER,
    certificate_name: DataTypes.STRING,
    certificate_division: DataTypes.STRING,
    subject_id: DataTypes.INTEGER,
    subject_name: DataTypes.STRING,
    examinfo_id: DataTypes.INTEGER,
    examinfo_year: DataTypes.INTEGER,
    examinfo_round: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Exams',
  });
  return Exams;
};