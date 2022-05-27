var mongoose = require('mongoose')

var compositorSchema = new mongoose.Schema({
    nome : String,
    bio :String,
    dataNasc: String,
    dataObito : String,
    periodo: String
})

module.exports = mongoose.model('compositore', compositorSchema)