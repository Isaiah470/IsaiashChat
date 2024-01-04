import React , {useState, useEffect} from 'react'

import {getRandCard, deal, hit, cardToValue, sumCards, checkWin, cardIntToStr} from './blackjack.js'
import './cards.css'
import {
  MDBBtn
} from 'mdb-react-ui-kit'
export default function BlackjackUI() {
  const [currUserCards, setCurrUserCards] = useState([])
   const [currDealerCards, setCurrDealerCards] = useState([])
   const [currTurn, setCurrTurn] = useState("player")
  const [gameActive, setGameActive] = useState(false)
  const [endResult, setEndResult] = useState('U')
  const startGame = () => {
    setGameActive(true)
    const {userCards, dealerCards} = deal()
    setCurrUserCards(userCards)
    setCurrDealerCards(dealerCards)
    setCurrTurn("player")
  }
  const showEndScreen = () => {
    setGameActive('intermediate')
  }  
/*  userCards = hit(userCards)
  dealerCards = hit(dealerCards)


  let testCard = getRandCard()
  console.log(testCard)
  console.log(cardToValue(testCard))

  console.log(userCards)
  console.log(sumCards(userCards))
  console.log(checkWin(userCards, dealerCards, 'player'))*/
  useEffect(() => {
    let timer;
    if (currTurn === "dealer" && gameActive !== 'intermediate') {
      timer = setTimeout(() => {
        setCurrDealerCards(hit(currDealerCards))
      }, 2000)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [currTurn, currDealerCards, gameActive])
  
  useEffect(( ) => {
    
    const result = checkWin(currUserCards, currDealerCards, currTurn)
    console.log(result)
    if (result === "L") {
      console.log("ro")
      //alert("You lost. Loser. Take the L. Skill Issue Uninstall")
      showEndScreen()
    }
    else if (result === "B") {
      //alert("We're cooking with gas")
      //startGame()
      showEndScreen()
    }
    else if (result == "W") {
      //alert("We're cooking ")
      //startGame()
      showEndScreen()
    }

    setEndResult(result)
    
  }, [currUserCards, currDealerCards])
  
  return (
    <>
      {
      gameActive === "intermediate"  && (
      <div style = {{left: '36vw', top: '25vh', width: '25vw', height: '50vh', position: 'absolute', zIndex: '1', background: 'linear-gradient(red, yellow)', opacity: '0.85', margin: 'auto', display: 'flex', flexDirection: 'column', placeItems: 'center', textAlign: 'center'}}>
        Game over! You 
        {endResult === "L" ? " Loser" : " Cooked"}
      <MDBBtn  onClick= {() => {startGame()}}> Play again</MDBBtn>
      <MDBBtn  onClick ={() => {setGameActive(false); setCurrUserCards([]); setCurrDealerCards([])}} > Close </MDBBtn>
      </div>)
        }
      <MDBBtn disabled = {gameActive === "intermediate" || gameActive === true} onClick = {() => {startGame()}}> Play </MDBBtn> 
      <MDBBtn disabled = {gameActive === "intermediate" || currTurn === "dealer" || gameActive === false} onClick = {() => {setCurrUserCards(hit(currUserCards))}}> Hit  </MDBBtn>
      <MDBBtn disabled = {gameActive === "intermediate" || gameActive === false} onClick = {() => {
      if (currTurn === "player")
        setCurrTurn("dealer")
      }}> Stay  </MDBBtn>
      <h1> Dealer cards</h1>
      <div style = {{marginTop: '0px', display: 'flex', height: '100px', overflowX: 'scroll'}} >
        {
          currDealerCards.map((card, index) => {
            const cardStr = cardIntToStr(card);
            return (
              currTurn === "dealer" || index === 0 ? <img key = {index} style = {{height: '100%'}} src={`../../public/cards/${cardStr}.svg`} /> : <img key = {index} style = {{height: '100%'}} src={`../../public/cards/RED_BACK.svg`}/>
              )
          })
        }

      </div>
      <h1> Player cards</h1>
      <div style = {{marginTop: '0px', display: 'flex', height: '100px', overflowX: 'scroll'}} >
        {
          currUserCards.map((card, index) => {
            const cardStr = cardIntToStr(card);
            return (
              <img key = {index} style = {{height: '100%'}} src={`../../public/cards/${cardStr}.svg`} />
              )
          })
        }
        
      </div>
    </>
  )
}