import {rand, } from './random.js'
const slotSymbols = ["7", "BAR", "diamonds", "bell", "watermelon", "cherries", "oranges", "grapes", "bananas", "lemons"];
export {getRoll, makeArray, getPayout}
function getRoll(numColumns){
  let slotTop;
  let slotTopRow = [];
  for (let i = 0; i < numColumns; i++) {
    slotTop = rand(0, 9);
    slotTopRow.push(slotTop)
  }

  return slotTopRow
}

function makeArray(numRows, numColumns, slotTopRow,) {

  let slotArray = []
  console.log("random row")
  console.log(slotTopRow)
  for (let i = 0; i< numColumns; i++) {
    let slotColumn = [];
    for (let j = 0; j < numRows; j++) {
      let slot = (slotTopRow[i] + j*i) % 10
      slotColumn.push(slot)
    }
    slotArray.push(slotColumn)
  }
  // Create a 3 x numSlots 2D array
  
  return slotArray;
}

function getPayout(numRows, numColumns, slotArray, userTokens) { 
  let payout = 0;
  let rowsWon = 0;
  console.log("slotArray")
  console.log(slotArray.toString())
  for (let i = 0; i < numRows; i++){
    let rowWon = true;
    let firstIcon;
    for (let j = 0; j < numColumns; j++) {
      firstIcon = slotArray[0][i]
      if (slotArray[j][i] !== firstIcon) {
        rowWon = false;
      }
    }
    if (rowWon) {
      payout += (9 - firstIcon)* 100
    }
  }
  payout *= userTokens
  return payout;
}
  /*if (userTokens >= 1) {

    // Check middle row only

    firstIcon = slotArray[0][1]
    payoutMid = true
    for (slotColumn in slotArray) {
      if (slotColumn[1] != firstIcon) {
        payoutMid = false
      }
    }

    if (payoutMid){
      payout += 100 * (9 - firstIcon)  
    }
  }

  else if (userPockets >= 2) {
    topIcon = slotColumn[0]
    bottomIcon = slotColumn[2]
    payoutTopBot = true
    for slotColumn in slotArray {
      if (slotColumn[0] != topIcon || slotColumn[2] != bottomIcon) {
        payoutTopBot = false
      }
    }

    if payoutTopBot:
      payout += 200* (9 - )

    */


/* 

let userTokens =  

const slotSymbols = ["7", "cherries", "grapes", "oranges", "lemons", "bananas", "watermelon", "diamonds", "bell", "BAR"];

let n = 9;
slot1Bottom = rand(0, n);
slot2Bottom = rand(0, n);
slot3Bottom = rand(0, n);

let slot1Display = [slotSymbols[slot1Bottom - 2], slotSymbols[slot1Bottom - 1], slotSymbols[slot1Bottom]];


get three random numbers. 

calculate payout


animation: should be going down y axis, should be rotated around x axis! 
*/ 