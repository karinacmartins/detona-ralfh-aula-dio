const state = {
    view: {
        squares: document.querySelectorAll(".square"), // Seleciona todos os elementos com a classe .square
        enemy: document.querySelector(".enemy"), // Seleciona o inimigo atual (primeiro encontrado com a classe .enemy)
        timeLeft: document.querySelector("#time-left"), // Seleciona o elemento de tempo restante
        score: document.querySelector("#score"), // Seleciona o elemento de pontuação
        lives: document.querySelector("#lives"), // Seleciona o contador de vidas
        highScoresList: document.querySelector("#high-scores"), // Seleciona a lista de high scores
        newGameButton: document.querySelector("#new-game-button"), // Botão para iniciar um novo jogo
    },
    values: {
        gameVelocity: 1000, // Velocidade do jogo (tempo entre as mudanças de posição do inimigo)
        hitPosition: null, // Posição atual do inimigo
        result: 0, // Pontuação atual do jogador
        currentTime: 30, // Tempo total de jogo
        lives: 5, // Número de vidas
        gameStarted: false, // Indica se o jogo está ativo
        highScores: [0, 0, 0], // Array com os três maiores scores
    },
    actions: {
        timerId: null, // Armazena o ID do intervalo de tempo para movimentação do inimigo
        countDownTimerId: null, // Armazena o ID do intervalo de contagem regressiva
        hitSound: new Audio("/assets/audios/hit.m4a"), // Som de acerto ao clicar no inimigo
        loseLifeSound: new Audio("/assets/audios/error.mp3"), // Som de perda de vida
    }
};

// Ajustar volume dos sons
state.actions.hitSound.volume = 0.2; // Define o volume do som de acerto
state.actions.loseLifeSound.volume = 0.2; // Define o volume do som de perda de vida

// Função para atualizar os high scores
function updateHighScores() {
    state.values.highScores.push(state.values.result); // Adiciona a pontuação atual ao array de high scores
    state.values.highScores.sort((a, b) => b - a); // Ordena o array do maior para o menor
    state.values.highScores = state.values.highScores.slice(0, 3); // Mantém apenas os três maiores scores

    // Atualiza o HTML da lista de high scores
    state.view.highScoresList.innerHTML = `
        <li>1º: ${state.values.highScores[0]}</li>
        <li>2º: ${state.values.highScores[1]}</li>
        <li>3º: ${state.values.highScores[2]}</li>
    `;
}

// Função de contagem regressiva
function countDown() {
    state.values.currentTime--; // Diminui o tempo em 1 segundo
    state.view.timeLeft.textContent = state.values.currentTime; // Atualiza o tempo restante no HTML

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId); // Para a contagem regressiva quando o tempo acaba
        clearInterval(state.actions.timerId); // Para a movimentação do inimigo
        state.values.gameStarted = false; // Indica que o jogo acabou
        alert("O tempo acabou! O seu resultado foi: " + state.values.result); // Alerta o jogador sobre o fim do jogo
        updateHighScores(); // Atualiza os high scores
    }
}

// Função para mover o inimigo
function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy"); // Remove o inimigo de todos os quadrados
        square.isClicked = false; // Reseta o estado de clique do quadrado
    });
    const randomNumber = Math.floor(Math.random() * state.view.squares.length); // Escolhe aleatoriamente um quadrado
    const randomSquare = state.view.squares[randomNumber]; // Seleciona o quadrado correspondente
    randomSquare.classList.add("enemy"); // Adiciona a classe "enemy" para marcar o inimigo
    state.values.hitPosition = randomSquare.id; // Armazena a posição do inimigo
}

// Função para perder uma vida
function loseLife() {
    if (state.values.lives > 0) {
        state.actions.loseLifeSound.play(); // Toca o som de perda de vida
        state.values.lives--; // Reduz uma vida
        state.view.lives.textContent = `x${state.values.lives}`; // Atualiza o contador de vidas no HTML
    }

    if (state.values.lives <= 0) { // Se as vidas chegarem a 0
        clearInterval(state.actions.countDownTimerId); // Para a contagem regressiva
        clearInterval(state.actions.timerId); // Para a movimentação do inimigo
        state.values.gameStarted = false; // Indica que o jogo acabou
        alert("Game Over! O seu resultado foi: " + state.values.result); // Alerta o jogador sobre o fim do jogo
        updateHighScores(); // Atualiza os high scores
    }
}

// Adicionar eventos de clique aos quadrados
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.isClicked = false; // Inicializa a propriedade de clique como false
        square.addEventListener("mousedown", () => {
            if (!state.values.gameStarted || square.isClicked) return; // Ignora se o jogo não estiver ativo ou o quadrado já tiver sido clicado

            if (square.id === state.values.hitPosition) { // Verifica se o quadrado clicado é o inimigo
                // Reiniciar o som antes de tocar novamente
                state.actions.hitSound.pause(); // Pausa o som se estiver tocando
                state.actions.hitSound.currentTime = 0; // Reinicia o som
                state.actions.hitSound.play(); // Toca o som de acerto

                state.values.result++; // Incrementa a pontuação
                state.view.score.textContent = state.values.result; // Atualiza a pontuação no HTML
                state.values.hitPosition = null; // Reseta a posição do inimigo
                square.isClicked = true; // Marca o quadrado como clicado
            } else {
                loseLife(); // Se não for o inimigo, perde uma vida
                square.isClicked = true; // Marca o quadrado como clicado
            }
        });
    });
}

// Função para resetar o jogo e o ranking
document.querySelector("#reset-button").addEventListener("click", () => {
    // Zera os high scores
    state.values.highScores = [0, 0, 0];
    updateHighScores();

    // Atualiza a página
    window.location.reload(); // Recarrega a página para reiniciar o jogo
});

// Função para iniciar um novo jogo
function newGame() {
    const selectedDifficulty = document.querySelector("#difficulty").value; // Obtém o nível de dificuldade selecionado
    state.values.gameVelocity = parseInt(selectedDifficulty); // Define a velocidade do jogo com base na dificuldade

    state.values.result = 0; // Reseta a pontuação
    state.view.score.textContent = state.values.result; // Atualiza a pontuação no HTML
    state.values.lives = 5; // Reseta o número de vidas
    state.view.lives.textContent = `x${state.values.lives}`; // Atualiza as vidas no HTML
    state.values.currentTime = 30; // Reseta o tempo
    state.view.timeLeft.textContent = state.values.currentTime; // Atualiza o tempo no HTML
    state.values.gameStarted = true; // Indica que o jogo começou
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity); // Inicia o intervalo para movimentação do inimigo
    state.actions.countDownTimerId = setInterval(countDown, 1000); // Inicia o intervalo de contagem regressiva
}

// Iniciar novo jogo ao clicar no botão
state.view.newGameButton.addEventListener("click", () => {
    if (!state.values.gameStarted) {
        newGame(); // Inicia o jogo se ele ainda não começou
    }
});

// Função para inicializar o jogo
function initialize() { 
    addListenerHitBox(); // Adiciona os eventos de clique aos quadrados
}

initialize(); // Inicializa o jogo ao carregar a página
