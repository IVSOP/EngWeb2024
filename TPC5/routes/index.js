var express = require('express');
var axios = require('axios')
var router = express.Router();

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.get('/compositores', function(req, res, next) {
	axios.get('http://localhost:3000/compositores')
	.then( (dados) => {
		res.render('compositores', { title: 'Lista de compositores', compositores: dados.data });
	}).catch( (erro) => {
		res.render("error", { error: erro })
	})
});

router.get('/compositores/create', function(req, res, next) {
	res.render('compositoresCreate', { title: 'Criar compositor' });
});

router.get('/compositores/:id/edit', function(req, res, next) {
	let id = req.params.id
	axios.get('http://localhost:3000/compositores?id=' + id)
	.then( (dados) => {
		res.render('compositoresEdit', { title: 'Editar compositor:' + id, compositor: dados.data[0] });
	}).catch( (erro) => {
		res.render("error", { error: erro })
	})
});

router.get('/compositores/:id/delete', function(req, res, next) {
	let id = req.params.id
	axios.delete('http://localhost:3000/compositores/' + id)
	.then( (dados) => {
		res.redirect('/compositores')
	}).catch( (erro) => {
		res.render("error", { error: erro })
	})
});

router.get('/compositores/:id', function(req, res, next) {
	let id = req.params.id
	axios.get('http://localhost:3000/compositores?id=' + id)
	.then( (dados) => {
		res.render('compositoresDetalhe', { title: 'Lista de compositores: ' + dados.data[0].nome, compositor: dados.data[0] });
	}).catch( (erro) => {
		res.render("error", { error: erro })
	})
});

router.get('/periodos', function(req, res, next) {
	axios.get('http://localhost:3000/periodos')
	.then( (dados) => {
		res.render('periodos', { title: 'Lista de periodos', periodos: dados.data });
	}).catch( (erro) => {
		res.render("error", { error: erro })
	})
});

router.get('/periodos/create', function(req, res, next) {
	res.render('periodosCreate', { title: 'Criar periodo' });
});

router.get('/periodos/:id/edit', function(req, res, next) {
	let id = req.params.id
	axios.get('http://localhost:3000/periodos?id=' + id)
	.then( (dados) => {
		res.render('periodosEdit', { title: 'Editar periodo:' + id, periodo: dados.data[0] });
	}).catch( (erro) => {
		res.render("error", { error: erro })
	})
});

router.get('/periodos/:id/delete', function(req, res, next) {
	let id = req.params.id
	axios.delete('http://localhost:3000/periodos/' + id)
	.then( (dados) => {
		res.redirect('/periodos')
	}).catch( (erro) => {
		res.render("error", { error: erro })
	})
});

router.get('/periodos/:id', function(req, res, next) {
	let id = req.params.id
	axios.get('http://localhost:3000/periodos?id=' + id)
	.then( (dados) => {
		res.render('periodosDetalhe', { title: 'Lista de periodos: ' + dados.data[0].nome, periodo: dados.data[0] });
	}).catch( (erro) => {
		res.render("error", { error: erro })
	})
});







router.post('/compositores/create', function(req, res, next) {
	axios.post('http://localhost:3000/compositores', req.body)
	.then( resp => {
		res.render("dadosInseridos", { title: 'Dados inseridos', dados: JSON.stringify(req.body)})
	})
	.catch( erro => {
		res.render("error", { error: erro })
	})
});

router.post('/compositores/edit', function(req, res, next) {
	// nome do periodo nao vai no form, tenho de ir ao json server
	axios.get('http://localhost:3000/periodos?id=' + req.body.periodo)
	.then( (resp) => {
		dados = resp.data
		periodo = dados[0]

		let compositor = {
			id: req.body.id,
			nome: req.body.nome,
			dataNasc: req.body.dataNasc,
			dataObito: req.body.dataObito,
			bio: req.body.bio,
			periodo: {
				id: periodo.id,
				nome: periodo.nome
			}
		}

		axios.put('http://localhost:3000/compositores/' + compositor.id, compositor)
		.then( resp => {
			res.render("dadosInseridos", { title: 'Dados inseridos', dados: JSON.stringify(compositor)})
		})
		.catch( erro => {
			res.render("error", { error: erro })
		})
	})
	.catch( erro => {
		res.render("error", { error: erro })
	})
});

router.post('/periodos/create', function(req, res, next) {
	axios.post('http://localhost:3000/periodos', req.body)
	.then( resp => {
		res.render("dadosInseridos", { title: 'Dados inseridos', dados: JSON.stringify(req.body)})
	})
	.catch( erro => {
		res.render("error", { error: erro })
	})
});

router.post('/periodos/edit', function(req, res, next) {
	// get da lista de compositores original
	axios.get('http://localhost:3000/periodos?id=' + req.body.id)
	.then( (dados) => {
		
		let periodo = {
			id: req.body.id,
			nome: req.body.nome,
			compositores: dados.data[0].compositores
		}
	
		axios.put('http://localhost:3000/periodos/' + periodo.id, periodo)
		.then( resp => {
			res.render("dadosInseridos", { title: 'Dados inseridos', dados: JSON.stringify(periodo)})
		})
		.catch( erro => {
			res.render("error", { error: erro })
		})
	}).catch((erro) => {
		res.render("error", { error: erro })
	})
});



/*
/compositores?periodo=<id>
*/

module.exports = router;
