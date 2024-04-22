let level = 1;
let playerLives = 5;
let opponentLives = 5;

function startGame() {
    resetLives(); 
    generateQuestion();
    clearResultMessage();
}

function checkAnswer(playerAnswer) {
    const correctAnswer = parseInt(document.getElementById('addition').getAttribute('data-answer'));

    if (!isNaN(playerAnswer)) {
        if (playerAnswer === correctAnswer) {
            opponentLives--;

            // Mise à jour de la vie de l'adversaire dans l'interface
            updateLifeBar('opponentLifeBar', opponentLives);
        } else {
            playerLives--;

            // Mise à jour de la vie du joueur dans l'interface
            updateLifeBar('playerLifeBar', playerLives);
        }

        if (opponentLives <= 0) {
            displayResultMessage(true);
        } else if (playerLives <= 0) {
            displayResultMessage(false);
        } else {
            generateQuestion();
        }
    }
}

function changeLevel() {
    const levelSelect = document.getElementById('levelSelect');
    level = parseInt(levelSelect.value);
    resetLives()
    startGame(); // Recommencez le jeu avec le nouveau niveau
}
function resetLives() {
    playerLives = 5;
    opponentLives = 5;

    // Mettez à jour les barres de vie dans l'interface
    updateLifeBar('playerLifeBar', playerLives);
    updateLifeBar('opponentLifeBar', opponentLives);
}

function updateLifeBar(lifeBarId, lives) {
    const lifeBar = document.getElementById(lifeBarId);
    const hearts = '❤'.repeat(lives);
    lifeBar.innerText = hearts;
}

function generateQuestion() {
    const maxSum = level === 1 ? 5 : (level === 2 ? 8 : 10);
    console.log("level"+level)
    const num1 = Math.floor(Math.random() * (maxSum - 1)) + 1;
    const num2 = Math.floor(Math.random() * (maxSum - num1 )) + 1;
    const correctAnswer = num1 + num2;

    document.getElementById('addition').innerText = `${num1} + ${num2} = ?`;
    document.getElementById('addition').setAttribute('data-answer', correctAnswer);
}

function displayResultMessage(isPlayerWinner) {
    const resultMessage = document.getElementById('result-message');
    const gamesWon = document.getElementById('gamesWon');
    const gamesLost = document.getElementById('gamesLost');
    resultMessage.style.fontSize = '30px';
    resultMessage.style.fontWeight = 'bold';
    resultMessage.style.marginTop = '20px';

    if (isPlayerWinner) {
        resultMessage.style.color = 'green';
        resultMessage.innerText = 'Bravo!';
        gamesWon.innerText =  Math.floor(gamesWon.innerText) + 1
    } else {
        resultMessage.style.color = 'red';
        resultMessage.innerText = 'Perdu pour cette fois. Recommencez!';
        gamesLost.innerText =  Math.floor(gamesLost.innerText) + 1
    }
}

function clearResultMessage() {
    document.getElementById('result-message').innerText = '';
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    startGame();
});
