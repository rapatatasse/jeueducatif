// Constants and global variables
const hangmanWords = ["maison", "chien", "Arbre", "Soleil", "Fleurs", "ecole", "velo"];
const wordImages = {
    "maison": "image/pendu/maison.jpg",
    "chien": "image/pendu/chien.jpg",
    "Arbre": "image/pendu/Arbre.jpg",
    "Soleil": "image/pendu/Soleil.png",
    "Fleurs": "image/pendu/Fleurs.jpg",
    "ecole": "image/pendu/ecole.jpg",
    "velo": "image/pendu/velo.jpg"
};

let level = 1;
let playerLives = 5;
let opponentLives = 5;
let hangmanWord = "";

// Display result message based on game outcome
function displayResultMessage(isPlayerWinner) {
    const resultMessage = document.getElementById('result-message');
    const backButton = document.createElement('button');
    backButton.innerText = 'Retour à la carte';
    backButton.classList.add('backbutton');
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    if (isPlayerWinner) {
        resultMessage.style.color = 'green';
        if (level < 3) {
            resultMessage.innerText = 'Bravo!';
            const gamesWon = document.getElementById('gamesWon');
            gamesWon.innerText = parseInt(gamesWon.innerText) + 1;
        } else {
            const rewards = JSON.parse(localStorage.getItem('rewards')) || { recompense: [] };
            const varimageniveau = hangmanWord.toLowerCase();
            if (!rewards.recompense.includes(varimageniveau)) {
                resultMessage.innerText = 'Bravo! Vous avez atteint le niveau maximum.';
                resultMessage.appendChild(document.createElement('br'));
                rewards.recompense.push(varimageniveau);
                localStorage.setItem('rewards', JSON.stringify(rewards));
                resultMessage.appendChild(backButton);
            } else {
                resultMessage.innerText = 'Compagnon déjà gagné!';
                resultMessage.appendChild(document.createElement('br'));
                resultMessage.appendChild(backButton);
            }
        }
    } else {
        resultMessage.style.color = 'red';
        resultMessage.innerText = 'Perdu pour cette fois. Recommencez!';
        resultMessage.appendChild(document.createElement('br'));
        const rewards = JSON.parse(localStorage.getItem('rewards')) || { recompense: [] };
        if (rewards.recompense.length > 0) {
            rewards.recompense.pop();
            localStorage.setItem('rewards', JSON.stringify(rewards));
        }
        resultMessage.appendChild(backButton);
    }
}

// Initialize the hangman game
function initializeHangmanGame() {
    hangmanWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
    const img = document.getElementById('wordImage');
    img.src = wordImages[hangmanWord];
    img.alt = hangmanWord;

    generateQuestion();
}

// Generate buttons for words
function generateQuestion() {
    const words = ["chat", "chien", "maison", "arbre", "soleil", "fleur", "école", "vélo"];
    const buttonsContainer = document.getElementById('buttonsContainer');
    buttonsContainer.innerHTML = '';

    words.forEach(word => {
        const button = document.createElement('button');
        button.textContent = word.charAt(0).toUpperCase() + word.slice(1);
        button.setAttribute('onclick', `checkWord('${word}')`);
        buttonsContainer.appendChild(button);
    });
}

// Check the player's word
function checkWord(playerAnswer) {
    const match = hangmanWord.toLowerCase();
    if (playerAnswer === match) {
        opponentLives--;
        updateLifeBar('opponentLifeBar', opponentLives);
    } else {
        playerLives--;
        updateLifeBar('playerLifeBar', playerLives);
    }

    if (opponentLives <= 0) {
        if (level < 3) {
            level++;
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

// Update life bar display
function updateLifeBar(lifeBarId, lives) {
    const lifeBar = document.getElementById(lifeBarId);
    lifeBar.innerText = '❤'.repeat(lives);
}

// Start the game
function startGame() {
    playerLives = 5;
    opponentLives = 5;
    initializeHangmanGame();
}

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', initializeHangmanGame);
