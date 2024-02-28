var http = require('http')
var fs = require('fs')
var url = require('url')
var axios = require('axios')

function getGenerosFilme(filme) {
	if (filme.genres.length == 0) {
		return ""
	} else {
		ret = `
					<li>
						Generos:
						<ul class="w3-ul">
		`
		filme.genres.forEach(genero => {
			ret += `
							<li>
								<a href="/generos/${genero._id}">${genero.nome}</a>
							</li>
			`
		});
		ret += `
						</ul>
					</li>`
		return ret
	}
}

function getAtoresFilme(filme) {
	if (filme.cast.length == 0) {
		return ""
	} else {
		ret = `
					<li>
						Atores:
						<ul class="w3-ul">
		`
		filme.cast.forEach(ator => {
			ret += `
							<li>
								<a href="/atores/${ator._id}">${ator.nome}</a>
							</li>
			`
		});
		ret += `
						</ul>
					</li>`
		return ret
	}
}

function filmesIndex(filmes) {
    pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Lista de filmes</title>
        <link rel="stylesheet" href="/w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">

            <header class="w3-container w3-teal">
              <h1>Lista de filmes</h1>
            </header>
            
            <div class="w3-container">
				<ul class="w3-ul">`
	filmes.forEach( filme => {
		pagHTML += `
					<ul class="w3-ul">
						<li>
							<a href="${"filmes/" + filme._id}">Titulo: ${filme.title}</a>
						</li>
					</ul>`
	});
				
    pagHTML += `
				</ul>
            </div>
            
            <footer class="w3-container w3-teal">
              <h5>Generated by EngWeb2024::TPC3</h5>
            </footer>
            
        </div>
    </body>
</html>`
    return pagHTML
}

function filmeInfo(filmes) {

	// dados vem em lista
	if (filmes.length == 0) {
		return "erro, filme nao encontrado"
	}
	else filme = filmes[0]

    pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Lista de filmes: ${filme.title}</title>
        <link rel="stylesheet" href="/w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">

            <header class="w3-container w3-teal">
              <h1>Filme: ${filme.title}</h1>
            </header>
            
            <div class="w3-container">
				<ul class="w3-ul">
					${getGenerosFilme(filme)}
					${getAtoresFilme(filme)}
				</ul>
            </div>
            <footer class="w3-container w3-teal">
              <h5>Generated by EngWeb2024::TPC3</h5>
            </footer>
            
        </div>
    </body>
</html>`
    return pagHTML
}

function generosIndex(generos) {
	pagHTML = `
<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title>Lista de filmes</title>
			<link rel="stylesheet" href="/w3.css"/>
		</head>
		<body>
			<div class="w3-card-4">
	
				<header class="w3-container w3-teal">
				  <h1>Lista de filmes</h1>
				</header>
				
				<div class="w3-container">
					<ul class="w3-ul">`
		generos.forEach( genero => {
			pagHTML += `
						<li>
							<a href="${"generos/" + genero._id}">Nome: ${genero.nome}</a>
						</li>`
		});
					
		pagHTML += `
					</ul>
				</div>
				
				<footer class="w3-container w3-teal">
				  <h5>Generated by EngWeb2024::TPC3</h5>
				</footer>
				
			</div>
		</body>
	</html>`
	return pagHTML
}

function generoInfo(generos) {

	// dados vem em lista
	if (generos.length == 0) {
		return "erro, filme nao encontrado"
	}
	else genero = generos[0]

    pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Genero: ${genero.nome}</title>
        <link rel="stylesheet" href="/w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">

            <header class="w3-container w3-teal">
              <h1>Genero: ${genero.nome}</h1>
            </header>

            <div class="w3-container">
				Filmes com este genero:
				<ul class="w3-ul">`
	genero.filmes.forEach( filme => {
		pagHTML += `
					<li>
						<a href="/filmes/${filme._id}">${filme.nome}</a>
					</li>`
	});
	pagHTML +=`
				</ul>
            </div>
            <footer class="w3-container w3-teal">
              <h5>Generated by EngWeb2024::TPC3</h5>
            </footer>
            
        </div>
    </body>
</html>`
    return pagHTML
}


function atoresIndex(atores) {
	pagHTML = `
<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title>Lista de filmes</title>
			<link rel="stylesheet" href="/w3.css"/>
		</head>
		<body>
			<div class="w3-card-4">
	
				<header class="w3-container w3-teal">
					<h1>Lista de filmes</h1>
				</header>
				
				<div class="w3-container">
					<ul class="w3-ul">`
		atores.forEach( ator => {
			pagHTML += `
						<li>
							<a href="${"atores/" + ator._id}">Nome: ${ator.nome}</a>
						</li>`
		});
					
		pagHTML += `
					</ul>
				</div>
				
				<footer class="w3-container w3-teal">
					<h5>Generated by EngWeb2024::TPC3</h5>
				</footer>
				
			</div>
		</body>
	</html>`
	return pagHTML
}

function atorInfo(atores) {

	// dados vem em lista
	if (atores.length == 0) {
		return "erro, filme nao encontrado"
	}
	else ator = atores[0]

    pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Ator: ${ator.nome}</title>
        <link rel="stylesheet" href="/w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">

            <header class="w3-container w3-teal">
              <h1>Ator: ${ator.nome}</h1>
            </header>

            <div class="w3-container">
				Filmes em que participou:
				<ul class="w3-ul">`
	ator.filmes.forEach( filme => {
		pagHTML += `
					<li>
						<a href="/filmes/${filme._id}">${filme.nome}</a>
					</li>`
	});
	pagHTML +=`
				</ul>
            </div>
            <footer class="w3-container w3-teal">
              <h5>Generated by EngWeb2024::TPC3</h5>
            </footer>
            
        </div>
    </body>
</html>`
    return pagHTML
}

