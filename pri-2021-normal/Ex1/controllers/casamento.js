var Casamento =  require('../models/casamento')

module.exports.listar = () => {
    return Casamento.find({},{date: 1, title: 1, ref: 1}).sort().exec()
}


module.exports.lookUp = id => {
    return Casamento.findOne({_id : id}).exec()
}

module.exports.listarPorNome = n => {
    var nome = new RegExp(n,'i')
    return Casamento.find({title: nome}).exec()
}

module.exports.listarPorAno = a => {
    var ano = new RegExp(a)
    return Casamento.find({date: ano}).exec()
}

module.exports.insert = casamento => {
    var newCasamento = new Casamento(casamento)
    return newCasamento.save()
}