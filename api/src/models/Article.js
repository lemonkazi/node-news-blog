const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Article = sequelize.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  summary: {
    type: DataTypes.TEXT,
  },
  content: {
    type: DataTypes.TEXT,
  },
  source: {
    type: DataTypes.STRING,
  },
  author: {
    type: DataTypes.STRING,
  },
  publishedAt: {
    type: DataTypes.DATE,
  },
  category: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

module.exports = Article;
