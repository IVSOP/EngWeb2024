var express = require('express');
var router = express.Router();
var Modalidade = require("../controllers/modalidade")
var Pessoa = require('../controllers/pessoa')

router.get('/', function(req, res, next) {
	Modalidade.list()
	.then(data => {
		res.jsonp(data)
	})
	.catch(erro => {
		res.jsonp(erro)
	})
});

router.get('/:modalidade', function(req, res, next) {
	Modalidade.findPessoasByDesporto(req.params.modalidade)
	.then(data => {
		if (data.length > 0) { // depois de receber os dados, ir construir os objetos das pessoas
			var final = []
			// EXTREMAMENTE CURSED sem isto o async dava cabo de tudo
			const promises = data[0].pessoas.map(async (nome_pessoa) => {
				return Pessoa.findByName(nome_pessoa)
				.then(pessoa => {
					final.push(pessoa[0])
				})
				.catch(erro => {
					console.log(erro)
					res.jsonp(erro)
				})
			})

			// EXTREMAMENTE CURSED sem isto o async dava cabo de tudo
			Promise.all(promises)
			.then(() => {
				final.sort((first, second) => {
					return second.nome.localeCompare(first.price)
				})
				res.jsonp(final)
			})
			.catch(erro => {
				console.log(erro);
				res.jsonp(erro);
			});
		}
	})
	.catch(erro => {
		console.log(erro)
		res.jsonp(erro)
	})
});

// router.post('/', function(req, res, next) {
// 	console.log(req.body)
// 	Modalidade.insert(req.body)
// 	.then(data => {
// 		res.jsonp(data)
// 	})
// 	.catch(erro => {
// 		res.jsonp(erro)
// 	})
// });

// router.put('/:desporto', function(req, res, next) {
// 	Modalidade.updateModalidade(req.params.desporto, req.body)
// 	.then(data => {
// 		res.jsonp(data)
// 	})
// 	.catch(erro => {
// 		res.jsonp(erro)
// 	})
// })

// router.delete('/:desporto', function(req, res, next) {
// 	Modalidade.deleteByDesporto(req.params.desporto)
// 	.then(data => {
// 		res.jsonp(data)
// 	})
// 	.catch(erro => {
// 		res.jsonp(erro)
// 	})
// })

module.exports = router;