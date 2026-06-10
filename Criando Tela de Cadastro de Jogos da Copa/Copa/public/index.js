const urlAPI = 'http://localhost:1327/api';
const selectTime1 = document.getElementById('selecioneTime1');
const selectTime2 = document.getElementById('selecioneTime2');
const form = document.getElementById('addForm');
const tbody = document.querySelector("tbody");
const nomesDasEquipes = {};
const modal = document.getElementById('customModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalIcon = document.getElementById('modalIcon');
const modalCloseBtn = document.getElementById('modalCloseBtn');

function mostrarModal(titulo, mensagem, tipo = 'sucesso') {
    modalTitle.textContent = titulo;
    modalMessage.textContent = mensagem;

    if (tipo === 'sucesso') {
        modalIcon.textContent = '✔️';
        modalIcon.style.color = '#28a745';
    } else {
        modalIcon.textContent = '❌';
        modalIcon.style.color = '#dc3545';
    }

    modal.classList.add('active');
}

modalCloseBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

async function inicializarSistema() {
    try {
        const responseEquipes = await fetch(`${urlAPI}/equipes`);
        const equipes = await responseEquipes.json();

        selectTime1.innerHTML = '<option value="" disabled selected>Selecione o Time 1</option>';
        selectTime2.innerHTML = '<option value="" disabled selected>Selecione o Time 2</option>';

        equipes.forEach(equipe => {
            nomesDasEquipes[equipe.id] = equipe.nome;

            const option1 = document.createElement('option');
            option1.value = equipe.id;
            option1.textContent = equipe.nome;
            selectTime1.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = equipe.id;
            option2.textContent = equipe.nome;
            selectTime2.appendChild(option2);
        });

        await carregarPartidasExistentes();

    } catch (error) {
        console.error('Erro ao inicializar:', error);
    }
}

async function carregarPartidasExistentes() {
    try {
        const response = await fetch(`${urlAPI}/partidas`);
        const partidas = await response.json();

        tbody.innerHTML = "";

        partidas.forEach(partida => {
            adicionarLinhaNaTabela(
                partida.id,
                partida.data_partida,
                partida.equipe1_id,
                partida.equipe2_id,
                partida.gols_equipe1,
                partida.gols_equipe2
            );
        });
    } catch (error) {
        console.error('Erro ao listar partidas:', error);
    }
}

function adicionarLinhaNaTabela(idPartida, data, time1Id, time2Id, gols1, gols2) {
    const tr = document.createElement("tr");
    tr.setAttribute('data-id', idPartida);

    const dataFormatada = data.includes('-') ? data.split('T')[0].split('-').reverse().join('/') : data;
    const nomeTime1 = nomesDasEquipes[time1Id] || `Time ${time1Id}`;
    const nomeTime2 = nomesDasEquipes[time2Id] || `Time ${time2Id}`;

    tr.innerHTML = `
        <td>${dataFormatada}</td>
        <td>${nomeTime1}</td>
        <td>${nomeTime2}</td>
        <td>${gols1 ?? '-'}</td>
        <td>${gols2 ?? '-'}</td>
        <td>
            <button class="btn-deletar" onclick="deletarPartida(${idPartida})">🗑️</button>
        </td>
    `;
    tbody.appendChild(tr);
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const dataJogo = document.getElementById('dataJogo').value;
    const time1Id = selectTime1.value;
    const time2Id = selectTime2.value;

    if (time1Id === time2Id) {
        mostrarModal("Ops!", "Um time não pode jogar contra ele mesmo!", "erro");
        return;
    }

    const dadosPartida = {
        data_partida: dataJogo,
        equipe1_id: parseInt(time1Id),
        equipe2_id: parseInt(time2Id),
        gols_equipe1: null,
        gols_equipe2: null,
        status: 'agendada'
    };

    try {
        const response = await fetch(`${urlAPI}/partidas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosPartida)
        });

        const resultado = await response.json();

        if (response.ok) {
            mostrarModal('Sucesso!', 'Jogo cadastrado com sucesso!', 'sucesso');
            adicionarLinhaNaTabela(resultado.id, dataJogo, time1Id, time2Id, null, null);
            form.reset();
        } else {
            mostrarModal('Erro', resultado.mensagem || 'Erro ao cadastrar.', 'erro');
        }
    } catch (error) {
        mostrarModal('Erro de Conexão', 'Erro ao conectar com o servidor.', 'erro');
    }
});

async function deletarPartida(id) {
    if (!confirm("Tem certeza que deseja excluir esta partida da Copa?")) {
        return;
    }

    try {
        const response = await fetch(`${urlAPI}/partidas/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            mostrarModal('Excluído!', 'A partida foi removida da tabela!', 'sucesso');

            const linha = document.querySelector(`tr[data-id="${id}"]`);
            if (linha) {
                linha.remove();
            }
        } else {
            mostrarModal('Erro', 'Não foi possível deletar no servidor.', 'erro');
        }
    } catch (error) {
        console.error('Erro ao deletar:', error);
        mostrarModal('Erro de Conexão', 'Erro ao se comunicar com o banco de dados.', 'erro');
    }
}
inicializarSistema();