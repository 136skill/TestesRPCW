var Pub = require('../models/jcrpub')



module.exports.listar = () => {
    return Pub.find().sort().exec()
}

module.exports.listarAutores = () => {
    return Pub.find({},{authors:1}).sort().exec()
}

module.exports.listarAutoresP = () => {
    return Pub.find({},{authors:1, title:1}).sort().exec()
}

//o find dá uma lista
//o findOne vem o objeto
module.exports.lookUp = id => {
    return Pub.findOne({id : id}).exec()
}


module.exports.listarPorTipo = a => {
    var ti = new RegExp(a)
    return Pub.find({type: ti}).exec()
}

module.exports.insert = pub => {
    var newPub = new Pub(pub)
    return newPub.save()
}