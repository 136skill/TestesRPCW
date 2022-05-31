var Filme =  require('../models/filme')

module.exports.listar = () => {
    return Filme.find().sort().exec()
}

module.exports.listar1 = () => {
    return Filme.find({},{_id: 1, year: 1, title:1}).sort().exec()
}

module.exports.listar2 = () => {
    return Filme.find({},{cast:1, title:1}).sort().exec()
}

module.exports.listar3 = () => {
    return Filme.find({},{genres:1, title:1}).sort().exec()
}


module.exports.lookUp = id => {
    return Filme.findOne({_id : id}).exec()
}

module.exports.listarPorNome = n => {
    var nome = new RegExp(n,'i')
    return Filme.find({title: nome}).exec()
}

module.exports.listarPorCategoria = n => {
    var nome = new RegExp(n)
    return Filme.find({category: nome}).exec()
}

module.exports.listarPorAno = a => {
    var ano = new RegExp(a)
    return Filme.find({date: ano}).exec()
}