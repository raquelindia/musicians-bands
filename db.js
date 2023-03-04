const path = require('path');
const { Sequelize, Model } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage:  'db.sqlite'
});
// TODO - create the new sequelize connection

module.exports = {
    sequelize,
    Sequelize
};
