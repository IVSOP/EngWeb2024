#!/usr/bin/env python3

import json

with open("compositores.json", "r", encoding='utf-8') as file:
	data = json.load(file)

def process_c(entry, periodos):
	nome_periodo = entry["periodo"]

	for periodo in periodos:
		# este periodo ja existe na lista, temos de dar append deste compositor (nome e id)
		if periodo["nome"] == nome_periodo:
			periodo["compositores"].append({
				"comp_nome": entry["nome"],
				"comp_id": entry["id"]
			})
			return

	# nao existe na lista, dar append
	periodos.append({
		"nome": nome_periodo,
		"compositores": [
			{
			"comp_nome": entry["nome"],
			"comp_id": entry["id"]
			}
		]
	})


periodos = [] # list of dicts

for entry in data.get("compositores", []):
	process_c(entry, periodos)

i = 0
for periodo in periodos:
	periodo["id"] = str(i)
	i += 1

with open("periodos.json", "w", encoding='utf-8') as file:
	json.dump({"periodos": periodos}, file, ensure_ascii=False, indent=4)
