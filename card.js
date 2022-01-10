export default class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }
    VALUE_LOOKUP = {
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
        "10": 10,
        "J": 11,
        "Q": 12,
        "K": 13,
        "A": 14
    }

    get numericalVal() {
        return this.VALUE_LOOKUP[this.value] 
    }
    get color() {
        if (this.suit === '♥' || this.suit === '♦') {
            return 'red'
        }
        else {
            return 'black'
        }
    }

    generateHTML() {
        const cardHTML = document.createElement('div')
        cardHTML.innerText = this.suit
        cardHTML.classList.add("card", this.color)
        cardHTML.dataset.value = `${this.value}`
        return cardHTML
    }
}