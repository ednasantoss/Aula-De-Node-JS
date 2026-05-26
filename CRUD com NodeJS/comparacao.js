const express = require("express");
const cors = require('cors');
const app = express();
const db = require("./db");
 
app.use(cors());
 
app.use(express.json());
 
// Rota de saude para verificar se o servidor esta rodando e o banco conectado.
app.get("/health", async (req, res) => {
    try {
        await db.query("SELECT 1")
        return res.status(200).json({
            status: "ok",
            database: "Conectado"
        })
    } catch (err) {
        return res.status(500).json({
            status: "erro",
            database: "Desconectado",
            erro: err.message
        });
    }
});
 
// --- 1. CREATE (Cadastrar Produto) ---
app.post('/produtos', async (req, res) => {
    const { nome, preco, quantidade } = req.body;
 
    try {
 
        const [resultado] = await db.query("INSERT INTO produtos (nome, preco, quantidade) VALUES (?, ?, ?)", [nome, preco, quantidade]);
 
        return res.status(201).json({
            id: resultado.insertId, nome, preco, quantidade
        });
 
    } catch (err) {
        return res.status(500).json({ erro: err.message });
    }
})
 
// --- 2. READ (Listar Todos os Produtos) ---
app.get("/produtos", async (req, res) => {
    try {
 
        const [produtos] = await db.query("SELECT * FROM produtos");
 
        return res.status(200).json(produtos);
 
    } catch (err) {
        return res.status(500).json({ erro: err.message })
    }
});
 
// --- 3. UPDATE (Atualizar um Produto) ---
app.put('/produtos/:id', async (req, res) => {
 
    const { id } = req.params;
    const { nome, preco, quantidade } = req.body;
 
 
    console.log("ID:", id);
    console.log("Dados:", nome, preco, quantidade);
 
 
    try {
 
        const sql = `UPDATE produtos SET nome = ?, preco = ?, quantidade = ? WHERE id = ?`;
 
       const [resultado] = await db.query(sql, [nome, preco, quantidade, id]);
 
        if (resultado.affectedRows === 0) return res.status(404).json({message: "Produto não encontrado!"});
 
        res.status(200).json({ message: `Produto ${nome}, com id ${id} foi atualizado!` });
 
    } catch (err) {
 
        return res.status(500).json({ erro: err.message });
 
    }
});
 
// --- 4. DELETE (Excluir um Produto) ---
app.delete('/produtos/:id', async (req, res) => {
 
    const { id } = req.params;
 
    console.log(nome, produto)
    try {
       
        const sql = "DELETE FROM produtos WHERE id = ? ";
        await db.query(sql, [id])
       
        return res.status(200).json({ message: `Produto de id ${id} se foi!` });
 
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
 
app.listen(3000, () => {
    console.log(`Rota saude rodando em http://localhost:3000/health`);
    console.log(`Rota listar Produtos rodando em http://localhost:3000/produtos`);
});