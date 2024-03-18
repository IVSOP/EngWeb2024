var Periodo = require('../models/periodo')

module.exports.list = () => {
	return Periodo
		.find()
		.sort({nome: 1})
		.exec()
}

module.exports.findById = _id => {
	return Periodo
	// .findOne({id: _id})
		.find({id: _id.toString()}) // assim devolve lista
		.exec()
	// erro??????
}

module.exports.insert = periodo => {
	if (( Periodo.find( {id: periodo.id} )
		.exec()).length != 1) // se o id ja existe, nao podemos inserir
	{
		var newPeriodo = new Periodo(periodo)
		return newPeriodo.save()
	}
	// else erro???????
}

module.exports.updatePeriodo = (_id, periodo) => {
	if (_id == periodo.id) {
		return Periodo.updateOne({id: _id}, periodo)
	}
	// erro?????
}

module.exports.deleteById = (_id) => {
	return Periodo.deleteOne({id: _id})
	// erro?????
}
