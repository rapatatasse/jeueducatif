// Liste de mots pour le jeu du pendu
const hangmanWords = ["maison", "chien", "Arbre", "Soleil", "Fleurs", "ecole", "velo"];
let level = 1;
let playerLives = 5;
let opponentLives = 5;


// Chemins d'accès des images associées aux mots
const wordImages = {
    "maison": "image/pendu/maison.jpg",
    "chien": "image/pendu/chien.jpg",
    "Arbre": "image/pendu/Arbre.jpg",
    "Soleil": "image/pendu/Soleil.png",
    "Fleurs": "image/pendu/Fleurs.jpg",
    "ecole": "image/pendu/ecole.jpg",
    "velo": "image/pendu/velo.jpg"
};

function generateQuestion() {
// Mot à deviner


  // Tableau des mots
  var words = ["chat", "chien", "maison", "arbre", "soleil", "fleur", "école", "vélo"];

  // Référence au conteneur des boutons
  var buttonsContainer = document.getElementById('buttonsContainer');
  buttonsContainer.innerHTML = '';
  // Créer les boutons dynamiquement
  words.forEach(function(word) {
      var button = document.createElement('button');
      button.textContent = word.charAt(0).toUpperCase() + word.slice(1); // Mettre la première lettre en majuscule
      button.setAttribute('onclick', "checkWord('" + word + "')");
      buttonsContainer.appendChild(button);
  });
}
// Fonction de vérification de mot (juste pour l'exemple)
function checkWord(playerAnswer) {
    const nomdelimage = document.getElementById("wordImage").src
    const match = nomdelimage.match(/\/([^\/]+)\.\w+$/)[1];
    console.log("Vous avez cliqué sur le mot :", match);
    console.log("l'image est  :", match);
    


      // Ajoutez ici votre propre logique de vérification
      if (playerAnswer === match) {
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

// Initialisation du jeu du pendu
function initializeHangmanGame() {
    // Sélection aléatoire d'un mot à deviner
    hangmanWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];

    // Affichage de l'image associée au mot à deviner
    const img = document.getElementById('wordImage');
    img.src = wordImages[hangmanWord]; // Récupère le chemin d'accès de l'image associée au mot
    img.alt = hangmanWord; // Utilise le mot comme texte alternatif de l'image

        

    // Affichage de l'image associée au mot
    const hangmanImage = document.getElementById('wordImage');
    hangmanImage.src = wordImages[hangmanWord];

    // Création des boutons pour les lettres

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
function updateLifeBar(lifeBarId, lives) {
    const lifeBar = document.getElementById(lifeBarId);
    const hearts = '❤'.repeat(lives);
    lifeBar.innerText = hearts;
}

// Appel de la fonction d'initialisation du jeu du pendu au chargement de la page
document.addEventListener('DOMContentLoaded', initializeHangmanGame);
generateQuestion()
// Fonction pour mettre à jour l'image en fonction de la réponse correcte
function updateImage(correctAnswer) {
    let newImagePath = ""; // Chemin d'accès de la nouvelle image

    // Déterminez quelle image afficher en fonction de la réponse correcte
    switch (correctAnswer.toLowerCase()) {
        case "maison":
            newImagePath = "image/pendu/maison.jpg";
            break;
        case "chien":
            newImagePath = "image/pendu/chien.jpg";
            break;
        case "arbre":
            newImagePath = "image/pendu/arbre.jpg";
            break;
        // Ajoutez d'autres cas pour d'autres réponses correctes et images
        default:
            // Par défaut, utilisez une image générique ou l'image actuelle
            newImagePath = "image/pendu/default.jpg";
            break;
    }

    // Mettez à jour l'élément d'image avec le nouveau chemin d'accès
    const imageElement = document.getElementById("wordImage");
    imageElement.src = newImagePath;
}

// Utilisation de la fonction dans votre fonction de vérification de réponse
function checkAnswer(playerAnswer) {
    // Obtenez la réponse correcte en fonction de l'image actuelle
    const correctAnswer = document.getElementById("wordImage").alt;

    // Vérifiez si la réponse du joueur correspond à la réponse correcte
    if (playerAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        // Si la réponse est correcte, mettez à jour l'image
        updateImage(correctAnswer);
        // Autres actions à effectuer pour une réponse correcte
    } else {
        // Autres actions à effectuer pour une réponse incorrecte
    }
}
