var Batismo =  require('../models/batismo')


//_id aparece por omissão
//primeiro {} seleciona por lina, o segundo pela coluna
module.exports.listar = () => {
    return Batismo.find({},{date: 1, title: 1, ref: 1}).sort().exec()
}

module.exports.listarProg = () => {
    return Batismo.find({},{pai: 1, mãe:1}).sort().exec()
}

//o find dá uma lista
//o findOne vem o objeto
module.exports.lookUp = id => {
    return Batismo.findOne({_id : id}).exec()
}

module.exports.listarPorNome = n => {
    var nome = new RegExp(n,'i')
    return Batismo.find({title: nome}).exec()
}

module.exports.listarPorAno = a => {
    var ano = new RegExp(a)
    return Batismo.find({date: ano}).exec()
}

module.exports.insert = batismo => {
    var newBatismo = new Batismo(batismo)
    return newBatismo.save()
}