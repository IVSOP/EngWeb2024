# TPC6: Compositores de música - express + mongodb
## 18-03-2024

## Autor:
- A100538
- Ivan Sérgio Rocha Ribeiro

## Resumo:

Este trabalho e muito semelhante ao TPC5, porem usa um servico implementado em mongodb ao inves do json-server.

Assim, foram criadas as mesmas funcionalidades e utilizados os mesmos ficheiros de dados, com o servico de dados em `servico_dados/` e o de paginas html em `app`.

Para maior compatibilidade com o mongodb, o json original (usado no TPC5) foi separado, e deixam de haver listas mas apenas entradas "soltas", cada uma agindo como um documento.

Importar json para o mongodb:
```bash
mongoimport -d EngWebTPC6 -c compositor compositores.json
mongoimport -d EngWebTPC6 -c periodo periodos.json
```
