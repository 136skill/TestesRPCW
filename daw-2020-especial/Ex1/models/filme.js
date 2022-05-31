var mongoose = require('mongoose')

var filmeSchema = new mongoose.Schema({
    _id:{
        $oid: String
    },
    title: String,
    year : Number,
    cast: [String],
    genres: [String]
    
})

module.exports = mongoose.model('filme', filmeSchema)