#!/usr/bin/env python3

import json

with open("dataset.json", "r", encoding='utf-8') as file:
	data = json.load(file)



def process_entry(entry, modalidades):
	nome_pessoa = entry["nome"]

	for desporto_pessoa in entry["desportos"]:
		adicionado = False
		# ver se essa modalidade ja existe, dar append se sim
		for modalidade in modalidades:
			if modalidade["desporto"] == desporto_pessoa:
				# append
				modalidade["pessoas"].append(nome_pessoa)
				adicionado = True
				break

		if adicionado == False:
			# criar nova entrada
			modalidade = {
				"desporto": desporto_pessoa,
				"pessoas": [
					nome_pessoa
				]
			}
			modalidades.append(modalidade)


modalidades = [] # list of dicts

for entry in data.get("pessoas", []):
	process_entry(entry, modalidades)

with open("dataset_modalidades.json", "w", encoding='utf-8') as file:
	for modalidade in modalidades:
		json.dump(modalidade, file, ensure_ascii=False, indent=4)
