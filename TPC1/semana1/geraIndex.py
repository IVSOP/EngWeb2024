#!/usr/bin/env python3

import json

file = open("emd.json", "r")
bd = json.load(file)
file.close()

# sort por datas
def chaveOrd(emd): # chave usada como ordenacao, != funcde compare
	return emd["dataEMD"]

bd.sort(reverse=True, key=chaveOrd)

preHTML = """
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Lista de Exames Medicos Desportivos</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="w3.css">
		<title>Document</title>
	</head>

	<body>

		<div class="w3-card-4">

			<header class="w3-container w3-purple">
				<h3>Lista de Exames Medicos Desportivos</h3>
			</header>

			<div class="w3-container">
				<ul class="w3-ul w3-card-4" style="width:50%">
"""	

posHTML = """
				</ul>
			</div>

			<footer class="w3-container w3-purple">
				<h5>Generated by EMDApp::EngWeb2024::A100538</h5>
			</footer>
		</div>
	</body>
</html>
"""



conteudoHTML = ""

for e in bd:
	conteudoHTML += f"""
					<li>
						<a href="emd{e["index"]}.html">{e["dataEMD"]}: {e["nome"]["primeiro"]} {e["nome"]["último"]}</a>
					</li>
"""

pagHTML = preHTML + conteudoHTML + posHTML

outFile = open("./emdSite/index.html", "w")
outFile.write(pagHTML)
outFile.close()
