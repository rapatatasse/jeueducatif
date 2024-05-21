document.addEventListener('DOMContentLoaded', () => {
    loadRewards();
    hiddenButtonOnMap();
});

function loadRewards() {
    const rewards = JSON.parse(localStorage.getItem('rewards')) || { recompense: [] };
    const clearRewardsButton = document.getElementById('clearRewardsButton');

    // Affichez les récompenses dans la console
    console.log(rewards);
    rewards.recompense.forEach((reward, index) => {
        const rewardDiv = document.getElementById(`reward${index + 1}`);
        if (rewardDiv) {
            rewardDiv.style.backgroundImage = `url('image/${reward}')`;
        }
    });
    clearRewardsButton.addEventListener('click', () => {
        // Effacez les récompenses du stockage local
        localStorage.removeItem('rewards');
        // Rechargez les récompenses pour mettre à jour l'affichage
        loadRewards();
    });
}
function hiddenButtonOnMap() {

        const rewards = JSON.parse(localStorage.getItem('rewards')) || { recompense: [] };
        // Vérifiez si "math1.png" est dans les récompenses
        if (rewards.recompense.includes("math.n1.d1.png") || rewards.recompense.includes("math.n1.d2.png")) {
            // Sélectionnez l'élément <a>
            const aElement = document.getElementById('linkmath2');
            
            // Masquez l'élément en définissant son style display sur "none"
            if (aElement) {
                aElement.style.display = "block";
            }
            const textElement = document.querySelector('#linkmath1 text');
            // Vérifiez si l'élément texte existe avant de le modifier
            if (textElement) {
                textElement.textContent = '2';
                  // Vérifiez si "math.n2.1.png" est dans les récompenses
            }
              if (rewards.recompense.includes("math.n2.1.png")) {
              // Sélectionnez l'élément <a> pour "math.n2.1.png"
              const aElementMathN21 = document.getElementById('linkmath3');
              // Affichez l'élément en définissant son style display sur "block"
              if (aElementMathN21) {
                  aElementMathN21.style.display = "block";
            }

        }
    }
}