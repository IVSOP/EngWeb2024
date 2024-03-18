var mongoose = require('mongoose')

var compositorSchema = new mongoose.Schema({
	id : String,
	nome: String,
	bio: String,
	dataNasc : String, // por simplicidade
	dataObito : String, // por simplicidade
	periodo: {
		nome: String,
		id: String
	}
}, {versionKey: false, collection: 'compositor'}) // prevenir pluralization

module.exports = mongoose.model('compositor', compositorSchema)
