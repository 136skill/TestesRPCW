var Filme =  require('../models/filme')


module.exports.listar = () => {
    return Filme.find({},{title: 1, genres:1, cast:1}).sort().exec()
}


module.exports.lookUp = id => {
    return Filme.findOne({_id : id}).exec()
}

module.exports.lookUp2 = id => {
    return Filme.find({_id : id},{title:1}).exec()
}

module.exports.listarPorNome = n => {
    var nome = new RegExp(n,'i')
    return Filme.find({title: nome}).exec()
}

module.exports.listarPorAno = a => {
    //var ano = new RegExp(a)
    return Filme.find({year: a},{genres:1, title:1, year:1}).exec()
}

