const http = require('http');
const PORT = 1327;

<<<<<<< HEAD
http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    response.write('<body><h1>Resposta do servidor ok ação! </h1> Esse texto é o Body <input placeholder="Escreva algo aqui"> </input> <button>Enviar</button> </body>')
    response.end();
=======
http.createServer((requisao, resposta) => {
    resposta.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    resposta.write('<body><h1>Resposta do servidor ok ação! </h1> Esse texto é o Body <input placeholder="Escreva algo aqui"> </input> <button>Enviar</button> </body>')
    resposta.end();
>>>>>>> 521b6518b5b111e7fdd93dd6a1fa6abf637881b3

}).listen(PORT, () => console.log(`Servidor escutando em http://localhost: ${PORT}`));