document.addEventListener('DOMContentLoaded', () => {
  const cardArray = [
      { name: 'france', img: 'image/france.png' },
      { name: 'allemagne', img: 'image/allemagne.png' },
      { name: 'italie', img: 'image/italie.png' },
      { name: 'pologne', img: 'image/pologne.png' },
      { name: 'hongrie', img: 'image/hongrie.png' },
      { name: 'suisse', img: 'image/suisse.png' },
      { name: 'france', img: 'image/france_texte.png' },
      { name: 'allemagne', img: 'image/allemagne_texte.png' },
      { name: 'italie', img: 'image/italie_texte.png' },
      { name: 'pologne', img: 'image/pologne_texte.png' },
      { name: 'hongrie', img: 'image/hongrie_texte.png' },
      { name: 'suisse', img: 'image/suisse_texte.png' }
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  const lifeDisplay = document.querySelector('.pasbeau');
  const modal = document.getElementById("myModal");
  const modalClose = document.querySelector('.close');
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let errors = 0;

  function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
          const card = document.createElement('img');
          card.setAttribute('src', 'image/fond.png');
          card.setAttribute('data-id', i);
          card.addEventListener('click', flipCard);
          grid.appendChild(card);
      }
  }

  function updateLifeImage() {
      lifeDisplay.src = `image/pasbeau${errors + 1}.png`;
  }

  function displayResultMessage(isPlayerWinner) {
      const resultMessage = document.getElementById('result-message');
      const backButton = document.createElement('button');
      backButton.innerText = 'Retour à l\'accueil';
      backButton.classList.add('backbutton');
      backButton.addEventListener('click', () => {
          window.location.href = 'index.html';
      });

      if (isPlayerWinner) {
          resultMessage.style.color = 'green';
          resultMessage.innerText = 'Félicitations ! Vous avez gagné !';
          modal.style.display = "block";
          modal.appendChild(backButton);
      } else {
          resultMessage.style.color = 'red';
          resultMessage.innerText = 'Vous avez perdu. Réessayez !';
          modal.style.display = "block";
      }
  }

  function checkForMatch() {
      const cards = document.querySelectorAll('img');
      const optionOneId = cardsChosenId[0];
      const optionTwoId = cardsChosenId[1];

      if (optionOneId === optionTwoId) {
          cards[optionOneId].setAttribute('src', 'image/fond.png');
          cards[optionTwoId].setAttribute('src', 'image/fond.png');
          alert('Vous avez cliqué sur la même image !');
      } else if (cardsChosen[0] === cardsChosen[1]) {
          cards[optionOneId].setAttribute('src', 'image/white.png');
          cards[optionTwoId].setAttribute('src', 'image/white.png');
          cards[optionOneId].removeEventListener('click', flipCard);
          cards[optionTwoId].removeEventListener('click', flipCard);
          cardsWon.push(cardsChosen);
          if (cardsWon.length === cardArray.length / 2) {
              displayResultMessage(true); // Le joueur a gagné
          }
      } else {
          errors++;
          if (errors === 8) {
              displayResultMessage(false); // Le joueur a perdu
          } else {
              updateLifeImage();
              setTimeout(() => {
                  cards[optionOneId].setAttribute('src', 'image/fond.png');
                  cards[optionTwoId].setAttribute('src', 'image/fond.png');
              }, 1000);
          }
      }
      cardsChosen = [];
      cardsChosenId = [];
      resultDisplay.textContent = cardsWon.length;
  }

  function flipCard() {
      const cardId = this.getAttribute('data-id');
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);
      this.setAttribute('src', cardArray[cardId].img);
      if (cardsChosen.length === 2) {
          setTimeout(checkForMatch, 500);
      }
  }

  function refreshPage() {
      location.reload(); // Recharge la page
  }

  // Ajoute un gestionnaire d'événements à la croix de la modal pour rafraîchir la page
  modalClose.addEventListener('click', refreshPage);

  createBoard();
});
