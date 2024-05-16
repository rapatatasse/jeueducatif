let level = 1;
let playerLives = 5;
let opponentLives = 1;
let tableauimage =["image/france.png", "image/italie.png", "image/etats-unis.png", "image/allemagne.png"]

document.addEventListener('DOMContentLoaded', () => {
    startGame();
    loadLastPokemonReward();
});
function loadLastPokemonReward() {
    const rewards = JSON.parse(localStorage.getItem('rewards')) || { recompense: [] };

    const lastReward = rewards.recompense.length > 0 ? rewards.recompense[rewards.recompense.length - 1] : null;

    if (lastReward) {
        const companionImage = document.getElementById('companion1').querySelector('img');
        companionImage.src = `image/${lastReward}`;
    } else {
        // Si aucune récompense n'est stockée, utilisez l'image de companion1.png
        const companionImage = document.getElementById('companion1').querySelector('img');
        companionImage.src = 'image/companion1.png';
    }
}


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
            if (level < 3) {
                level++;
                changePokemonImage(level);
                updateleveltexte(level);
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

function updateleveltexte(level) {
    const leveltexte = document.getElementById('leveltexte');
    leveltexte.innerText = level;
}


function changePokemonImage(level) {
    const companionImage = document.getElementById('companion2').querySelector('img');
    companionImage.src = `image/geo${level}.png`;
}

function resetLives() {
    playerLives = 5;
    opponentLives = 1;

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
    // Génère un index aléatoire pour choisir une image dans le tableau
    var randomIndex = Math.floor(Math.random() * tableauimage.length);
    // Met à jour la source de l'image avec l'image aléatoire
    document.getElementById('questionimage').src = tableauimage[randomIndex];
    document.getElementById('addition').setAttribute('data-answer', correctAnswer);
}

// Appelle la fonction generateQuestion() pour générer une question au démarrage ou à chaque fois que nécessaire
generateQuestion();

function displayResultMessage(isPlayerWinner) {
    const resultMessage = document.getElementById('result-message');
    const backButton = document.createElement('button');
    backButton.innerText = 'Retour à la carte';
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
            resultMessage.innerText = 'Bravo!';
            gamesWon.innerText =  Math.floor(gamesWon.innerText) + 1;
        } else {
            resultMessage.innerText = 'Bravo! Vous avez atteint le niveau maximum.';
            // Stocker la récompense dans le cache
            const rewards = JSON.parse(localStorage.getItem('rewards')) || { recompense: [] };
            rewards.recompense.push(`geo1.png`);
            localStorage.setItem('rewards', JSON.stringify(rewards));
            // Ajouter le bouton de retour
            resultMessage.appendChild(backButton);
        }
    } else {
        resultMessage.style.color = 'red';
        resultMessage.innerText = 'Perdu pour cette fois. Recommencez!';
        // Supprimer la dernière récompense du JSON
        const rewards = JSON.parse(localStorage.getItem('rewards')) || { recompense: [] };
        if (rewards.recompense.length > 0) {
            rewards.recompense.pop(); // Supprimer la dernière récompense
            localStorage.setItem('rewards', JSON.stringify(rewards));
        }
        resultMessage.appendChild(backButton);
    }
}


function clearResultMessage() {
    document.getElementById('result-message').innerText = '';
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    startGame();
});
