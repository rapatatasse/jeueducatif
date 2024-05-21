var words = ["maison", "chien", "Arbre", "Soleil", "Fleurs", "ecole", "velo"];
var images = ["image/pendu/maison.jpg", "image/pendu/chien.jpg", "image/pendu/Arbre.jpg", "image/pendu/Soleil.png", "image/pendu/Fleurs.jpg", "image/pendu/ecole.jpg", "image/pendu/velo.jpg"];

var randomIndex = Math.floor(Math.random() * words.length);
var randomWord = words[randomIndex].toUpperCase(); // Convertir en majuscules pour l'affichage
var randomImage = images[randomIndex]; // Sélectionner l'image correspondante

document.getElementById("addition").textContent = randomWord;

// Charger l'image aléatoire
var img = document.getElementById("wordImage");
img.src = "image/pendu/" + randomImage;

function checkWord(word) {
    var selectedWord = word.toUpperCase(); // Convertir en majuscules pour la comparaison
    if (selectedWord === randomWord) {
        document.getElementById("result-message").textContent = "Correct !";
        // Réduire le nombre de cœurs dans la barre de vie
        reduceOpponentLife();
    } else {
        document.getElementById("result-message").textContent = "Incorrect. Essayez encore.";
    }
}

function reduceOpponentLife() {
    // Récupérer l'élément de la barre de vie de l'opposant
    var lifeBar = document.getElementById("opponentLifeBar");
    
    // Supprimer un cœur en enlevant un caractère du contenu de la barre de vie
    lifeBar.textContent = lifeBar.textContent.slice(0, -1);
}
