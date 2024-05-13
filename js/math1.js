let level = 1;
let playerLives = 5;
let opponentLives = 5;
let varniveaudecarte = niveaudecarte()
let varimageniveau = imageduniveau() 
let difficulte = testdifficulte()
let progressWidth = 0;
let progressInterval = null;


const progressBar = document.getElementById('progressbar');



document.addEventListener('DOMContentLoaded', () => {
    testdifficulte(); //ajout barre de temps pour chaque question
    startGame();
    loadLastPokemonReward();
});

function testdifficulte() {
    let rewards = JSON.parse(localStorage.getItem('rewards')) || { recompense: [] };
    if (!rewards.recompense.includes(varimageniveau)) {
        return true
    }
    else {
        return false
    }
}

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
        generateQuestionNiveau1();
    }
    else if (varniveaudecarte === 2) {
        generateQuestionNiveau2();
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
    
    let rewards = JSON.parse(localStorage.getItem('rewards')) || { recompense: [] };
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
    arreterProgression()
    const correctAnswer = parseInt(document.getElementById('question').getAttribute('data-answer'));
    await pause();
    var audio = new Audio('son/coup.mp3');
    //audio.play();
    
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
            if (varniveaudecarte === 1) {
                generateQuestionNiveau1();
            }
            else if (varniveaudecarte === 2) {
                generateQuestionNiveau2();
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
    console.log("mise a jour vie : "+lifeBarId+"vie : "+lives)
    const lifeBar = document.getElementById(lifeBarId);
    const hearts = '❤'.repeat(lives);
    lifeBar.innerText = hearts;
}

function generateQuestionNiveau1() {
    
    const maxSum = level === 1 ? 5 : (level === 2 ? 8 : 10);
    console.log("level"+level)
    const num1 = Math.floor(Math.random() * (maxSum - 1)) + 1;
    const num2 = Math.floor(Math.random() * (maxSum - num1 )) + 1;
    const correctAnswer = num1 + num2;

    document.getElementById('question').innerText = `${num1} + ${num2} = ?`;
    document.getElementById('question').setAttribute('data-answer', correctAnswer);

    // Gestion du temps
    let progressWidth = 0;
    const progressBar = document.getElementById('progressbar');

    if (!progressInterval) { // Vérifie si l'intervalle n'existe pas déjà
        progressInterval = setInterval(() => {
            if (progressWidth < 100) {
                progressWidth += 10;
                progressBar.style.width = progressWidth + '%';
            } else {
            clearInterval(progressInterval); // Arrêter l'interval une fois la progression à 100%
            checkAnswer("pas de reponse joueur"); // Appeler la fonction de vérification de la réponse
            progressInterval = null; // Réinitialise progressInterval pour permettre de redémarrer la progression
            return;
        }
    }, 1000);
}
}
function arreterProgression() {
    clearInterval(progressInterval); // Arrêter l'intervalle lorsqu'on clique sur le bouton
    progressInterval = null; // Réinitialise progressInterval
}

async function generateQuestionNiveau2() {
    const maxSum = level === 1 ? 5 : (level === 2 ? 8 : 10);
    const num1 = Math.floor(Math.random() * maxSum) + 1;
    const num2 = Math.floor(Math.random() * num1) + 1; // Assurez-vous que num2 est inférieur à num1 pour éviter des résultats négatifs
    const correctAnswer = num1 - num2; // Utilisez la soustraction pour obtenir la réponse correcte

    document.getElementById('question').innerText = `${num1} - ${num2} = ?`;
    document.getElementById('question').setAttribute('data-answer', correctAnswer);
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
    let rewards = JSON.parse(localStorage.getItem('rewards')) || { recompense: [] };

    if (isPlayerWinner) {
        
        resultMessage.style.color = 'green';
        if (level < 3) {
            resultMessage.innerText = 'Bravo!';
            gamesWon.innerText =  Math.floor(gamesWon.innerText) + 1;
        } else {

            
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
            resolve();
        }, 500);
    });
}