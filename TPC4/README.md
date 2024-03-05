# TPC1: Filmes americanos
## 5-03-2024

## Autor:
- A100538
- Ivan Sérgio Rocha Ribeiro

## Resumo:

Neste trabalho, partindo do dataset `compositores.json`, têm de ser criadas as páginas
- `/compositores`: índice de compositores
- `/compositores/\<id\>`: página com detalhes do compositor
- `/periodos`: índice de periodos
- `/periodos/\<id\>`: página com detalhes do periodos

De seguida, têm tambem de ser implementadas as operacoes CRUD sobre os mesmos.

Para facilitar a utilizacao dos dados, foi criado um novo dataset, `compositores_e_periodos.json`, que contem nao so dados sobre os compositores mas tambem uma lista dos periodos. Cada periodo nessa lista tem os dados relevantes sobre os compositores que fazem parte dele. Nos compositores, foi adicionado o id ao periodo, para alem do nome. Estas operacoes sao feitas atraves de scripts em python.

O json-server é o reponsavel por fornecer os dados deste ficheiro, enquanto que um servidor em nodejs, usando axios e http, os consulta e fornece uma pagina html como for necessario.

Para as operacoes de inserir, existe um botao nas paginas principais dos periodos e compositores, que leva a um form onde os novos dados podem ser inseridos.

Para update, existe um botao na pagina de detalhes do periodo/compositor, que leva tambem a um form, mas que tem os valores ja preenchidos com os atuais.

Para apagar, ha um outro botao tambem nas paginas de detalhes, que imediatamente apaga o registo.
