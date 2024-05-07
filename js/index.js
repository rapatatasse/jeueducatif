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
            rewardDiv.style.backgroundImage = `url('image/math/${reward}')`;
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
        if (rewards.recompense.includes("math1.png")) {
            // Sélectionnez l'élément <a>
            const aElement = document.getElementById('linkmath2');
            
            // Masquez l'élément en définissant son style display sur "none"
            if (aElement) {
                aElement.style.display = "block";
            }
        }
}