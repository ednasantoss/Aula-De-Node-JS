let rodadaAtual = null;

const container = document.getElementById("table-container");
let jogosBase = [];

function carregarJogos(gameFiltrados = "") {
  const fragment = document.createDocumentFragment();

  function getRodada(data) {
    const dia = parseInt(data.split("/")[0]);

    if (dia <= 17) return 1;
    if (dia <= 23) return 2;
    return 3;
  };

  if (!container) return;

  gameFiltrados.forEach(partida => {

    const rodadaDoJogo = getRodada(partida.data);
    if (rodadaDoJogo !== rodadaAtual) {
      rodadaAtual = rodadaDoJogo;

      const header = document.createElement("h2");
      header.className = "rodada-header";
      header.innerHTML = `⚽ Fase de Grupos - ${rodadaAtual}`;

      fragment.appendChild(header);
    }


    const card = document.createElement("div");
    card.className = "match-card";
    card.innerHTML = `
            <div class="match-date">${partida.data}</div>
            <div class="teams-container">
                <div class="team-box">
                    <a href="${partida.saibaMais1}" target="_blank">
                        <img src="${partida.image1}"
                            alt="Bandeira da seleção ${partida.time1}">
                    </a>
                    <span>${partida.time1}</span>
                </div>
                <div class="score-box">
                    <span class="score-time1">${partida.score1}</span>
                    <span class="vs">X</span>
                    <span class="score-time2">${partida.score2}</span>
                </div>
                <div class="team-box">
                    <a href="${partida.saibaMais2}"
                        target="_blank">
                        <img src="${partida.image2}"
                            alt="Bandeira da seleção ${partida.time2}">
                    </a>
                    <span>${partida.time2}</span>
                </div>
            </div> `;

    fragment.appendChild(card);

  });

  container.appendChild(fragment);

};

function buscarJogos() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  document.addEventListener("input", () => {
    const textoFiltrado = removerAcentos(searchInput.value.toLowerCase());
    const gameFiltrados = jogosBase.filter((partida) => {
      const time1SemAcentos = removerAcentos(partida.time1.toLowerCase());
      const time2SemAcentos = removerAcentos(partida.time2.toLowerCase());
      return time1SemAcentos.includes(textoFiltrado) ||
        time2SemAcentos.includes(textoFiltrado) ||
        partida.data.includes(textoFiltrado);

    });

    container.innerHTML = "";

    if (gameFiltrados.length === 0) {
      container.innerHTML = `<p>Nenhum resultado encontrado: <span style="color: red;"> ${searchInput.value} .<p/>`
    } else {
      carregarJogos(gameFiltrados);
    }
  });

};


document.addEventListener("DOMContentLoaded", async () => {

  try {
    const resposta = await fetch("/api/jogos");
    const dados = await resposta.json();

    carregarJogos(dados);
    buscarJogos();
    
    jogosBase = dados

  } catch (error) {

    console.log("Erro ao carregar os dados: ", error);
    container.innerHTML = `<p style="color: red;"> Erro ao carregar os dados. Por Favor tente novamente. </p>`
  }


});