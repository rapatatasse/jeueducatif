let level = 1;
let playerLives = 5;
let opponentLives = 5;
let varniveaudecarte = niveaudecarte()
let varimageniveau = imageduniveau() 

document.addEventListener('DOMContentLoaded', () => {
    startGame();
    loadLastPokemonReward();
});
function imageduniveau(){
     if (varniveaudecarte === 1) {
        return "math1.png";
    }
    else if (varniveaudecarte === 2) {
        return "math.n2.1.png";
    }
}

function startGame() {
    resetLives(); 
    if (varniveaudecarte === 1) {
        generateQuestioNiveau1();
    }
    else if (varniveaudecarte === 2) {
        generateQuestioNiveau2();
    }
    clearResultMessage();
}
function niveaudecarte() {
    const currentUrl = window.location.href;
    const fileName = currentUrl.split('/').pop(); // Split the URL by '/' and get the last element (filename)
    if (fileName === "math1.html") {
        return 1
    }
    if (fileName === "math2.html") { 
        return 2
    }  

}
function loadLastPokemonReward() {
    const rewards = JSON.parse(localStorage.getItem('rewards')) || { recompense: [] };

    const lastReward = rewards.recompense.length > 0 ? rewards.recompense[rewards.recompense.length - 1] : null;

    if (lastReward) {
        const companionImage = document.getElementById('companion1').querySelector('img');
        companionImage.src = `image/math/${lastReward}`;
    } else {
        // Si aucune récompense n'est stockée, utilisez l'image de companion1.png
        const companionImage = document.getElementById('companion1').querySelector('img');
        companionImage.src = 'image/companion1.png';
    }
}



async function checkAnswer(playerAnswer) {
    const correctAnswer = parseInt(document.getElementById('addition').getAttribute('data-answer'));
    await pause();
    var audio = new Audio('son/coup.mp3');
    audio.play();
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
    if (varniveaudecarte === 1) {
        companionImage.src = `image/math/math${level}.png`;
    }
    else if (varniveaudecarte === 2) {
        companionImage.src = `image/math/math.n2.${level}.png`;
    }
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

function generateQuestioNiveau1() {
    const maxSum = level === 1 ? 5 : (level === 2 ? 8 : 10);
    console.log("level"+level)
    const num1 = Math.floor(Math.random() * (maxSum - 1)) + 1;
    const num2 = Math.floor(Math.random() * (maxSum - num1 )) + 1;
    const correctAnswer = num1 + num2;

    document.getElementById('addition').innerText = `${num1} + ${num2} = ?`;
    document.getElementById('addition').setAttribute('data-answer', correctAnswer);
}
function generateQuestioNiveau2() {
    const maxSum = level === 1 ? 5 : (level === 2 ? 8 : 10);
    const num1 = Math.floor(Math.random() * maxSum) + 1;
    const num2 = Math.floor(Math.random() * num1) + 1; // Assurez-vous que num2 est inférieur à num1 pour éviter des résultats négatifs
    const correctAnswer = num1 - num2; // Utilisez la soustraction pour obtenir la réponse correcte

    document.getElementById('addition').innerText = `${num1} - ${num2} = ?`;
    document.getElementById('addition').setAttribute('data-answer', correctAnswer);
}

function displayResultMessage(isPlayerWinner) {
    const resultMessage = document.getElementById('result-message');
    const backButton = document.createElement('button');
    backButton.innerText = 'Retour à la carte';
    backButton.classList.add('backbutton');
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    const blocquestion = document.getElementById('answers');
    blocquestion.style.display = 'none';

    if (isPlayerWinner) {
        
        resultMessage.style.color = 'green';
        if (level < 3) {
            resultMessage.innerText = 'Bravo!';
            gamesWon.innerText =  Math.floor(gamesWon.innerText) + 1;
        } else {
            const rewards = JSON.parse(localStorage.getItem('rewards')) || { recompense: [] };
            
            if (!rewards.recompense.includes(varimageniveau)) {
                resultMessage.innerText = 'Bravo! Vous avez atteint le niveau maximum.';
                var lineBreak = document.createElement('br');
                resultMessage.appendChild(lineBreak);
                // Ajouter "math1.png" aux récompenses
                rewards.recompense.push(varimageniveau);
                localStorage.setItem('rewards', JSON.stringify(rewards));
                // Ajouter le bouton de retour
                resultMessage.appendChild(backButton);
            } else {
                resultMessage.innerText = 'Compagnon déjà gagné!';
                var lineBreak = document.createElement('br');
                resultMessage.appendChild(lineBreak);
                resultMessage.appendChild(backButton);
            }

        }
    } else {
        resultMessage.style.color = 'red';
        resultMessage.innerText = 'Perdu pour cette fois. Recommencez!';
        var lineBreak = document.createElement('br');
        resultMessage.appendChild(lineBreak);
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

function pause() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Après 2 secondes");
            resolve();
        }, 500);
    });
}
