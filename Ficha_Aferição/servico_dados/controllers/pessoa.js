var Pessoa = require('../models/pessoa')

module.exports.list = () => {
	return Pessoa
		.find()
		.sort({nome: 1})
		.exec()
}

module.exports.findByName = name => {
	return Pessoa
	// .findOne({id: _id})
		.find({nome: name}) // assim devolve lista
		.exec()
	// erro??????
}

module.exports.insert = pessoa => {
	if (( Pessoa.find( {nome: pessoa.nome} )
		.exec()).length != 1) // se o id ja existe, nao podemos inserir
	{
		var newPessoa = new Pessoa(pessoa)
		return newPessoa.save()
	}
	// else erro???????
}

module.exports.updatePessoa = (nome, pessoa) => {
	if (nome == pessoa.nome) {
		return Pessoa.updateOne({nome: nome}, pessoa)
	}
	// erro?????
}

module.exports.deleteByName = (nome) => {
	return Pessoa.deleteOne({nome: nome})
	// erro?????
}
