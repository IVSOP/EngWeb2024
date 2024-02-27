#!/usr/bin/env python3

import json

with open("ficheiros/filmes.json", "r", encoding='utf-8') as file:
	filmes_data = json.load(file)
filmes = filmes_data.get("filmes", [])

with open("ficheiros/generos.json", "r", encoding='utf-8') as file:
	generos_data = json.load(file)
generos = generos_data.get("generos", [])

with open("ficheiros/atores.json", "r", encoding='utf-8') as file:
	atores_data = json.load(file)
atores = atores_data.get("atores", [])


def getActorDict(actorname, atores):
	for actor in atores:
		if (actor["nome"] == actorname):
			ret = {
				"_id": actor["_id"],
				"nome": actor["nome"]
			}
			return ret
		
	return -1


def getGenreDict(genrename, generos):
	for genre in generos:
		if (genre["nome"] == genrename):
			ret = {
				"_id": genre["_id"],
				"nome": genre["nome"]
			}
			return ret
		
	return -1


novos_filmes = []

for filme in filmes:
	novo = {
		"_id": filme["_id"]["$oid"],
		"title": filme["title"],
		"year": filme["year"]
	}
	cast = []
	for actor in filme.get("cast", []):
		cast.append(getActorDict(actor, atores))


	genres = []
	for genre in filme.get("genres", []):
		genres.append(getGenreDict(genre, generos))


	novo["cast"] = cast
	novo["genres"] = genres

	novos_filmes.append(novo)



with open("ficheiros/filmes_with_ids.json", "w", encoding='utf-8') as file:
	json.dump(novos_filmes, file, ensure_ascii=False, indent=4)
