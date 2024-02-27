#!/usr/bin/env python3

import json

with open("ficheiros/filmes.json", "r", encoding='utf-8') as file:
	data = json.load(file)

# genero json tem nome: "" filmes: [] (lista dos ids)
def process_g(g_name, entry, generos):
	# isto esta extremamente roto mas e assim a vida
	for g_entry in generos:
		if g_name == g_entry["nome"]:
			# nome igual, dar append da informacao
			g_entry["filmes"].append({
				"_id": entry["_id"]["$oid"],
				"nome": entry["title"]
			})
			return

	# else de engenheiro, deu return em cima
	# nome nao encontrado, criar nova entrada
	new_g = {
		"nome": g_name,
		"filmes": [
			{
				"_id": entry["_id"]["$oid"],
				"nome": entry["title"]
			}
		]
	}

	generos.append(new_g)


generos = [] # list of dicts

for entry in data.get("filmes", []):
	for g_name in entry.get("genres", []):
		process_g(g_name, entry, generos)

current_id = 0

for g in generos:
	g["_id"] = current_id
	current_id += 1

with open("ficheiros/generos.json", "w", encoding='utf-8') as file:
	json.dump(generos, file, ensure_ascii=False, indent=4)
