const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('heroku_e27246f552cf39b', 'b73be7f80e548e', '61138a22', {
    host: 'us-cdbr-east-04.cleardb.com',
    dialect: 'mysql'
    
});

sequelize
.authenticate()
.then(()=>console.log("Sequelize OK"))
.catch(()=>console.log("Erro"))

sequelize.sync()

module.exports = sequelize