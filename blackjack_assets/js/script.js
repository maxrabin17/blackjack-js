let blackjackGame = {
    'you': { 'scoreSpan': '#player-blackjack-score', 'div': '#player-box', 'score': 0},
    'dealer': { 'scoreSpan': '#dealer-blackjack-score', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11] }
}

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']
const hitSound = new Audio('blackjack_assets/sounds/swish.m4a')
const winSound = new Audio('blackjack_assets/sounds/cash.mp3')
const lossSound = new Audio('blackjack_assets/sounds/aww.mp3')

document.querySelector("#hit-button").addEventListener('click', blackjackHit)
document.querySelector('#deal-button').addEventListener('click', blackjackDeal)
document.querySelector("#stand-button").addEventListener('click', dealerLogic)

function blackjackHit() {
    let card = randomCard()
    showCard(card, YOU)
    updateScore(card, YOU)
    showScore(YOU)
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13)
    return blackjackGame['cards'][randomIndex]
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `blackjack_assets/images/${card}.png`
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play()
    }
}

function blackjackDeal() {
    // calculateWinner()
    let playerImages = document.querySelector("#player-box").querySelectorAll('img')
    let dealerImages = document.querySelector("#dealer-box").querySelectorAll('img')

    for (i = 0; i < playerImages.length; i++) {
        playerImages[i].remove()
    }

    for (i = 0; i < dealerImages.length; i++) {
        dealerImages[i].remove()
    }

    YOU['score'] = 0
    DEALER['score'] = 0

    document.querySelector('#player-blackjack-score').textContent = 0;
    document.querySelector('#dealer-blackjack-score').textContent = 0;
    document.querySelector('#player-blackjack-score').style.color = "white"
    document.querySelector('#dealer-blackjack-score').style.color = "white"

}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1]
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0]
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card]
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = "BUST!"
        document.querySelector(activePlayer['scoreSpan']).style.color = "red"
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
    }
}

function dealerLogic() {
    let card = randomCard()
    showCard(card, DEALER)
    updateScore(card, DEALER)
    showScore(DEALER)
}

function calculateWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']) {
        console.log('You drew!')
        }

    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        winner = DEALER
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        console.log('You drew!')
    }
    return winner
}

function showResult(winner) {
    let message, messageColor;

    if (winner === YOU) {
        message = "You won!"
        messageColor = 'green'
        winSound.play()
    } else if (winner === DEALER) {
        message = 'You lost!'
        messageColor = 'red'
        lossSound.play()
    } else {
        message = 'You drew!'
        messageColor = 'black'
    }

    document.querySelector('#blackjack-result').textContent = message
    document.querySelector('#blackjack-result').style.color = messageColor
}