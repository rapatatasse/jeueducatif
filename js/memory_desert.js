document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
      {
        name: 'fries',
        img: 'image/arabe.png'
      },
      {
        name: 'cheeseburger',
        img: 'image/arabe2.png'
      },
      {
        name: 'ice-cream',
        img: 'image/arabe3.png'
      },
      {
        name: 'pizza',
        img: 'image/arabe4.png'
      },
      {
        name: 'milkshake',
        img: 'image/arabe5.png'
      },
      {
        name: 'hotdog',
        img: 'image/arabe6.png'
      },
      {
        name: 'fries',
        img: 'image/arabe.png'
      },
      {
        name: 'cheeseburger',
        img: 'image/arabe2.png'
      },
      {
        name: 'ice-cream',
        img: 'image/arabe3.png'
      },
      {
        name: 'pizza',
        img: 'image/arabe4.png'
      },
      {
        name: 'milkshake',
        img: 'image/arabe5.png'
      },
      {
        name: 'hotdog',
        img: 'image/arabe6.png'
      }
    ];
  
    cardArray.sort(() => 0.5 - Math.random());
  
    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    const lifeDisplay = document.querySelector('.pasbeau');
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
      lifeDisplay.src = `image/desert1${errors + 1}.png`;
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
      } else {
        errors++;
        if (errors === 3) {
          gameOver();
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
      if (cardsWon.length === cardArray.length / 2) {
        resultDisplay.textContent = 'Félicitations ! Vous les avez tous trouvés !';
      }
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
  
    function gameOver() {
      const modal = document.getElementById("myModal");
      modal.style.display = "block";
    }
  
    function refreshPage() {
      location.reload(); // Recharge la page
    }
  
    // Ajoute un gestionnaire d'événements à la croix de la modal pour rafraîchir la page
    modalClose.addEventListener('click', refreshPage);
  
    createBoard();
  });
  