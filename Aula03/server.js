const http = require("http");
const PORT = 3000;
const host = 'localhost';

<<<<<<< HEAD
const server = http.createServer((request, response) => {
    const url = request.url;
=======
const server = http.createServer((require, response) => {
    const url = require.url;
>>>>>>> 521b6518b5b111e7fdd93dd6a1fa6abf637881b3
    console.log(`Requisição em ${url}`);
    const headers = { "content-type": "text/html; charset=utf-8" };

    switch (url) {
        case "/":
            response.writeHead(200, headers);
            response.write(`<h1>Status 200: </h1> <p>Tudo certo! Aqui está oque você pediu</p>`)
            break;

        case "/erro-interno":
            response.writeHead(500, headers);
            response.write(`<h1>Status 500: </h1> <p>Algo quebrou aqui dentro enquanto eu processava seu pedido</p>`);
            break;

        default:
            response.writeHead(404, headers);
            response.write(`<h1>Status 404: </h1> <p>Ops...! Este endereço não existe no meu servidor</p>`);
            break;
    }

    response.end();

});

server.listen(PORT, () => {
    console.log(`rodando http://${host}:${PORT}`);
});