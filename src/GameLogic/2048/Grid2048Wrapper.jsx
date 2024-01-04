import React, {useState, createContext, useContext, useEffect} from 'react'
import Grid2048 from './Grid2048'
import Grid2048Modal from './Grid2048Modal'
import './Grid2048Wrapper.css'
export const GridWrapperContext = createContext(null);

function useDelayUnmount(isMounted) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    let timer;
    if (isMounted && !mounted) {
      setMounted(true);
    } else if (!isMounted && mounted) {
      timer = setTimeout(() => setMounted(false), 2000);
    }

    return () => clearTimeout(timer);
  });

  return mounted;
}


export default function Grid2048Wrapper() {
  const [gameState, setGameState] = useState(null)
   const delayUnmount = useDelayUnmount(gameState !== 'won' && gameState !== 'lost');

  return (
    <GridWrapperContext.Provider value = {{
      gameState, setGameState
    }}>
      {

      delayUnmount && 
        <div 
        className={`gridUnmounter ${(gameState !== 'won' && gameState !== 'lost') ? ' mounted' : ' unmounted'}`}
         style = {{
           animationDuration: '2000',
         }} 
          >
        <Grid2048 />
        </div>
      }
      {

      (gameState === 'won' || gameState === 'lost') && 
      <Grid2048Modal state = {gameState}/>

      }
    </GridWrapperContext.Provider>
  )
}