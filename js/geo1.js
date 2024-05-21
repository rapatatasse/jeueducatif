const wordImageseurope = [
    { word: "Etats-unis", image: "image/geo/etats-unis.png" },
    { word: "France", image: "image/geo/france.png" },
    { word: "Allemagne", image: "image/geo/allemagne.png" },
    { word: "Italie", image: "image/geo/italie.png" }
];

const wordImagesamerique = [
    { word: "Canada", image: "image/geo/canada.png" },
    { word: "Mexique", image: "image/geo/mexique.png" },
    { word: "Bresil", image: "image/geo/bresil.png" },
    { word: "Argentine", image: "image/geo/argentine.png" }
];

const wordImagesasie = [
    { word: "Chine", image: "image/geo/chine.png" },
    { word: "Japon", image: "image/geo/japon.png" },
    { word: "Inde", image: "image/geo/inde.png" },
    { word: "France", image: "image/geo/france.png" }
];

let level = 1;
let playerLives = 5;
let opponentLives = 5;
let currentWordIndex;

function generateQuestion() {
    const buttonsContainer = document.getElementById('buttonsContainer');
    buttonsContainer.innerHTML = '';

    let currentWord;
    if (level === 1) {
        currentWordIndex = Math.floor(Math.random() * wordImageseurope.length);
        currentWord = wordImageseurope[currentWordIndex];
    } else if (level === 2) {
        currentWordIndex = Math.floor(Math.random() * wordImagesamerique.length);
        currentWord = wordImagesamerique[currentWordIndex];
    } else {
        currentWordIndex = Math.floor(Math.random() * wordImagesasie.length);
        currentWord = wordImagesasie[currentWordIndex];
    }

    document.getElementById('wordImage').src = currentWord.image;

    const answerOptions = [];
    answerOptions.push(currentWord.word);

    while (answerOptions.length < 4) {
        const randomIndex = Math.floor(Math.random() * (
            level === 1 ? wordImageseurope.length : 
            level === 2 ? wordImagesamerique.length : 
            wordImagesasie.length));
        
        const randomWord = (level === 1 ? wordImageseurope : 
                            level === 2 ? wordImagesamerique : 
                            wordImagesasie)[randomIndex].word;
        
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

    changePokemonImage(level);
}

function checkAnswer(selectedAnswer) {
    const correctAnswer = (level === 1 ? wordImageseurope : 
                          level === 2 ? wordImagesamerique : 
                          wordImagesasie)[currentWordIndex].word;

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

function displayResultMessage(isPlayerWinner) {
    const resultMessage = document.getElementById('result-message');
    resultMessage.innerText = isPlayerWinner ? "Bravo ! Vous avez gagné !" : "Désolé, vous avez perdu. Essayez à nouveau !";
}

function resetGame() {
    playerLives = 5;
    opponentLives = 5;
    updateLifeBar('playerLifeBar', playerLives);
    updateLifeBar('opponentLifeBar', opponentLives);
    generateQuestion();
}

function changePokemonImage(level) {
    const pokemonImage = document.getElementById('pokemonImage');
    const companion2 = document.getElementById('companion2').querySelector('img');
    if (companion2) {
        if (level === 1) {
            companion2.src = 'image/geo/monstre1.png';
        } else if (level === 2) {
            companion2.src = 'image/geo/monstre2.png';
        } else {
            companion2.src = 'image/geo/monstre3.png';
        }
    } else {
        console.error("Element with ID 'companion2' not found.");
    }
}

document.addEventListener('DOMContentLoaded', generateQuestion);