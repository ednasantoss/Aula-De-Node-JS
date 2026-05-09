const http = require('http');
const PORT = 1327;

http.createServer((requisao, resposta) => {
    resposta.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    resposta.write('<body><h1>Resposta do servidor ok ação! </h1> Esse texto é o Body <input placeholder="Escreva algo aqui"> </input> <button>Enviar</button> </body>')
    resposta.end();

}).listen(PORT, () => console.log(`Servidor escutando em http://localhost: ${PORT}`));