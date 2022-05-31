var Premio =  require('../models/premio')

module.exports.listar = () => {
    return Premio.find().sort().exec()
}

module.exports.listar1 = () => {
    return Premio.find({},{year: 1, category:1}).sort().exec()
}

module.exports.listar2 = () => {
    return Premio.find({},{category:1}).sort().exec()
}


module.exports.lookUp = id => {
    return Premio.findOne({_id : id}).exec()
}

module.exports.listarPorNome = n => {
    var nome = new RegExp(n,'i')
    return Premio.find({title: nome}).exec()
}

module.exports.listarPorCategoria = n => {
    var nome = new RegExp(n)
    return Premio.find({category: nome}).exec()
}

module.exports.listarPorAno = a => {
    var ano = new RegExp(a)
    return Premio.find({date: ano}).exec()
}

