# Controle Vacinação

Sistema Web em React e Node para controle de vacinação.

Programa livre para acesso e cópia com finalidade de aprendizado.

Link para demonstração no Youtube: https://youtu.be/CYJVra100UM

Por: raquelms203

### raquelmartins203@yahoo.com.br

### Instruções para instalação e execução

Pré-requisitos:

- Possuir o MongoDB instalado no computador, disponível em:
  https://www.mongodb.com/try/download/community

- Possuir o Node instalado no computador, disponível em:
  https://nodejs.org/en/download/

É recomendado adicionar as variáveis de ambiente npm e node no terminal.

#### 5.1 Execução do back-end

Para baixar as bibliotecas do back-end, execute no terminal na pasta /api

> npm i

Para rodar o projeto, execute em seguida

> node index

Na porta 3000 será iniciado o back-end com banco de dados Mongo.

Foram desenvolvidos os seguintes endpoints:

**/login/**

POST: realiza o login

**/users**

GET: listagem de usuários.

POST: cadastro de usuário.

**/user/:id**

GET: retorna o usuário com o id informado.

PUT: atualiza o usuário pelo id informado

DELETE: remove o usuário com o id informado.

**/persons**

GET: listagem de pacientes.

POST: cadastro de paciente.

**/person/:id**

GET: retorna o paciente com o id informado.

PUT: atualiza o paciente pelo id informado

DELETE: remove o paciente com o id informado.

**/vaccines**

GET: listagem de vacinas.

POST: cadastro de vacina.

**/vaccine/:id**

GET: retorna a vacina com o id informado.

PUT: atualiza a vacina pelo id informado

DELETE: remove a vacina com o id informado.

**/unities**

GET: listagem de unidades.

POST: cadastro de unidade.

**/unity/:id**

GET: retorna a unidade com o id informado.

PUT: atualiza a unidade pelo id informado

**/registers**

GET: listagem de registros.

POST: cadastro de registro.

**/register/:id**

GET: retorna o registro com o id informado.

PUT: atualiza o registro pelo id informado

DELETE: remove o registro com o id informado.

**/doses**

GET: retorna as informações sobre as doses aplicadas.

#### 5.2 Execução do front-end

Pré-requisitos:

- Possuir o Node instalado no computador, caso não tenha obter em:
  https://nodejs.org/en/download/

Para baixar as bibliotecas do front-end, execute no terminal na pasta /web

> npm i

Para rodar o projeto, execute em seguida

> npm start
