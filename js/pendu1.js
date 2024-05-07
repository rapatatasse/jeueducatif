// Liste de mots pour le jeu du pendu
const hangmanWords = ["POKEMON", "PIKACHU", "BULBASAUR", "CHARIZARD", "SQUIRTLE"];

// Mot à deviner
let hangmanWord = "";

// Initialisation du jeu du pendu
function initializeHangmanGame() {
    // Sélection aléatoire d'un mot à deviner
    hangmanWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];

    // Affichage des tirets pour représenter les lettres du mot à deviner
    const hangmanWordContainer = document.getElementById('hangman-word');
    hangmanWordContainer.innerHTML = hangmanWord.split('').map(letter => '_').join(' ');

    // Création des boutons pour les lettres
    const letterButtonsContainer = document.getElementById('letter-buttons');
    letterButtonsContainer.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => checkLetter(letter));
        letterButtonsContainer.appendChild(button);
    }
}

// Vérification de la lettre choisie par le joueur
function checkLetter(letter) {
    const hangmanWordContainer = document.getElementById('hangman-word');
    const hangmanWordArray = hangmanWord.split('');
    const updatedWordArray = hangmanWordContainer.textContent.split(' ');

    // Vérification si la lettre est présente dans le mot à deviner
    let found = false;
    for (let i = 0; i < hangmanWordArray.length; i++) {
        if (hangmanWordArray[i] === letter) {
            updatedWordArray[i] = letter;
            found = true;
        }
    }

    // Mise à jour de l'affichage du mot à deviner
    hangmanWordContainer.textContent = updatedWordArray.join(' ');

    // Vérification si le joueur a gagné ou perdu
    if (!updatedWordArray.includes('_')) {
        displayHangmanResult(true);
    } else if (!found) {
        // Gérer les tentatives incorrectes ici
    }
}

// Affichage du résultat du jeu du pendu
function displayHangmanResult(isWinner) {
    const resultContainer = document.getElementById('hangman-result');
    if (isWinner) {
        resultContainer.textContent = "Bravo ! Vous avez gagné !";
    } else {
        resultContainer.textContent = "Désolé, vous avez perdu. Essayez à nouveau !";
    }
}

// Appel de la fonction d'initialisation du jeu du pendu au chargement de la page
document.addEventListener('DOMContentLoaded', initializeHangmanGame);
