var mongoose = require('mongoose')

var periodoSchema = new mongoose.Schema({
	nome: String,
	compositores: [
		{
			comp_nome: String,
			comp_id: String
		}
	],
	id: String
}, {versionKey: false, collection: 'periodo'}) // prevenir pluralization

module.exports = mongoose.model('periodo', periodoSchema)
