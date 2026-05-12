require("dotenv").config();
const path = require("path");
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const jogos = require('./data/db');

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (request, response) =>{
    response.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get('/api/jogos', (request, response) => {
    response.status(200).json(jogos);
});

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});