const { DataTypes } = require('sequelize/types')
const sequelize = require('./index')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('categoria', {
        id: DataTypes.INTEGER,
        nome_categoria: DataTypes.STRING
    }, {
        timesstamps: false
    })
}

