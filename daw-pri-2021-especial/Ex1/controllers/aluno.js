var Aluno =  require('../models/aluno')


module.exports.listar = () => {
    return Aluno.find().sort({curso:1}).exec()
}

module.exports.listarProg = () => {
    return Aluno.find().sort().exec()
}

module.exports.listarTPC = () => {
    return Aluno.find({},{idAluno:1, nome:1, tpc:1}).sort().exec()
}


module.exports.lookUp = id => {
    return Aluno.findOne({idAluno : id}).exec()
}

module.exports.listarPorNome = n => {
    var nome = new RegExp(n,'i')
    return Aluno.find({title: nome}).exec()
}

module.exports.listarPorCurso = a => {
    var cur = new RegExp(a)
    return Aluno.find({curso: cur},{nome: 1}).sort({nome:1}).exec()
}

module.exports.listarRecurso = () => {
    return Aluno.find({},{exames:1, nome: 1}).sort({nome:1}).exec()
}



module.exports.insert = aluno => {
    var newAluno = new Aluno(aluno)
    return newAluno.save()
}