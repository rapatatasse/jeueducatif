document.addEventListener('DOMContentLoaded', () => {
    loadRewards();
});

function loadRewards() {
    const rewards = JSON.parse(localStorage.getItem('rewards')) || { recompense: [] };

    console.log(rewards);
    rewards.recompense.forEach((reward, index) => {
        const rewardDiv = document.getElementById(`reward${index + 1}`);
        if (rewardDiv) {
            rewardDiv.style.backgroundImage = `url('image/${reward}')`;
        }
    });
}