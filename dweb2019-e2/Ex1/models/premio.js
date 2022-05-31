var mongoose = require('mongoose')

var premioSchema = new mongoose.Schema({
    year: String,
    category: String,
    overallMotivation : String,
    laureates: [
        {
            id: String,
            firstname: String,
            surname: String,
            motivation: String,
            share: String
        }
    ]
})


module.exports = mongoose.model('premio', premioSchema)