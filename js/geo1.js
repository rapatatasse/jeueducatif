const wordImages = [
    { word: "Etats-unis", image: "image/etats-unis.png" },
    { word: "France", image: "image/france.png" },
    { word: "Allemagne", image: "image/allemagne.png" },
    { word: "Italie", image: "image/italie.png" }
];

let level = 1;
let playerLives = 5;
let opponentLives = 5;
let currentWordIndex;

function generateQuestion() {
    const buttonsContainer = document.getElementById('buttonsContainer');
    buttonsContainer.innerHTML = '';

    currentWordIndex = Math.floor(Math.random() * wordImages.length);
    const currentWord = wordImages[currentWordIndex];

    document.getElementById('wordImage').src = currentWord.image;

    const answerOptions = [];

    answerOptions.push(currentWord.word);

    while (answerOptions.length < 4) {
        const randomIndex = Math.floor(Math.random() * wordImages.length);
        const randomWord = wordImages[randomIndex].word;
        if (!answerOptions.includes(randomWord)) {
            answerOptions.push(randomWord);
        }
    }

    const shuffledOptions = shuffle(answerOptions);

    shuffledOptions.forEach(function(option) {
        const button = document.createElement('button');
        button.textContent = option.charAt(0).toUpperCase() + option.slice(1);
        button.setAttribute('onclick', `checkAnswer('${option}')`);
        buttonsContainer.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {
    const correctAnswer = wordImages[currentWordIndex].word;

    if (selectedAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        opponentLives--;
        updateLifeBar('opponentLifeBar', opponentLives);
    } else {
        playerLives--;
        updateLifeBar('playerLifeBar', playerLives);
    }

    if (opponentLives <= 0) {
        if (level < 3) {
            level++;
            updateLevelText(level);
            resetGame();
        } else {
            displayResultMessage(true);
        }
    } else if (playerLives <= 0) {
        displayResultMessage(false);
    } else {
        generateQuestion();
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateLifeBar(lifeBarId, lives) {
    const lifeBar = document.getElementById(lifeBarId);
    lifeBar.innerText = '❤'.repeat(lives);
}

function updateLevelText(level) {
    document.getElementById('leveltexte').innerText = level;
}

function displayResultMessage(isWinner) {
    const resultMessage = document.getElementById('result-message');
    resultMessage.innerText = isWinner ? "Bravo ! Vous avez gagné !" : "Désolé, vous avez perdu. Essayez à nouveau !";
}

function resetGame() {
    playerLives = 5;
    opponentLives = 5;
    updateLifeBar('playerLifeBar', playerLives);
    updateLifeBar('opponentLifeBar', opponentLives);
    generateQuestion();
}

document.addEventListener('DOMContentLoaded', generateQuestion);