const fileSystem = require('fs');

//1. Criar e Escrever (Create)
const usuarios = [
    { id: 1, nome: "Ana", cargo: "Desenvolvedora" },
    { id: 2, nome: "Carlos", cargo: "Designer" }
];

fs.writeFileSync('db.json', JSON.stringify(usuarios, null));
console.log("✅ Arquivo 'db.json' criado com sucesso!");

<<<<<<< HEAD
=======

>>>>>>> 521b6518b5b111e7fdd93dd6a1fa6abf637881b3
//2 - Ler (Read)
const dados = fs.readFileSync('db.json', 'utf8');

const dadosObj = JSON.parse(dados);

console.table(dadosObj);

// 3 - Editar/Atualizar (Update)
dadosObj.push({ id: 3, nome: 'Willian', cargo: "Dev" }); //edição

fileSystem.writeFileSync('db.json', JSON.stringify(dadosObj, null)); //atualização

console.log(("📝 Arquivo 'db.json' atualizado com novo usuário!"));

//4 - Excluir (Delete)
try {
    fs.unlinkSync('texto.txt')
} catch (err) {
    console.error("❌ Erro ao tentar excluir:", err.message);
}

// Exemplo de CRUD com File System no Node JS