require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || "7070";
const HOST = process.env.DB_HOST || '127.0.0.1';
const pool = require('./db')
app.use(express.json());

app.get("/api/health", (request, response) => {
    response.status(200).json({ ok: true, message: "API online" });
});

app.get("/api/test-db", async (request, response) => {
    try {
        const connection = await pool.getConnection();
        await connection.ping();
        connection.release();
        response.status(200).json({ ok: true, message: "Conexão com o banco bem-sucedida!" });
    } catch (error) {
        response.status(500).json({ ok: false, message: `Erro ao conectar no banco ${error}:${error.message}` });
    }
});

app.get("/api/usuarios", async (request, response) => {
    try {
        const connection = await pool.getConnection();
        const [ dadosUsuarios ] = await connection.query("SELECT * FROM usuario");
        connection.release();
        response.status(200).json({ dadosUsuarios });

    } catch (error) {

        response.status(500).json({ ok: false, message: `Erro ao buscar os usuarios. ${error}:${error.message}` });
    }
})

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON HTTP://${HOST}:${PORT}/api/test-db`);
    console.log(`SERVER IS RUNNING ON HTTP://${HOST}:${PORT}/api/health`);
    console.log(`SERVER IS RUNNING ON HTTP://${HOST}:${PORT}/api/usuarios`);
});