import React, {useState, useRef, useEffect, useLayoutEffect} from 'react'

export default function Tile2048(props) {
  const ref = useRef(null);

  const prevXY = useRef(null)
  useLayoutEffect(() => {
    if (!props.hide) {
    ref.current.animate({
        opacity: [0, 0, 0.9, 1],
        offset: [0, 0.8,  0.9, 1],
                      }, {

        duration: props.dur,
        iterations: 1,
     })
   }
  }, []) 

  useLayoutEffect(() => {
    if (!prevXY.current) {
      const {x, y} = ref.current.getBoundingClientRect();
      prevXY.current = {x, y}
    }
  }, [])

  useLayoutEffect(() => {
    const {x, y} = ref.current.getBoundingClientRect();
    ref.current.animate([
     { transform: `translateY(${prevXY.current.y - y}px) translateX(${prevXY.current.x - x}px)`,  easing: "ease-in-out" },
     { transform: `translateY(0px)    translateX(0px)`,  easing: "ease-in-out" }
    ], {
       duration: props.dur,
       iterations: 1,
    })
    prevXY.current = {x,y}
  }, [props])

  return (

      <div 
        className = {`tile-2048${props.hide ? ` hide` :  ``}`} 
        ref = {(tile) => {ref.current = tile}}
        style = {{
          color: `${props.color ? props.color[1] : 'white'}`,
          backgroundColor: `${props.color ? props.color[0] : 'grey'}`,
        }}
      >  
        {props.children} 
      </div>

  )
}