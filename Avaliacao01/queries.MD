<!-- Tarefa 1: Criar o schema -->
CREATE SCHEMA 'usuario' DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

<!-- Tarefa 2: Criar o Banco -->
CREATE DATABASE usuarios CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

<!-- Tarefa 3: Mostrar o Banco existentes -->
SHOW DATABASES;

<!-- Tarefa 4: Usar o Banco -->
USE usuarios;

<!-- Tarefa 5: Cria a tabela usuario -->
CREATE TABLE usuario (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
nome VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,

CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);