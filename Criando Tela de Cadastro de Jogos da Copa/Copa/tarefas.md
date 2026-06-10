## 1 - Instalações de dependências:

npm init -y
npm install
npm install nodemon -D
npm install express
npm install dotenv
npm install cors
npm install mysql2

## 2 - Organização da estrutura de pastas separando o Backend e Frontend: 

Entendendo a Estrutura
Copa/: O diretório raiz do seu projeto.

Backend/: Concentra toda a lógica do lado do servidor (Node.js).

src/: Pasta principal do código-fonte.

config/data/db.js: Onde reside a configuração de conexão com o banco de dados.

models/: Pasta destinada aos modelos de dados (ex: Partida.js), que definem a estrutura das tabelas ou entidades.

mysql.js: Arquivo relacionado à integração ou drivers do banco MySQL.

server.js: O ponto de entrada do meu backend, onde o servidor é inicializado.

.env: Arquivo de configuração para variáveis de ambiente (senhas, portas, chaves secretas).

package.json / package-lock.json: Gerenciadores de dependências e scripts do Node.js.

public/: Pasta que armazena os arquivos estáticos do front-end (a interface que o usuário final vê).

index.html: A estrutura da minha página web.

index.css: A estilização e design visual.

index.js: O comportamento dinâmico do front-end.

tarefas.md: Um arquivo em Markdown para anotações, controle de tarefas ou documentação rápida do projeto.

.gitignore: Arquivo que diz ao Git quais pastas (como a node_modules) ou arquivos (como o .env) não devem ser enviados para o repositório.

A Estrutura das pastas e arquivos estão assim: 
Copa/
├── Backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   │   └── data/
│   │   │       └── db.js
│   │   ├── models/
│   │   │   └── Partida.js
│   │   ├── mysql.js
│   │   └── server.js
│   ├── .env
│   ├── package-lock.json
│   └── package.json
├── public/
│   ├── index.css
│   ├── index.html
│   └── index.js
├── tarefas.md
└── .gitignore

## 3 - Criação do Banco de Dados com as Tabelas:

 Banco de Dados é copa_do_mundo
 Tabela partidas
 Tabela equipes

## 4 - Inserindo as informações nas Tabelas:

INSERT INTO equipes (nome, imagem_url, saiba_mais_url, tipo) VALUES
('Brasil', 'https://www.bandeirasnacionais.com/data/flags/emoji/facebook/256x256/br.png', 
'https://pt.wikipedia.org/wiki/Sele%C3%A7%C3%A3o_Brasileira_de_Futebol', 'selecao'),

INSERT INTO partidas (data_partida, equipe1_id, equipe2_id, gols_equipe1, 
gols_equipe2, status)
VALUES
('2026-06-13', 1, 2, NULL, NULL, 'agendada'),
('2026-06-17', 1, 3, NULL, NULL, 'agendada');

## 5 - Criação do arquivo .env e Conexão com o Mysql2: 

No arquivo seguindo esse caminho backend/src/config/mysql.js é para manter um pool de conexão com o mysql2/promise

Detalhe, nesse arquivo eu não mantive o pool de conexão, eu coloquei ele no db.js

No final do arquivo tem que fazer o module.exports = pool;

O arquivo mysql.js contém: 

const path = require('path') Cria um "GPS" para o Node conseguir achar os caminhos das pastas sem dar erro de sistema.
require('dotenv').config Ativa o leitor que vai buscar e carregar as nossas configurações e senhas secretas.
path: path.resolve('./Backend/.env') Usa o GPS para achar o endereço exato do arquivo .env dentro da pasta Backend e injetar os dados na memória.

## 6 - Aqui é a criação das rotas com CRUD dentro do arquivo server.js:

GET /api/jogos -> listar partidas
GET /api/jogos/:id -> buscar uma partida
POST /api/jogos -> criar partida
PUT /api/jogos/:id -> atualizar partida inteira
DELETE /api/jogos/:id -> remover partida

## 7 - Enviando os payloads (a carga dentro) da requisição HTTP (que é o pacote de dados que viaja pela internet): 

O Envelope: Tem o endereço para onde vai (a URL /api/jogos) e o selo (as configurações).

O Conteúdo da Carta: É o que está dentro do envelope. Esse conteúdo é o payload (os dados do jogo em JSON).

POST /api/partidas -> criar partida
Para criar a partida, enviamos um "payload", que é um bloco de dados em formato JSON contendo as informações do novo jogo que o servidor vai receber.

PUT /api/partidas/:id -> atualizar partida inteira
Para atualizar a partida, enviamos um "payload" em formato JSON contendo os novos dados do jogo, como o placar final e o status alterado para "encerrada", identificando qual jogo será modificado através do ID na rota.

DELETE /api/partidas/:id -> deletar partida
Para deletar, nós não enviamos conteúdo dentro da carta (o payload vai vazio). O ID do jogo escrito no "envelope" (na URL da rota) já é o suficiente para o servidor saber qual partida ele deve apagar do banco de dados.

GET /api/partidas -> listar partidas
Para listar, nós também não enviamos conteúdo (sem payload). Nós apenas enviamos o "envelope" pedindo os dados, e é o servidor quem nos devolve uma carta cheia de conteúdos (a lista de jogos em JSON).

## 8 - Começando a criação do Frontend