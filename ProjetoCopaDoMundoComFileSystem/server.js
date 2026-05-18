const http = require('http');
const fileSystem = require('fs');
const PORT = 3000;
const host = 'localhost';

const html = fileSystem.readFileSync("./index.html", "utf-8");
const css = fileSystem.readFileSync("./style.css", "utf-8");
const js = fileSystem.readFileSync("./script.js", "utf-8");

<<<<<<< HEAD
const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
=======
const server = http.createServer((requisao, resposta) => {
  resposta.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
>>>>>>> 521b6518b5b111e7fdd93dd6a1fa6abf637881b3

  let paginaFinal = html.replace('<link rel="stylesheet" href="style.css" />', `<style>${css}
  </style>`).replace('<script src="script.js" defer></script>', `<script>${js}</script>`)

<<<<<<< HEAD
  response.write(paginaFinal);
  response.end();
=======
  resposta.write(paginaFinal);
  resposta.end();
>>>>>>> 521b6518b5b111e7fdd93dd6a1fa6abf637881b3

});

server.listen(PORT, () => { console.log(`SERVIDOR ESCUTANDO EM http://${host}:${PORT}`) }); 