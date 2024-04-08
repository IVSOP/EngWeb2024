var Modalidade = require('../models/modalidade')

module.exports.list = () => {
	return Modalidade
		.find({}, {pessoas : 0}) // filtrar as pessoas
		.sort({desporto: 1})
		.exec()
}

module.exports.findByDesporto = desporto => {
	return Modalidade
	// .findOne({id: _id})
		.find({desporto: desporto}) // assim devolve lista
		.exec()
	// erro??????
}

module.exports.findPessoasByDesporto = desporto => {
	return Modalidade.find({desporto: desporto}).exec()
}

module.exports.insert = modalidade => {
	if (( Modalidade.find( {desporto: modalidade.desporto} )
		.exec()).length != 1) // se o id ja existe, nao podemos inserir
	{
		var newModalidade = new Modalidade(modalidade)
		return newModalidade.save()
	}
	// else erro???????
}

module.exports.updateModalidade = (desporto, modalidade) => {
	if (desporto == modalidade.desporto) {
		return Modalidade.updateOne({desporto: desporto}, modalidade)
	}
	// erro?????
}

module.exports.deleteByDesporto = (desporto) => {
	return Modalidade.deleteOne({desporto: desporto})
	// erro?????
}
