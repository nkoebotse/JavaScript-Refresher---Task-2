document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const letters = 'AABBCCDDEEFFGGHH'.split('');
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    // Shuffle the letters array
    letters.sort(() => 0.5 - Math.random());

    // Create and add cards to the game board
    letters.forEach(letter => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${letter}</div>
            </div>
        `;
        gameBoard.appendChild(card);
        card.addEventListener('click', flipCard);
    });

    function flipCard() {
        if (lockBoard || this === firstCard) return;
        
        this.classList.add('flip');
        
        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.querySelector('.card-back').textContent ===
                        secondCard.querySelector('.card-back').textContent;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }
});
