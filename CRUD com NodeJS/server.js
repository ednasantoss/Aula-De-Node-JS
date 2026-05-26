const express = require("express");
const cors = require('cors');
const app = express();
const database = require("./db");
app.use(express.json());
app.use(cors());

app.get("/health", async (request, response) => {
    try {
        await database.query("SELECT 1")
        return response.status(200).json({
            status: "ok",
            database: "Conectado"
        })
    } catch (error) {
        return response.status(500).json({
            status: "erro",
            database: "Desconectado",
            erro: error.message
        });
    }
});

app.get("/produtos", async (request, response) => {
    try {
        const [produtos] = await database.query("SELECT * FROM produtos");
        return response.status(200).json({ produtos })
    } catch (error) {
        return response.status(500).json({
            erro: error.message
        });
    }
});

app.post('/produtos', async (request, response) => {
    const { nome, preco, quantidade } = request.body;

    try {
        const [produtos] = await database.query("INSERT INTO produtos(nome, preco, quantidade) VALUES (?,?,?)", [nome, preco, quantidade])
        return response.status(201).json({
            id: produtos.insertId, nome, preco, quantidade
        });
    } catch (error) {
        return response.status(500).json({ erro: error.message });
    }
});

app.put('/produtos/:id', async (request, response) => {
    const { id } = request.params;
    const { nome, preco, quantidade } = request.body;

    try {
        const [resultado] = await database.query("UPDATE produtos SET nome = ?, preco = ?, quantidade = ? WHERE id = ? ", [nome, preco, quantidade, id]);

        response.json({ message: `Produto ${nome}, com id ${id} foi atualizado` });

        if (resultado.affectedRows === 0) return response.status(404).json({ message: "Produto não encontrado" });

    } catch (error) {
        response.status(500).json({ erro: error.message });
    }
});

app.delete('/produtos/:id', async (request, response) => {
    const { id } = request.params;

    try {
        const sqlBuscar = "SELECT nome FROM produtos WHERE id = ?";
        const [rows] = await database.query(sqlBuscar, [id]);

        if (!rows || rows.length === 0) {
            return response.status(404).json({ erro: 'Produto não encontrado.' });
        }
        const produto = rows[0] || rows;
        const nomeProduto = produto.nome;
        const sqlDeletar = "DELETE FROM produtos WHERE id = ?";

        await database.query(sqlDeletar, [id]);
        
        return response.status(200).json({
            message: `Produto ${nomeProduto} com id ${id} deletado com sucesso`
        });

    } catch (error) {
        return response.status(500).json({ erro: error.message });
    }
});

app.listen(1327, () => {
    console.log(`Server is running on http://localhost:1327/health`);
    console.log(`Server is running on http://localhost:1327/produtos`);
});