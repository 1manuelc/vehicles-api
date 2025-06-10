# Avaliação 3 - Desenvolvimento de API com Relacionamento

## Objetivo Geral:

Desenvolver uma API RESTful utilizando Node.js com Express e banco de dados
MySQL, implementando duas tabelas relacionadas por chave estrangeira. A API deve
permitir a execução completa das operações de CRUD para ambas as tabelas.

## Projeto Escolhido:

**Projeto 4: Veículos**

**Tabela 1:** veiculos (id, modelo, marca_id)

**Tabela 2:** marcas (id, nome)
Uma marca pode ter vários veículos; cada veículo pertence a uma marca.

## Requisitos Técnicos:

- Uso do banco de dados MySQL com relacionamento via chave estrangeira.
- Estrutura do projeto separada em camadas:

  ```
  /model
  /service
  /controller
  /routes
  ```

- CRUD completo para ambas as tabelas.
- Código limpo, comentado e organizado.

## Como executar o projeto localmente

1. Clone o repositório
2. Instale as dependências `npm i`
3. Configure as variáveis de ambiente se baseando em `.env.example`
4. Migre o banco de dados com: `npx prisma migrate dev` ou `npx prisma db push`
