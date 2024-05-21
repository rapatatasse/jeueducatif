let level = 1;
let playerLives = 5;
let opponentLives = 1;
// Liste de mots anglais et leurs traductions en français
const mots = {
    "cat": "chat",
    "dog": "chien",
    "bird": "oiseau",
    "tree": "arbre",
    "house": "maison",
    "car": "voiture",
    "book": "livre",
    "computer": "ordinateur",
    "sun": "soleil",
    "moon": "lune",
    "water": "eau",
    "flower": "fleur",
    "chair": "chaise",
    "table": "table",
    "music": "musique",
    "pen": "stylo",
    "phone": "téléphone",
    "shoes": "chaussures",
    "hat": "chapeau",
    "cloud": "nuage"
};

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

function updateLifeBar(lifeBarId, lives) {
    const lifeBar = document.getElementById(lifeBarId);
    const hearts = '❤'.repeat(lives);
    lifeBar.innerText = hearts;
}

// Mélange aléatoire des mots
const motsAnglais = Object.keys(mots);
const motsMelanges = shuffle(motsAnglais);

let currentQuestionIndex = 0;

// Fonction pour mélanger un tableau
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Affiche la question actuelle
function afficherQuestion() {
    const motAnglais = motsMelanges[currentQuestionIndex];
    const traductionCorrecte = mots[motAnglais];
    const choixIncorrects = Object.values(mots).filter(mot => mot !== traductionCorrecte);
    const choixAleatoires = getRandomChoices(choixIncorrects, 3);
    const choix = shuffle([traductionCorrecte, ...choixAleatoires]);

    document.getElementById('question').innerHTML = `Quelle est la traduction de "${motAnglais}" en français ?`;
    document.getElementById('choices').innerHTML = '';

    choix.forEach(traduction => {
        const bouton = document.createElement('button');
        bouton.innerHTML = traduction;
        bouton.onclick = function() {
            verifierReponse(traduction === traductionCorrecte);
        };
        document.getElementById('choices').appendChild(bouton);
    });
}

function getRandomChoices(choices, count) {
    const shuffledChoices = shuffle(choices);
    return shuffledChoices.slice(0, count);
}

// Vérifie la réponse et affiche le résultat
function verifierReponse(correct) {
    if (correct) {
        document.getElementById('result').innerHTML = "Correct!";
        opponentLives--;
        updateLifeBar('opponentLifeBar', opponentLives);
    } else {
        document.getElementById('result').innerHTML = "Incorrect.";
        playerLives--;
        updateLifeBar('playerLifeBar', playerLives);
    }
    currentQuestionIndex++;

    if (currentQuestionIndex < motsMelanges.length) {
        setTimeout(afficherQuestion, 1000); // Affiche la prochaine question après 1 seconde
    } else {
        document.getElementById('question').innerHTML = '';
        document.getElementById('choices').innerHTML = '';
        document.getElementById('result').innerHTML = '';
    }
    console.log("vie opposant"+opponentLives)
    if (opponentLives === 0) {
            displayResultMessage(true);
        }
    else if (playerLives <= 0) {
        displayResultMessage(false);
    } else {
        afficherQuestion();
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
        if (level === 1) {
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

// Démarrer le jeu
afficherQuestion();