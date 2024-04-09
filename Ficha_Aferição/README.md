# Ficha de aferição
## 09-04-2024

## Autor:
- A100538
- Ivan Sérgio Rocha Ribeiro

## Resumo:

De acordo com o que foi pedido na ficha, foi desenvolvido um `servico_dados/` e `app`.

Na API de dados, foram criados os scripts sobre os dados
- `convert.py` para inserir BI/CC se as entradas nao os tiverem, e transformar em documentos separados em vez de uma lista de elementos json
- `create_modalidades.py` para criar um novo dataset para acelerar os gets de cada modalidade. Um objeto `modalidade` e apenas o seu nome e uma lista das pessoas que a praticam
- `import.py` para importar datasets para a base de dados

Por simplicidade, assumi que os nomes das pessoas sao unicos.

As funcionalidades CRUD foram implementadas sobre os seguintes endpoints:
- GET `/pessoas`: lista de pessoas
- GET `/pessoas/<nome>`: dados de uma pessoa em especifico
- POST `/pessoas`: criar uma nova pessoa
- PUT `/pessoas/<nome>`: atualizar dados de uma pessoa
- DELETE `/pessoas/<nome>`: apagar uma pessoa

- GET `/modalidades`: lista de modalidades
- GET `/modalidades/<nome>`: dados de uma modalidade em especifico
- POST `/modalidades`: criar uma nova modalidade
- PUT `/modalidades/<nome>`: atualizar dados de uma modalidade
- DELETE `/modalidades/<nome>`: apagar uma modalidade

Na `app`, foram criadas paginas que expoem todas as funcionalidades CRUD sobre as pessoas, nos endpoints:
- `/pessoas`: lista de todos os nomes
- `/pessoas/<nome>`: detalhes de uma certa pessoa
- `/pessoas/<nome>/edit`: editar detalhes de uma certa pessoa
- `/pessoas/create`: criar uma nova pessoa
