var mongoose = require('mongoose')

var batismoSchema = new mongoose.Schema({
    _id : String,
    date : String,
    title :String,
    ref: String,
    href : String,
    pai: String,
    mãe: String
})

module.exports = mongoose.model('batismo', batismoSchema)