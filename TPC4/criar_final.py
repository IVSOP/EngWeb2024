#!/usr/bin/env python3

import json

with open("compositores.json", "r", encoding='utf-8') as file:
	compData = json.load(file)

with open("periodos.json", "r", encoding='utf-8') as file:
	perData = json.load(file)


periodos = perData.get("periodos")


def match_periodo(compositor, periodos):
	nome_periodo = compositor["periodo"]
	id_periodo = -1

	for per in periodos:
		if per["nome"] == nome_periodo:
			id_periodo = per["id"]
			break

	new_comp = {
		"id": compositor["id"],
		"nome": compositor["nome"],
		"bio": compositor["bio"],
		"dataNasc": compositor["dataNasc"],
		"dataObito": compositor["dataObito"],
		"periodo": {
			"nome": nome_periodo,
			"id": id_periodo
		}
	}

	return new_comp

# dar match dos periodos que os compositores tem com o id correspondente
# assim tenho trabalho aqui mas poupa trabalho mais tarde
compositores = compData.get("compositores")
new_compositores = []

for comp in compositores:
	new_compositores.append(match_periodo(comp, periodos))

final = {
	"compositores": new_compositores,
	"periodos": periodos
}
with open("compositores_e_periodos.json", "w", encoding='utf-8') as file:
	json.dump(final, file, ensure_ascii=False, indent=4)
