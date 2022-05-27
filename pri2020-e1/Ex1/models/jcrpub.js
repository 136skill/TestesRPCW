var mongoose = require('mongoose')

var pubSchema = new mongoose.Schema({
    type: String,
    id : String,
    authors : [String],
    title : String,
    booktitle : String,
    address : String,
    year : String,
    month : String,
    doi : String,
    isbn : String,
    issn : String,
    volume : String,
    publisher: String

})


module.exports = mongoose.model('pub', pubSchema)