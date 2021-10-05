let sequelize = require('../model/index')
let Categoria = sequelize.import('../model/Categoria')

// module.exports = (req, res) => {
//     Categoria
//         .create(req.body)
//         .then(() => console.log('INSERT OK'))
// }


const categoria = await User.create({ id: 1, nome_categoria: "Camisetas" });
console.log("Jane's auto-generated ID:", categoria.id);