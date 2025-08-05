const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const UserPreference = sequelize.define('UserPreference', {
  sources: {
    type: DataTypes.JSON, // e.g. ["BBC", "CNN"]
  },
  categories: {
    type: DataTypes.JSON, // e.g. ["Politics", "Sports"]
  },
  authors: {
    type: DataTypes.JSON, // e.g. ["John Doe", "Jane Smith"]
  },
}, {
  timestamps: true,
});

UserPreference.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(UserPreference, { foreignKey: 'userId' });

module.exports = UserPreference;
