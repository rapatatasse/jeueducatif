let level = 1;
let playerLives = 5;
let opponentLives = 1;

document.addEventListener('DOMContentLoaded', () => {
    startGame();
    loadLastWordReward();
});

function loadLastWordReward() {
    const rewards = JSON.parse(localStorage.getItem('rewards')) || { recompense: [] };

    const lastReward = rewards.recompense.length > 0 ? rewards.recompense[rewards.recompense.length - 1] : null;

    if (lastReward) {
        const wordImage = document.getElementById('word').querySelector('img');
        wordImage.src = `image/${lastReward}`;
    } else {
        const wordImage = document.getElementById('word').querySelector('img');
        wordImage.src = 'image/word1.png';
    }
}

function startGame() {
    resetLives(); 
    generateQuestion();
    clearResultMessage();
}

function checkAnswer(playerAnswer) {
    const correctAnswerIndex = parseInt(document.getElementById('translation').getAttribute('data-answer'));

    if (!isNaN(playerAnswer)) {
        if (playerAnswer === correctAnswerIndex) {
            opponentLives--;
            updateLifeBar('opponentLifeBar', opponentLives);
        } else {
            playerLives--;
            updateLifeBar('playerLifeBar', playerLives);
        }

        if (opponentLives <= 0) {
            if (level < 3) {
                level++;
                changeWordImage(level);
                updateLevelText(level);
                startGame();
            } else {
                displayResultMessage(true);
            }
        } else if (playerLives <= 0) {
            displayResultMessage(false);
        } else {
            generateQuestion();
        }
    }
}


function updateLevelText(level) {
    const levelText = document.getElementById('leveltext');
    levelText.innerText = level;
}

function changeWordImage(level) {
    const wordImage = document.getElementById('word').querySelector('img');
    wordImage.src = `image/word${level}.png`;
}

function resetLives() {
    playerLives = 5;
    opponentLives = 1;
    updateLifeBar('playerLifeBar', playerLives);
    updateLifeBar('opponentLifeBar', opponentLives);
}

function updateLifeBar(lifeBarId, lives) {
    const lifeBar = document.getElementById(lifeBarId);
    const hearts = '❤'.repeat(lives);
    lifeBar.innerText = hearts;
}

// Fonction pour générer les options avec des événements de clic
function generateOptions(options) {
    const optionsList = document.getElementById('options');
    optionsList.innerHTML = '';

    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.addEventListener('click', () => checkAnswer(index + 1)); // Ajoute 1 pour obtenir la réponse correcte
        optionsList.appendChild(button);
    });
}

// Modifier la fonction generateQuestion pour inclure les options
function generateQuestion() {
    const words = [
        { french: 'chat', options: ['dog', 'cat', 'bird', 'fish'], answer: 2 },
        { french: 'arbre', options: ['tree', 'flower', 'rock', 'grass'], answer: 1 },
        { french: 'voiture', options: ['car', 'bike', 'bus', 'train'], answer: 1 }
        // Ajoutez plus de mots avec leurs traductions et réponses ici
    ];

    const randomIndex = Math.floor(Math.random() * words.length);
    const question = words[randomIndex];
    const correctAnswerIndex = question.answer;

    document.getElementById('question').innerText = `Translate "${question.french}" into English:`;

    // Générer les options avec des événements de clic
    generateOptions(question.options);

    document.getElementById('translation').setAttribute('data-answer', correctAnswerIndex);
}

function displayResultMessage(isPlayerWinner) {
    const resultMessage = document.getElementById('result-message');
    const backButton = document.createElement('button');
    backButton.innerText = 'Back to Map';
    backButton.classList.add('backbutton');
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    resultMessage.style.fontSize = '30px';
    resultMessage.style.fontWeight = 'bold';
    resultMessage.style.marginTop = '20px';

    if (isPlayerWinner) {
        resultMessage.style.color = 'green';
        if (level < 3) {
            resultMessage.innerText = 'Congratulations!';
            // Increment games won or store other rewards here
        } else {
            resultMessage.innerText = 'Congratulations! You have reached the maximum level.';
            // Store the reward in cache
            const rewards = JSON.parse(localStorage.getItem('rewards')) || { recompense: [] };
            rewards.recompense.push(`word1.png`);
            localStorage.setItem('rewards', JSON.stringify(rewards));
            resultMessage.appendChild(backButton);
        }
    } else {
        resultMessage.style.color = 'red';
        resultMessage.innerText = 'Lost this time. Try again!';
        // Remove the last reward from JSON
        const rewards = JSON.parse(localStorage.getItem('rewards')) || { recompense: [] };
        if (rewards.recompense.length > 0) {
            rewards.recompense.pop(); // Remove the last reward
            localStorage.setItem('rewards', JSON.stringify(rewards));
        }
        resultMessage.appendChild(backButton);
    }
}

function clearResultMessage() {
    document.getElementById('result-message').innerText = '';
}
