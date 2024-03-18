var Compositor = require('../models/compositor')

module.exports.list = () => {
	return Compositor
		.find()
		.sort({nome: 1})
		.exec()
}

module.exports.findById = _id => {
	return Compositor
	// .findOne({id: _id})
		.find({id: _id}) // assim devolve lista
		.exec()
	// erro??????
}

module.exports.insert = compositor => {
	if (( Compositor.find( {id: compositor.id} )
		.exec()).length != 1) // se o id ja existe, nao podemos inserir
	{
		var newCompositor = new Compositor(compositor)
		return newCompositor.save()
	}
	// else erro???????
}

module.exports.updateCompositor = (_id, compositor) => {
	if (_id == compositor.id) {
		return Compositor.updateOne({id: _id}, compositor)
	}
	// erro?????
}

module.exports.deleteById = (_id) => {
	return Compositor.deleteOne({id: _id})
	// erro?????
}
