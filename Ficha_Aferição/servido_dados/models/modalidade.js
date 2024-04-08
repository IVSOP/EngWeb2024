var mongoose = require('mongoose')

var modalidadeSchema = new mongoose.Schema({
	desporto: String,
	pessoas: [ String ]
}, {versionKey: false, collection: 'modalidade'}) // prevenir pluralization

module.exports = mongoose.model('modalidade', modalidadeSchema)
