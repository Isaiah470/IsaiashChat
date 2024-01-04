import React, {useEffect} from 'react' 
import {useSpring, useSpringRef, useSprings, animated} from '@react-spring/web';
//https://www.joshwcomeau.com/react/rainbow-button/
// https://www.joshwcomeau.com/css/css-variables-for-react-devs/

//want click to make text spread away from click site
//want text moving out in circles

//api.pause(), api.resume()
export default function CircledText({text, degrees, height, width, fontSize, left, top, transformOrigin = 'bottom center', animate = true, boxShadow = false}) {
  let chars = [];
  if (text){
    chars = text.split('');
  }
  else {
    chars = [' ']
  }
  const [springs, api] = useSprings(
    chars.length,
    (index) => animate ? ({
        from: { transform: `rotate(${360/chars.length*index}deg` },
        to: { transform: `rotate(${360/chars.length*index+360}deg)`},
        config: { mass: 1, tension: 500, friction: 80 , duration: 6000},
        loop: true,
      }) :  ({}),
    []
  )
  useEffect(()=> {
    animate ? api.start(
    (index) => ({
      from: { transform: `rotate(${360/chars.length*index}deg` },
      to: { transform: `rotate(${360/chars.length*index+360}deg)`},
      config: { mass: 1, tension: 500, friction: 80 , duration: 6000},
      loop: true,
    })
    )
    : api.start()
    //api.pause()
    //api.resume()
  }, []) 

  return (
    <>

    {
      springs.map((spring, index) => {return (
        <animated.span key = {index} style ={{
          fontSize: `${fontSize}px`,
          height: `${height}px`,
          position: 'absolute',
          width: `${width}px`,
          left:  `${left}px`,
          top:  `${top}px`,
          transformOrigin: `${transformOrigin}`,
          transform: `rotate(${degrees*(index-(chars.length/2.0-0.5))}deg)`, 
          textShadow: boxShadow ? '-10px -0px white, -20px -0px white, -30px -0px white, -40px -0px white, -50px -0px white,-60px -0px white, -70px -0px white, -80px -0px white, -90px -0px white' : '',
          ...spring
        }} 
          
          > 
          {chars[index]}
        </animated.span>                         
      )} )
    }
        
    </>
  )
}