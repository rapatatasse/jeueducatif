let level = 1;
let playerLives = 5;
let opponentLives = 5;
let missingIndex = -1;

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
        companionImage.src = `image/${lastReward}`;
    } else {
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
        updateLifeBar('opponentLifeBar', opponentLives);
    } else {
        playerLives--;
        console.log("incorrect");
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
    updateLifeBar('playerLifeBar', playerLives);
    updateLifeBar('opponentLifeBar', opponentLives);
}

function updateLifeBar(lifeBarId, lives) {
    console.log("updateLifeBar", lifeBarId, lives);
    const lifeBar = document.getElementById(lifeBarId);
    const hearts = '❤'.repeat(lives);
    lifeBar.innerText = hearts;
}

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

    // Sélectionner la lettre manquante automatiquement en séquence
    missingIndex = Math.floor(Math.random() * alphabetArray.length);

    let questionString = '';
    for (let i = 0; i < alphabetArray.length; i++) {
        if (i === missingIndex) {
            questionString += ' ? ';
        } else {
            questionString += alphabetArray[i] + ' ';
        }
    }

    const correctAnswer = alphabetArray[missingIndex];
    document.getElementById('question').innerText = questionString.trim();
    document.getElementById('question').setAttribute('data-answer', correctAnswer);

    // Générer six lettres aléatoires comme options
    const answerOptions = [];
    while (answerOptions.length < 5) {
        const randomIndex = Math.floor(Math.random() * alphabetArray.length);
        const randomLetter = alphabetArray[randomIndex];
        if (randomLetter !== correctAnswer && !answerOptions.includes(randomLetter)) {
            answerOptions.push(randomLetter);
        }
    }
    answerOptions.push(correctAnswer); // Ajouter la bonne réponse
    answerOptions.sort();

    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = ''; // Effacer les réponses précédentes

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
    backButton.classList.add('back-button');
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    const blocquestion = document.getElementById('answers');
    blocquestion.style.display = 'none';

    if (isPlayerWinner) {
        resultMessage.style.color = 'green';
        if (level < 3) {
            resultMessage.innerText = 'Bravo!';
        } else {
            const rewards = JSON.parse(localStorage.getItem('rewards')) || { recompense: [] };
            if (!rewards.recompense.includes("alpha1.png")) {
                resultMessage.innerText = 'Bravo! Vous avez atteint le niveau maximum.';
                var lineBreak = document.createElement('br');
                resultMessage.appendChild(lineBreak);
                rewards.recompense.push("alpha1.png");
                localStorage.setItem('rewards', JSON.stringify(rewards));
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

async function checkAnswer(playerAnswer) {
    const correctAnswer = document.getElementById('question').getAttribute('data-answer');
    console.log(!isNaN(playerAnswer));
    await pause();
    var audio = new Audio('son/coup.mp3');
    audio.play();
   
    if (playerAnswer === correctAnswer) {
        opponentLives--;
        console.log("correct");
        updateLifeBar('opponentLifeBar', opponentLives);
        const alphaImage = document.getElementById('companion2').querySelector('img');
        alphaImage.classList.add('shake');
        setTimeout(() => {
            alphaImage.classList.remove('shake');
        }, 1000);
    } else {
        playerLives--;
        console.log("incorrect");
        updateLifeBar('playerLifeBar', playerLives);
        const companionImage = document.getElementById('companion1').querySelector('img');
        companionImage.classList.add('shake');
        setTimeout(() => {
            companionImage.classList.remove('shake');
        }, 1000);
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

