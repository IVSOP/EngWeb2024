#!/usr/bin/env python3

import os, xml.etree.ElementTree as ET, glob

diretoria_dados = "MapaRuas-materialBase/"

files = os.listdir(diretoria_dados + "texto")

files.sort()

def parse_xml(file_path):
    tree = ET.parse(file_path)
    root = tree.getroot()

    return root

def get_text(element):
    text = element.text or ''
    for sub_element in element:
        text += get_text(sub_element)
        text += sub_element.tail or ''
    return text


								# <div class="w3-card-4">
								# 	<img src="../imagem/MRB-01-RuaDoCampo-nascente.PNG" class="w3-container image">
								# 	<hr>
								# 	<img src="../MapaRuas-materialBase/atual/1-RuadoCampo-Vista1.JPG" class="w3-container image"/>
								# 	<div class="w3-container w3-center">
								# 	  <p>Rua do Campo - vista nascente.</p>
								# 	</div>
								# </div>
def generateImagens(imagens):
	res = ""
	for imagem in imagens:
		if imagem[2] is not None:
			res += f"""
							<div class="w3-card-4">
								<img src="{imagem[0]}" class="w3-container image">
								<img src="{imagem[2]}" class="w3-container image"/>
								<hr>
								<div class="w3-container w3-center">
									<p>{imagem[1]}</p>
								</div>
							</div>
			"""
		else:
			res += f"""
							<div class="w3-card-4">
								<img src="{imagem[0]}" class="w3-container image">
								<img src="{imagem[2]}" class="w3-container image"/>
							</div>
			"""
            
	return res

						# <p>
						# 	A <lugar>rua do Campo</lugar> é um troço da actual <lugar>rua D. Frei Caetano Brandao</lugar>, entre a <lugar>rua D. Diogo de Sousa</lugar> e o <lugar>largo Conselheiro Torres e Almeida</lugar>, 
						# 	tendo recebido esta designação na sessão da Câmara de <data>28.07.1890</data>.
						# </p>
def generatePara(paragrafos):
	res = ""
	for para in paragrafos:
		res += f"""
						<p>
							{get_text(para)}
						</p>
		"""
	return res

						# <tr>
						# 	<td>1</td>
						# 	<td>Domingos Dias</td>
						# 	<td>620 reis e galinhas</td>
						# 	<td>
						# 		<p>
						# 			Desde o ano de 1719 que os nº 1 e 2 se encontravam unidos. A frontaria que dá para a Rua Nova de Sousa corresponde ao nº15 da dita rua e é foreira à comenda de São Pedro de Merelim.
						# 		</p>
						# 	</td>
						# </tr>
def generateCasas(casas):
	res = ""
	for casa in casas:
		res += f"""
						<tr>
							<td>{casa["número"]}</td>
							<td>{casa["enfiteuta"]}</td>
							<td>{casa["foro"]}</td>
							<td>
		"""

		for para in casa["desc"]: # fazer isto nao ficar centrado como?????????????????????
			res += f"""
								<p>{para}</p>	
			"""

		res += """
							</td>
						</tr>
		"""
	
	return res


def getImagensAtuais(figuras, numero):

	todas_atuais = glob.glob(diretoria_dados + "atual/" + numero + "-*")
	todas_atuais.sort()
	imagens = []
	i = 0
	for figura in figuras:
		try:
			imagens.append((figura[0], figura[1], "../" + todas_atuais[i]))
		except IndexError:
			imagens.append((figura[0], figura[1], None))
		finally:
			i += 1

	return imagens

for file in files:
	file_path = os.path.join(diretoria_dados + "texto", file)
	with open(file_path, 'r') as f:

		tree = parse_xml(file_path)

		nome = tree.find(".//nome").text.strip() # alguns tinham espacos a esquerda
		numero = tree.find(".//número").text.strip()

		print(f"a processar {numero}")

		figuras = []
		for fig in tree.findall(".//corpo//figura"):
			path_antiga = fig.find(".//imagem").attrib.get("path")
			legenda = fig.find(".//legenda").text
			figuras.append((path_antiga, legenda))
		
		imagens = getImagensAtuais(figuras, numero)
		
		# print(figuras)
		paragrafos = tree.findall(".//corpo/para")
		# for para in paragrafos:
		# 	print(get_text(para))

		casas = []
		for casa in tree.findall(".//lista-casas/casa"):
			numero_casa = casa.find(".//número")
			enfiteuta = casa.find(".//enfiteuta")
			foro = casa.find(".//foro")

			casadict = {
				"número" : numero_casa.text if numero_casa is not None else "N/A",
				"enfiteuta" : enfiteuta.text if enfiteuta is not None else "N/A",
				"foro" : foro.text if foro is not None else "N/A",
				"desc" : []
			}

			for para in casa.findall(".//desc/para"):
				casadict["desc"].append(get_text(para))
			casas.append(casadict)


		f.close()

		preHTML = f"""
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<title>Lista de ruas de Braga: {nome}</title>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<link rel="stylesheet" href="w3.css">
				<link rel="stylesheet" href="custom.css">
			</head>

			<body>

				<div class="w3-card-4">

					<header class="w3-container w3-purple">
						<h3>Lista de ruas de Braga: {nome}</h3>
					</header>
					<div class="w3-container">
						<div class="w3-container w3-center all-image-div">
							<div class="image-div">
		"""

		imagensHTML = generateImagens(imagens)

		imagensHTML += """
							</div>
						</div>
		"""

		paraHTML = generatePara(paragrafos)

		casaspreHTML = f"""
					</div>
					<table class="w3-table-all w3-card-4">
						<tr>
							<th>Número</th>
							<th>Enfiteuta</th>
							<th>Foro</th>
							<th>Descrição</th>
						</tr>
		"""

		casasHTML = generateCasas(casas)

		postHTML = """
					</table>

					<footer class="w3-container w3-purple">
						<h5>Generated by MRBApp::EngWeb2024::A100538</h5>
					</footer>
				</div>
			</body>
		</html>
		"""
            


		pagHTML = preHTML + imagensHTML + paraHTML + casaspreHTML + casasHTML + postHTML

		outFile = open(f"./pages/mrb{numero}.html", "w")
		outFile.write(pagHTML)
		outFile.close()
