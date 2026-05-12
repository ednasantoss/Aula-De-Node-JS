const http = require('http');
const PORT = 1327;

http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    response.write('<body><h1>Resposta do servidor ok ação! </h1> Esse texto é o Body <input placeholder="Escreva algo aqui"> </input> <button>Enviar</button> </body>')
    response.end();

}).listen(PORT, () => console.log(`Servidor escutando em http://localhost: ${PORT}`));