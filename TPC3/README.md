# TPC3: Filmes americanos
## 27-02-2024

## Autor:
- A100538
- Ivan Sérgio Rocha Ribeiro

## Resumo:

Neste trabalho, partindo do dataset `ficheiros/filmes.json`, têm de ser criadas as páginas
- `/filmes`: índice de filmes
- `/filmes/\<id\>`: página com detalhes do filme
- `/generos`: índice de géneros
- `/generos/\<id\>`: página com detalhes do género
- `/atores`: índice de atores
- `/atores/\<id\>`: página com detalhes do ator

Usando json-server para fornecer os dados, e nodejs para criar o servidor http, usando axios para ir buscar os dados ao json-server em vez de usar páginas estáticas.

Para facilitar as queries pedidas, foram criados três novos datasets:
- `ficheiros/filmes_with_ids.json`: Concatenou-se o _id.$oid num so _id, e tanto nos géneros como nos atores, passam a ter um _id associado em vez de ter so o nome.
- `ficheiros_generos.json`: Lista de géneros, com nome, _id, e uma lista de filmes em que aparece, tendo cada filme um nome e um _id.
- `ficheiros_atores.json`: Lista de atores, analogo ao de cima

Estes foram gerados com `add_ids.py`, `make_generos.py` e `make_atores.py`, tendo sido manualmente ajustados para que o json-server reconheça filmes, géneros e atores corretamente.

Infelizmente, apesar do que está nas dos do json-server, nao consegui usar vários ficheiros ao mesmo tempo, por isso criei o scrip `json_server.sh` para criar três instâncias em simultâneo.
