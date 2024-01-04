// https://medium.com/hackernoon/blackjack-application-with-javascript-2c76db51dea7
import {rand, } from './random.js'
/* game state will {
user cards, dealer cards, number decks, that it
}
1-12, 1-4 
{
userCards: [ card1, card2, card3, ] single card is array [1-n, 1-12, 1-4]
first number is deck that card is from
dealerCards: []
numDecks: int, 
}
*/

//game stae is object, has fields userCards, dealerCards 
// userCards dealerCards are arrays
//gameState.userCard is user card array
function getRandCard() {
  /* 
    basically we have numDecks number of cards. So getting a candom card
    has to take into account the number decks we have, and cards already in hands
    of user and dealer. 
    So if we have 8 decks, that is 8*
    52 cards, and if player has 2 cards, that is 8*52-2 cards total to get from. If player has 
    basically, 
  */
  //new assignment: get rand num 1-52

  let randomCard = rand(1,52)
  return randomCard;
}


function deal() {
  //add 2 random cards to userCards, add two to dealerCards
  const a  = getRandCard()
  const b = getRandCard()

  const c = getRandCard()
  const d = getRandCard()
  
  return {userCards: [a,b], dealerCards : [c,d]}
}

function hit(cards) {

  return [...cards, getRandCard()]
  
  // player === "user" || "house"
  //add a random card to either dealer or player


  
}


function cardToValue(num) {
  if (num <= 4) {
    return 'ace';
  }
  return Math.min(10, Math.floor((num-1)/ 4) + 1)
}

function sumCards(cards) {

  let numberAces = 0;
  let cardSum = 0

  for (let i = 0; i < cards?.length; i++) {
    let cardVal = cardToValue(cards[i])
    if (cardVal === "ace") {
      numberAces++
      cardSum++; 
    }

    else {
      cardSum += cardVal
    }
    
  }

  // If card sum is already greater than 11

  if (cardSum <= 11 && numberAces > 0) {
    cardSum += 10;
  } 

  return cardSum
  
}

function checkWin(userCards, dealerCards, turn) {
  const userCardSum = sumCards(userCards)
  const houseCardSum = sumCards(dealerCards)
  if (turn === "player") {

    if (userCardSum > 21) {
      return "L";
    }

    if (userCardSum === 21) {
      return "B"
    }
    
  } 

  else if (turn === "dealer") {

    if (houseCardSum > 21) {
      return "W"
    }

    if (houseCardSum > userCardSum) {
      return "L"
    }
    
  }
  return "U"
}

function cardIntToStr(integer) {
  let cardValue = Math.floor((integer - 1)/ 4) + 1;
  const suitList = ["S", "C", "H", "D"]
  
  const suit = integer % 4

  if (cardValue === 1) cardValue = "A"
  if (cardValue === 11) cardValue = "J"
  if (cardValue === 12) cardValue = "Q"
  if (cardValue === 13) cardValue = "K"
  let cardString = "";
  cardString += cardValue.toString();
  cardString += suitList[suit]

  console.log(cardString)
  return cardString
  // Takes the integer
  //returns AS, 2C, or whatever
}
export {getRandCard, deal, hit, cardToValue, sumCards, checkWin, cardIntToStr};
