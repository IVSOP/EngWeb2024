var express = require('express');
var router = express.Router();
var Periodo = require("../controllers/periodo")

router.get('/', function(req, res, next) {
	Periodo.list()
	.then(data => {
		res.jsonp(data)
	})
	.catch(erro => {
		res.jsonp(erro)
	})
});

router.get('/:id', function(req, res, next) {
	Periodo.findById(req.params.id)
	.then(data => {
		console.log(data)
		res.jsonp(data)
	})
	.catch(erro => {
		res.jsonp(erro)
	})
});

router.post('/', function(req, res, next) {
	Periodo.insert(req.body)
	.then(data => {
		res.jsonp(data)
	})
	.catch(erro => {
		res.jsonp(erro)
	})
});

router.put('/:id', function(req, res, next) {
	Periodo.updatePeriodo(req.params.id, req.body)
	.then(data => {
		res.jsonp(data)
	})
	.catch(erro => {
		res.jsonp(erro)
	})
})

router.delete('/:id', function(req, res, next) {
	Periodo.deleteById(req.params.id)
	.then(data => {
		res.jsonp(data)
	})
	.catch(erro => {
		res.jsonp(erro)
	})
})

module.exports = router;
