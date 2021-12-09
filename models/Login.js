const {Sequelize} = require("sequelize")
const db = require("../db")

const LoginModel = db.define("logins", {

  username: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

LoginModel.sync({force: false}).then(() => {
  console.log("Login table created successfully")
}).catch(err => {
  console.log("Login has already been created" + err)
})

module.exports = LoginModel;