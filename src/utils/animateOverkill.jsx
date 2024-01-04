import {useSpring, useSpringRef, animated} from '@react-spring/web';
export default function animateOverkill({children, handleClick}) {

  // const handleClick = 
const [springs, api] = useSpring(
  () => ({
    from: {marginTop: '0%'},
    config: {
          mass: 5,
          friction: 120,
          tension: 120,
    },
  }),
  []
)
  return (
    <animated.div style = {springs} onClick = {() => handleClick(api)}>{children} </animated.div>
  )
} 