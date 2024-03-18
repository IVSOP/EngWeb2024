var express = require('express');
var router = express.Router();
var Compositor = require("../controllers/compositor")

router.get('/', function(req, res, next) {
	Compositor.list()
	.then(data => {
		res.jsonp(data)
	})
	.catch(erro => {
		res.jsonp(erro)
	})
});

router.get('/:id', function(req, res, next) {
	Compositor.findById(req.params.id)
	.then(data => {
		res.jsonp(data)
	})
	.catch(erro => {
		res.jsonp(erro)
	})
});

router.post('/', function(req, res, next) {
	console.log(req.body)
	Compositor.insert(req.body)
	.then(data => {
		res.jsonp(data)
	})
	.catch(erro => {
		res.jsonp(erro)
	})
});

router.put('/:id', function(req, res, next) {
	Compositor.updateCompositor(req.params.id, req.body)
	.then(data => {
		res.jsonp(data)
	})
	.catch(erro => {
		res.jsonp(erro)
	})
})

router.delete('/:id', function(req, res, next) {
	Compositor.deleteById(req.params.id)
	.then(data => {
		res.jsonp(data)
	})
	.catch(erro => {
		res.jsonp(erro)
	})
})

module.exports = router;
