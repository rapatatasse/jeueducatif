var words = ["chat", "chien", "maison", "arbre", "soleil", "fleur", "école", "vélo"];

var randomIndex = Math.floor(Math.random() * words.length);
var randomWord = words[randomIndex].toUpperCase(); // Convertir en majuscules pour l'affichage
document.getElementById("addition").textContent = randomWord.replace(/[A-Za-z]/g, "_ ");
document.getElementById("addition").setAttribute("data-answer", randomIndex + 1); // Index de base 1

function checkWord(word) {
    var answer = parseInt(document.getElementById("addition").getAttribute("data-answer"));
    var selectedWord = word.toUpperCase(); // Convertir en majuscules pour la comparaison
    if (selectedWord === randomWord) {
        document.getElementById("result-message").textContent = "Correct !";
    } else {
        document.getElementById("result-message").textContent = "Incorrect. Essayez encore.";
    }
}
