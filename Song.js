const {Sequelize, sequelize} = require('./db');

let Song = sequelize.define('song', {
    title: Sequelize.toString,
    year: Sequelize.INTEGER
});

module.exports = {
    Song
};