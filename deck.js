import Card from "./card.js"

const SUITS = ["♠", "♣", "♥", "♦"]
const VALUES = [ "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K" ]

export default class Deck {
    constructor(cards = generateStandardDeck()) {
        this.cards = cards
    }
    get deckLength(){
        return this.cards.length
    }
    pop() {
        return this.cards.shift()
    }

    push(card) {
        this.cards.push(card)
    }

    shuffle() {
        for(let i = 0; i < this.deckLength - 2; i++) {
            const j = Math.floor(Math.random() * (this.deckLength - 1))
            let temp = this.cards[i]
            this.cards[i] = this.cards[j]
            this.cards[j] = temp
        }
    }
}

function generateStandardDeck() {
    let deck = []
    SUITS.forEach(suit => {
        VALUES.forEach(value => {
            deck.push(new Card(suit, value))
        })
    });
    return deck
}