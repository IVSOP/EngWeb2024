var express = require('express');
var router = express.Router();
var Pessoa = require("../controllers/pessoa")

router.get('/', function(req, res, next) {
	Pessoa.list()
	.then(data => {
		res.jsonp(data)
	})
	.catch(erro => {
		res.jsonp(erro)
	})
});

router.get('/:nome', function(req, res, next) {
	Pessoa.findByName(req.params.nome)
	.then(data => {
		res.jsonp(data)
	})
	.catch(erro => {
		res.jsonp(erro)
	})
});

router.post('/', function(req, res, next) {
	console.log(req.body)
	Pessoa.insert(req.body)
	.then(data => {
		res.jsonp(data)
	})
	.catch(erro => {
		res.jsonp(erro)
	})
});

router.put('/:nome', function(req, res, next) {
	Pessoa.updatePessoa(req.params.nome, req.body)
	.then(data => {
		res.jsonp(data)
	})
	.catch(erro => {
		res.jsonp(erro)
	})
})

router.delete('/:nome', function(req, res, next) {
	Pessoa.deleteByName(req.params.nome)
	.then(data => {
		res.jsonp(data)
	})
	.catch(erro => {
		res.jsonp(erro)
	})
})

module.exports = router;