function mainIndex() {
	return `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>Indice principal</title>
		<link rel="stylesheet" href="/w3.css"/>
	</head>
	<body>
		<div class="w3-card-4">

			<header class="w3-container w3-teal">
				<h1>Indice principal</h1>
			</header>

			<div class="w3-container">
				<ul class="w3-ul">
					<li>
						<a href="/filmes">Filmes</a>
					</li>
					<li>
						<a href="/generos">Generos</a>
					</li>
					<li>
						<a href="/atores">Atores</a>
					</li>
				</ul>
			</div>
			<footer class="w3-container w3-teal">
				<h5>Generated by EngWeb2024::TPC3</h5>
			</footer>
			
		</div>
	</body>
</html>`
	
}

http.createServer(function (req, res) {
    var q = url.parse( req.url, true)

	const filmes_re = /^\/filmes\/[0-9a-zA-Z]+$/
	const generos_re = /^\/generos\/[0-9a-zA-Z]+$/
	const atores_re = /^\/atores\/[0-9a-zA-Z]+$/

	if (q.pathname == '/'){
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(mainIndex())
			res.end()
    } else if (q.pathname == '/filmes'){
        axios.get('http://localhost:3000/filmes')
            .then( (resp) => {
                dados = resp.data
                pagHTML = filmesIndex(dados)
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(pagHTML)
                res.end()
            })
            .catch((erro) => {
                res.writeHead(500, {'Content-Type': 'text/html'})
                res.write("<pre>Erro: " + erro + "</pre>")
                res.end()
            })
    } else if (q.pathname == '/generos'){
        axios.get('http://localhost:3001/generos')
            .then( (resp) => {
                dados = resp.data
                pagHTML = generosIndex(dados)
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(pagHTML)
                res.end()
            })
            .catch((erro) => {
                res.writeHead(500, {'Content-Type': 'text/html'})
                res.write("<pre>Erro: " + erro + "</pre>")
                res.end()
            })
	} else if (q.pathname == '/atores'){
		axios.get('http://localhost:3002/atores')
			.then( (resp) => {
				dados = resp.data
				pagHTML = atoresIndex(dados)
				res.writeHead(200, {'Content-Type': 'text/html'})
				res.write(pagHTML)
				res.end()
			})
			.catch((erro) => {
				res.writeHead(500, {'Content-Type': 'text/html'})
				res.write("<pre>Erro: " + erro + "</pre>")
				res.end()
			})
	} else if(q.pathname == '/w3.css'){
        fs.readFile('pages/w3.css', (erro, dados) => {
            res.writeHead(200, {'Content-Type': 'text/css'})
            res.write(dados)
            res.end()
        })
    } else if (filmes_re.test(q.pathname)) {
		idFilme = q.pathname.substring(8)
		axios.get('http://localhost:3000/filmes?_id=' + idFilme)
		.then( (resp) => {
			dados = resp.data
			pagHTML = filmeInfo(dados)
			res.writeHead(200, {'Content-Type': 'text/html'})
			res.write(pagHTML)
			res.end()
		})
		.catch((erro) => {
			res.writeHead(500, {'Content-Type': 'text/html'})
			res.write("<pre>Erro: " + erro + "</pre>")
			res.end()
		})
	} else if (generos_re.test(q.pathname)) {
		idGenero = q.pathname.substring(9)
		axios.get('http://localhost:3001/generos?_id=' + idGenero)
		.then( (resp) => {
			dados = resp.data
			pagHTML = generoInfo(dados)
			res.writeHead(200, {'Content-Type': 'text/html'})
			res.write(pagHTML)
			res.end()
		})
		.catch((erro) => {
			res.writeHead(500, {'Content-Type': 'text/html'})
			res.write("<pre>Erro: " + erro + "</pre>")
			res.end()
		})
	} else if (atores_re.test(q.pathname)) {
		idAtor = q.pathname.substring(8)
		axios.get('http://localhost:3002/atores?_id=' + idAtor)
		.then( (resp) => {
			dados = resp.data
			pagHTML = atorInfo(dados)
			res.writeHead(200, {'Content-Type': 'text/html'})
			res.write(pagHTML)
			res.end()
		})
		.catch((erro) => {
			res.writeHead(500, {'Content-Type': 'text/html'})
			res.write("<pre>Erro: " + erro + "</pre>")
			res.end()
		})
	} else {
        res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'})
        res.write('<p>Erro: pedido não suportado.</p>')
        res.write('<pre>' + q.pathname + '</pre>')
        res.end()
    }
    console.log(q.pathname)
}).listen(7777)
