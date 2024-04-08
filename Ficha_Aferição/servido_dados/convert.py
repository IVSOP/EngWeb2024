#!/usr/bin/env python3

import json

with open("dataset.json", "r", encoding='utf-8') as file:
	data = json.load(file)

pessoas = []

for entry in data.get("pessoas", []):
	pessoas.append(entry)

with open("dataset_processado.json", "w", encoding='utf-8') as file:
	for pessoa in pessoas:
		json.dump(pessoa, file, ensure_ascii=False, indent=4)
