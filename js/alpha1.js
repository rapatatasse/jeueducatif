let level = 1;
let playerLives = 5;
let opponentLives = 5;
let missingIndex = 0;


document.addEventListener('DOMContentLoaded', () => {
    startGame();
    loadLastPokemonReward();
});

function startGame() {
    resetLives(); 
    generateQuestion();
    clearResultMessage();
}

function loadLastPokemonReward() {
    const rewards = JSON.parse(localStorage.getItem('rewards')) || { recompense: [] };

    const lastReward = rewards.recompense.length > 0 ? rewards.recompense[rewards.recompense.length - 1] : null;

    if (lastReward) {
        const companionImage = document.getElementById('companion1').querySelector('img');
        companionImage.src = `image/alpha/${lastReward}`;
    } else {
        // Si aucune récompense n'est stockée, utilisez l'image de companion1.png
        const companionImage = document.getElementById('companion1').querySelector('img');
        companionImage.src = 'image/companion1.png';
    }
}

async function checkAnswer(playerAnswer) {
    const correctAnswer = document.getElementById('question').getAttribute('data-answer');
    console.log(!isNaN(playerAnswer));
    await pause();
    var audio = new Audio('son/coup.mp3');
    audio.play();
   
        if (playerAnswer === correctAnswer) {
            opponentLives--;
            console.log("correct");
            // Mise à jour de la vie de l'adversaire dans l'interface
            updateLifeBar('opponentLifeBar', opponentLives);
        } else {
            playerLives--;
            console.log("incorrect");
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

function updateleveltexte(level) {
    const leveltexte = document.getElementById('leveltexte');
    leveltexte.innerText = level;
}


function changePokemonImage(level) {
    const companionImage = document.getElementById('companion2').querySelector('img');
   
    companionImage.src = `image/alpha/alpha${level}.png`;
   
}

function resetLives() {
    playerLives = 5;
    opponentLives = 5;

    // Mettez à jour les barres de vie dans l'interface
    updateLifeBar('playerLifeBar', playerLives);
    updateLifeBar('opponentLifeBar', opponentLives);
}

function updateLifeBar(lifeBarId, lives) {
    console.log("updateLifeBar", lifeBarId, lives);
    const lifeBar = document.getElementById(lifeBarId);
    const hearts = '❤'.repeat(lives);
    lifeBar.innerText = hearts;
}

// Fonction pour générer une question en fonction du niveau
function generateQuestion() {
    console.log("generateQuestion");
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let startIndex, endIndex;

    if (level === 1) {
        startIndex = 0;
        endIndex = 7;
    } else if (level === 2) {
        startIndex = 7;
        endIndex = 15;
    } else {
        startIndex = 15;
        endIndex = alphabet.length - 1;
    }

    const alphabetArray = alphabet.split('').slice(startIndex, endIndex + 1);
    let testlettre = Math.floor(Math.random() * alphabetArray.length);
    while (testlettre === missingIndex) {
        testlettre = Math.floor(Math.random() * alphabetArray.length);
    }
    missingIndex = testlettre;
    let questionString = '';
    for (let i = 0; i < alphabetArray.length; i++) {
        if (i === missingIndex) {
            questionString += ' ?  ';
        } else {
            questionString += alphabetArray[i] + '  ';
        }
    }

    const correctAnswer = alphabetArray[missingIndex];
    document.getElementById('question').innerText = questionString;
    document.getElementById('question').setAttribute('data-answer', correctAnswer);

    // Generate six random letters as options
    const answerOptions = [];
    while (answerOptions.length < 5) {
        const randomIndex = Math.floor(Math.random() * alphabetArray.length);
        const randomLetter = alphabetArray[randomIndex];
        if (randomLetter !== correctAnswer && !answerOptions.includes(randomLetter)) {
            answerOptions.push(randomLetter);
        }
    }
    answerOptions.push(correctAnswer); // Add the correct answer
    answerOptions.sort(() => Math.random() - 0.5); // Shuffle the options

    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = ''; // Clear previous answers

    answerOptions.forEach(letter => {
        const button = document.createElement('button');
        button.innerText = letter;
        button.setAttribute('onclick', `checkAnswer('${letter}')`);
        answersContainer.appendChild(button);
    });
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
            
            if (!rewards.recompense.includes("alpha1.png")) {
                resultMessage.innerText = 'Bravo! Vous avez atteint le niveau maximum.';
                var lineBreak = document.createElement('br');
                resultMessage.appendChild(lineBreak);
                rewards.recompense.push("alpha1.png");
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
        }, 300);
    });
}
