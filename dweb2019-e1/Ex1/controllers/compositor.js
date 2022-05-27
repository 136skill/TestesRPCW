var Compositor =  require('../models/compositor')


module.exports.listar = () => {
    return Compositor.find({},{nome: 1, dataNasc: 1}).sort().exec()
}


module.exports.lookUp = id => {
    return Compositor.findOne({_id : id}).exec()
}

module.exports.listarPorNome = n => {
    var nome = new RegExp(n,'i')
    return Compositor.find({title: nome}).exec()
}

module.exports.listarPorPeriodo = a => {
    var p = new RegExp(a)
    return Compositor.find({periodo: p},{nome:1, periodo:1, dataNasc:1}).exec()
}

