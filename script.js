import Deck from "./deck.js"

const gameContainer = document.querySelector('.game-container')
const playerArea = document.querySelector('.player-area')
const computerArea = document.querySelector('.computer-area')
const playerDeckElement = playerArea.querySelector('.deck')
const computerDeckElement = computerArea.querySelector('.deck')
const playerWinPileElement = playerArea.querySelector('.win-pile')
const computerWinPileElement = computerArea.querySelector('.win-pile')
const battleResult = document.querySelector('.battle-result')

let playerDeck, computerDeck, playerWinPile, computerWinPile, inRound, gameOver, isLastWinnerPlayer

startNewGame()

gameContainer.addEventListener("click", () => {
    if (gameOver) {
        startNewGame()
        cleanCardArea()
        return
    }

    if (inRound) {
        cleanCardArea()
    } 
    else {
        let [playerCard , computerCard] = flipCards()
        handleFlipOutcome(playerCard, computerCard)
        checkGameOver()
    }
})

function startNewGame() {
    const deck = new Deck()
    deck.shuffle()

    const medianCard = Math.ceil(deck.deckLength / 2)
    playerDeck = new Deck(deck.cards.slice(0, medianCard))
    computerDeck = new Deck(deck.cards.slice(medianCard, deck.deckLength))
    playerWinPile = new Deck([])
    computerWinPile = new Deck([])

    inRound = false
    gameOver = false
}

function cleanCardArea() {
    inRound = false
    battleResult.innerText = ""
    if(playerArea.querySelector('.card')) {
        playerArea.removeChild(playerArea.lastChild)
    }
    if(computerArea.querySelector('.card')) {
        computerArea.removeChild(computerArea.lastChild)
    }
    updateDeckCountHTML()
    updateWinPileCountHTML()
}

function flipCards() {
    inRound = true
    const playerCard = playerDeck.pop()
    const computerCard = computerDeck.pop()
    updateDeckCountHTML()

    playerArea.appendChild(playerCard.generateHTML())
    computerArea.appendChild(computerCard.generateHTML())
    
    return [playerCard, computerCard]
}

function handleFlipOutcome(playerFlip, computerFlip) {
    if (isRoundWinner(playerFlip, computerFlip)) {
        battleResult.innerText = "Win"
        handleRoundWinner(playerWinPile, playerFlip, computerFlip)
        isLastWinnerPlayer = true
    } 
    else if (isRoundWinner(computerFlip, playerFlip)) {
        battleResult.innerText = "Lose"
        handleRoundWinner(computerWinPile, playerFlip, computerFlip)
        isLastWinnerPlayer = false 
    } 
    else {
        if (isLastWinnerPlayer) {
            handleRoundWinner(playerWinPile, playerFlip, computerFlip)
            battleResult.innerText = "Draw - Player Win"
        }
        else {
            handleRoundWinner(computerWinPile, playerFlip, computerFlip)
            battleResult.innerText = "Draw - CPU Win"
        }
    }
}

function isRoundWinner(card1, card2) {
    return card1.numericalVal > card2.numericalVal
}

function handleRoundWinner(roundWinnerPile, playerCard, computerCard) {
    roundWinnerPile.push(playerCard)
    roundWinnerPile.push(computerCard)
    return roundWinnerPile 
}

function updateDeckCountHTML() {
    playerDeckElement.dataset.value = playerDeck.deckLength
    computerDeckElement.dataset.value = computerDeck.deckLength
}

function updateWinPileCountHTML() {
    playerWinPileElement.dataset.value = playerWinPile.deckLength
    computerWinPileElement.dataset.value = computerWinPile.deckLength
}

function checkGameOver() {
    if (isEmpty(playerDeck, playerWinPile)) {
        battleResult.innerText = "Game Over"
        gameOver = true
    } 
    else if (isEmpty(computerDeck, computerWinPile)) {
        battleResult.innerText = "Game Won!"
        gameOver = true
    }
}

function isEmpty(deck, winPile) {
    if(deck.deckLength === 0) {
        winPile.cards.forEach(card => {
            deck.push(card)    
        });
        winPile.cards = []
    }
    return deck.deckLength === 0
}