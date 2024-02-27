#!/usr/bin/env python3

import json

with open("ficheiros/filmes.json", "r", encoding='utf-8') as file:
	data = json.load(file)

# genero json tem nome: "" filmes: [] (lista dos ids)
def process_a(a_name, entry, atores):
	# isto esta extremamente roto mas e assim a vida
	for a_entry in atores:
		if a_name == a_entry["nome"]:
			# nome igual, dar append da informacao
			a_entry["filmes"].append({
				"_id": entry["_id"]["$oid"],
				"nome": entry["title"]
			})
			return

	# else de engenheiro, deu return em cima
	# nome nao encontrado, criar nova entrada
	new_a = {
		"nome": a_name,
		"filmes": [
			{
				"_id": entry["_id"]["$oid"],
				"nome": entry["title"]
			}
		]
	}

	atores.append(new_a)


atores = [] # list of dicts

for entry in data.get("filmes", []):
	for a_name in entry.get("cast", []):
		process_a(a_name, entry, atores)

current_id = 0

for a in atores:
	a["_id"] = current_id
	current_id += 1

with open("ficheiros/atores.json", "w", encoding='utf-8') as file:
	json.dump(atores, file, ensure_ascii=False, indent=4)
