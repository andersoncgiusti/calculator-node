const {Sequelize} = require("sequelize")
const db = require("../db")
const LoginModel = require("./Login")

const ResultModel = db.define('result', {
  
  operation: {
    type: Sequelize.STRING,  
    allowNull: false
  },
  result: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
})
//relations 
ResultModel.belongsTo(LoginModel)
LoginModel.hasMany(ResultModel)

ResultModel.sync({force: false}).then(() => {
  console.log("Result table created result with successfully")
}).catch(err => {
  console.log("Result has already been created" + err)
})



module.exports = ResultModel;