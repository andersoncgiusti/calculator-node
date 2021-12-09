//conections db
const {Sequelize} = require('sequelize');
const connection = new Sequelize('calculator', 'root', '@Python123', {dialect: 'mysql', host: 'localhost'});
 
module.exports = connection;