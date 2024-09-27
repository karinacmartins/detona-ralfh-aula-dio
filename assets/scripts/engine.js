const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
        highScoresList: document.querySelector("#high-scores"),
        newGameButton: document.querySelector("#new-game-button"),
    },
    values: {
        gameVelocity: 1000, 
        hitPosition: null,
        result: 0,
        currentTime: 30, 
        lives: 5, 
        gameStarted: false,
        highScores: [0, 0, 0],
    },
    actions: {
        timerId: null,
        countDownTimerId: null,
        hitSound: new Audio("/assets/audios/hit.m4a"),
        loseLifeSound: new Audio("/assets/audios/error.mp3"),
    }
};

// Ajustar volume dos sons
state.actions.hitSound.volume = 0.2;
state.actions.loseLifeSound.volume = 0.2;

// Função para atualizar os high scores
function updateHighScores() {
    state.values.highScores.push(state.values.result);
    state.values.highScores.sort((a, b) => b - a); 
    state.values.highScores = state.values.highScores.slice(0, 3); 

    // Atualiza o HTML da lista de high scores
    state.view.highScoresList.innerHTML = `
        <li>1º: ${state.values.highScores[0]}</li>
        <li>2º: ${state.values.highScores[1]}</li>
        <li>3º: ${state.values.highScores[2]}</li>
    `;
}

// Função de contagem regressiva
function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        state.values.gameStarted = false; 
        alert("O tempo acabou! O seu resultado foi: " + state.values.result);
        updateHighScores(); 
    }
}

// Função para mover o inimigo
function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
        square.isClicked = false; // Resetar flag de clique
    });
    const randomNumber = Math.floor(Math.random() * state.view.squares.length); 
    const randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

// Função para perder uma vida
function loseLife() {
    if (state.values.lives > 0) {
        state.actions.loseLifeSound.play(); 
        state.values.lives--;  
        state.view.lives.textContent = `x${state.values.lives}`;
    }

    if (state.values.lives <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        state.values.gameStarted = false; 
        alert("Game Over! O seu resultado foi: " + state.values.result);
        updateHighScores(); 
    }
}

// Adicionar eventos de clique aos quadrados
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.isClicked = false; // Nova propriedade para verificar se foi clicado
        square.addEventListener("mousedown", () => {
            if (!state.values.gameStarted || square.isClicked) return; // Ignorar se o jogo não estiver ativo ou se já foi clicado

            if (square.id === state.values.hitPosition) {
                // Reiniciar o som antes de tocar novamente
                state.actions.hitSound.pause(); // Pausar se estiver tocando
                state.actions.hitSound.currentTime = 0; // Reiniciar o som
                state.actions.hitSound.play(); // Tocar o som de acerto
                
                state.values.result++;  
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;  
                square.isClicked = true; // Marca que o quadrado já foi clicado
            } else {
                loseLife(); 
                square.isClicked = true; // Também marca o quadrado como clicado ao perder uma vida
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
    window.location.reload(); 
});


// Função para iniciar um novo jogo
function newGame() {
    const selectedDifficulty = document.querySelector("#difficulty").value;
    state.values.gameVelocity = parseInt(selectedDifficulty); // Ajustar a velocidade de acordo com a seleção

    state.values.result = 0;
    state.view.score.textContent = state.values.result;
    state.values.lives = 5;
    state.view.lives.textContent = `x${state.values.lives}`;
    state.values.currentTime = 30;
    state.view.timeLeft.textContent = state.values.currentTime;
    state.values.gameStarted = true; 
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity); // Use a velocidade configurada
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}


// Iniciar novo jogo ao clicar no botão
state.view.newGameButton.addEventListener("click", () => {
    if (!state.values.gameStarted) {
        newGame();
    }
});

// Função para inicializar o jogo
function initialize() { 
    addListenerHitBox(); 
}

initialize();
