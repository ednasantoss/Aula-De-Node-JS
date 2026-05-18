const http = require('http');
const fileSystem = require('fs');
const PORT = 1237;
const host = 'localhost';

const usuarios = [
    { id: 1, nome: "Isaque", filme: "Poder sem limites" },
    { id: 2, nome: "Edna", série: "Greys Anatomy" },
]

function criarUsuarios() {
    try {
        fileSystem.writeFile('usuarios.json', JSON.stringify(usuarios), () => { console.log('Arquivo Criado') });
    } catch (error) {
        console.error(`Erro ao criar o arquivo ${error}`);
    }
}

<<<<<<< HEAD
const server = http.createServer((request, response) => {
=======
const server = http.createServer((require, response) => {
>>>>>>> 521b6518b5b111e7fdd93dd6a1fa6abf637881b3
    response.writeHead(200, { 'Content-Type': 'text/json; charset=utf-8' })
    criarUsuarios()
    response.write(JSON.stringify(usuarios))
    response.end()
});

server.listen(PORT, () => { console.log(`SERVIDOR ESCUTANDO EM http://${host}:${PORT}`) });