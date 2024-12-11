const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Log = sequelize.define('Log', {
  moodRating: { type: DataTypes.INTEGER, allowNull: false },
  anxietyLevel: { type: DataTypes.INTEGER, allowNull: false },
  sleepHours: { type: DataTypes.INTEGER, allowNull: false },
  sleepQuality: { type: DataTypes.STRING, allowNull: false },
  physicalActivity: { type: DataTypes.STRING, allowNull: false },
  socialInteraction: { type: DataTypes.STRING, allowNull: false },
  stressLevel: { type: DataTypes.INTEGER, allowNull: false },
  depressionSymptoms: { type: DataTypes.STRING, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
});

module.exports = Log;
