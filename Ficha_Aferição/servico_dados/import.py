import json
import sys
import requests


with open(sys.argv[1], 'r', encoding='utf-8') as dataset:
	data = json.load(dataset)

endpoint = "http://localhost:3000/pessoas"

headers = {
	'Content-Type': 'application/json'
}

for entry in data.get("pessoas", []):
	print(f"processing {entry['nome']}")

	try:
		entry["CC"]
		entry["BI"] = ""
	except KeyError:
		entry["CC"] = ""

	response = requests.post(endpoint, json=entry, headers=headers)

	if response.status_code <= 201:
		print("New entry created successfully.")
	else:
		print("Failed to create new entry (", response.status_code + ")")
	print("Response:", response.content)
