documentacao.md
 
## 1. O Banco de Dados
Criaremos o banco sitema_estoque caso ele não exista
```sql
CREATE DATABASE IF NOT EXISTS sistema_estoque;
```
query para usar o banco criado
```sql
USE sistema_estoque;
```
 
Criaremos a tabela produtos caso ela não exista com as seguintes colunas (id, nome, preco e quantidade)
```sql
CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade INT NOT NULL
)
```
 
abra o terminal e execute os comandos para iniciar o ecossistema do Node e instalar o Express (servidor) e o Driver do MySQL2
```bash
    npm init -y
    npm install express mysql2
```
 
### 2.2 Criar arquivo `db.js`
 
Criar um arquivo chamado `db.js`.
 Ele será responsável por conectar a aplicação ao MySQL usando um **Pool de conexões**, que gerencia melhor os acessos múltiplos.
 
 ### 2.3 Criar arquivo `server.js`
O arquivo principal `server.js`. É aqui que a mágica acontece. Vamos cobrir os 4 métodos HTTP principais correspondentes ao CRUD:
 