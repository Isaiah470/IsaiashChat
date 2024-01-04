import {useState, useRef, useEffect} from 'react';
import './slots.css'
import {MDBBtn, MDBContainer, MDBRow} from 'mdb-react-ui-kit'
import CircledText from '../utils/CircledText'
//import useInterval from '../utils/useInterval'
//https://www.joshwcomeau.com/react/rainbow-button/
//https://www.joshwcomeau.com/css/css-variables-for-react-devs/
export default function SlotsUI() {
  const [width, setWidth] = useState(() => window.innerWidth);
  const [height, setHeight] = useState(() => window.innerHeight);
  const [degrees, setDegrees] = useState(30)
  /* useInterval(() => {
    setDegrees((degrees) => degrees + 1);
  }, 10); */
  useEffect(() => {
    function handleResize() {
      setWidth(() => window.innerWidth);
      setHeight(() => window.innerHeight);
      setDegrees((degrees)=> degrees+10)
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      <div style = {{position: 'fixed', transform: 'rotateY(0deg)', width:'100vw', height:'100vh'}}>
        <CircledText  text = 'lololololololololo' degrees = {degrees} height= {height/2} width= '10' fontSize= '10' left = {width/2} top = '0' transformOrigin = 'bottom center' animate = {true} boxShadow = {true}  />
      </div>
      <div style = {{position: 'fixed', transform: 'rotateY(85deg)', width:'100vw', height:'100vh'}}>
        <CircledText  text = 'lololololololololo' degrees = {degrees} height= {height/2} width= '10' fontSize= '10' left = {width/2} top = '0' transformOrigin = 'bottom center' animate = {true} boxShadow = {true}  />

      </div>
      <div style = {{position: 'fixed', transform: 'rotateY(75deg)', width:'100vw', height:'100vh'}}>
        <CircledText  text = 'lololololololololo' degrees = {degrees} height= {height/2} width= '10' fontSize= '10' left = {width/2} top = '0' transformOrigin = 'bottom center' animate = {true} boxShadow = {true}  />

      </div>
      <div style = {{position: 'fixed', transform: 'rotateY(65deg)', width:'100vw', height:'100vh'}}>
        <CircledText  text = 'lololololololololo' degrees = {degrees} height= {height/2} width= '10' fontSize= '10' left = {width/2} top = '0' transformOrigin = 'bottom center' animate = {true} boxShadow = {true}  />

      </div>
      <div style = {{position: 'fixed', transform: 'rotateY(55deg)', width:'100vw', height:'100vh'}}>
        <CircledText  text = 'lololololololololo' degrees = {degrees} height= {height/2} width= '10' fontSize= '10' left = {width/2} top = '0' transformOrigin = 'bottom center' animate = {true} boxShadow = {true}  />

      </div>
      <div style = {{position: 'fixed', transform: 'rotateY(45deg)', width:'100vw', height:'100vh'}}>
        <CircledText  text = 'lololololololololo' degrees = {degrees} height= {height/2} width= '10' fontSize= '10' left = {width/2} top = '0' transformOrigin = 'bottom center' animate = {true} boxShadow = {true}  />

      </div>
      <div style = {{position: 'fixed', transform: 'rotateY(95deg)', width:'100vw', height:'100vh'}}>
        <CircledText  text = 'lololololololololo' degrees = {degrees} height= {height/2} width= '10' fontSize= '10' left = {width/2} top = '0' transformOrigin = 'bottom center' animate = {true} boxShadow = {true}  />
      </div>
      <div style = {{position: 'fixed', transform: 'rotateY(105deg)', width:'100vw', height:'100vh'}}>
        <CircledText  text = 'lololololololololo' degrees = {degrees} height= {height/2} width= '10' fontSize= '10' left = {width/2} top = '0' transformOrigin = 'bottom center' animate = {true} boxShadow = {true}  />
      </div>
      <div style = {{position: 'fixed', transform: 'rotateY(115deg)', width:'100vw', height:'100vh'}}>
        <CircledText  text = 'lololololololololo' degrees = {degrees} height= {height/2} width= '10' fontSize= '10' left = {width/2} top = '0' transformOrigin = 'bottom center' animate = {true} boxShadow = {true}  />
      </div>
        <div style = {{position: 'fixed', transform: 'rotateY(125deg)', width:'100vw', height:'100vh'}}>
          <CircledText  text = 'lololololololololo' degrees = {degrees} height= {height/2} width= '10' fontSize= '10' left = {width/2} top = '0' transformOrigin = 'bottom center' animate = {true} boxShadow = {true}  />
        </div>
      <div style = {{position: 'fixed', transform: 'rotateY(135deg)', width:'100vw', height:'100vh'}}>
        <CircledText  text = 'lololololololololo' degrees = {degrees} height= {height/2} width= '10' fontSize= '10' left = {width/2} top = '0' transformOrigin = 'bottom center' animate = {true} boxShadow = {true}  />
      </div>
      
      <div style = {{position: 'fixed', transform: 'rotateX(65deg)', width:'100vw', height:'100vh'}}>
        <CircledText  text = 'lololololololololo' degrees = {degrees} height= {height/2} width= '10' fontSize= '10' left = {width/2} top = '0' transformOrigin = 'bottom center' animate = {true} boxShadow = {true}  />

      </div>
      {/* <div style = {{position: 'fixed',  transform: 'translateX(200px) rotateY(10deg)'}}>
        <CircledText  text = 'lololololololololo' degrees = {degrees} height= {height/2} width= '10' fontSize= '10' left = {width/2} top = '0' transformOrigin = 'bottom center' animate = {true} boxShadow = {true}  />

      </div>
      <div style = {{position: 'fixed', transform: 'rotateY(40deg)'}}>
        <CircledText  text = 'lololololololololo' degrees = {degrees} height= {height/2} width= '10' fontSize= '10' left = {width/2} top = '0' transformOrigin = 'bottom center' animate = {true} boxShadow = {true}  />

      </div>
      <div style = {{position: 'fixed', transform: 'rotateY(80deg)'}}>
        <CircledText  text = 'lololololololololo' degrees = {degrees} height= {height/2} width= '10' fontSize= '10' left = {width/2} top = '0' transformOrigin = 'bottom center' animate = {true} boxShadow = {true}  />

      </div>
      <div style = {{position: 'fixed', transform: 'rotateY(60deg)'}}>
        <CircledText  text = 'lololololololololo' degrees = {degrees} height= {height/2} width= '10' fontSize= '10' left = {width/2} top = '0' transformOrigin = 'bottom center' animate = {true} boxShadow = {true}  />

      </div>
      <div style = {{position: 'fixed', transform: 'rotateY(70deg)'}}>
        <CircledText  text = 'lololololololololo' degrees = {degrees} height= {height/2} width= '10' fontSize= '10' left = {width/2} top = '0' transformOrigin = 'bottom center' animate = {true} boxShadow = {true}  />

      </div>
      */}
      
    <MDBContainer style= {{background: 'radial-gradient(#e66465, black 60%)', borderRadius: '10px', height: '100vh', }}>
      <div style = {{position: 'relative', transform: 'rotateY(85deg)', width:'0%', height:'0px',left: '5%', }}>
        <CircledText  text = 'lololololololololo' degrees = {degrees} height= {height/2} width= '10' fontSize= '10' left = {0} top = '0'  animate = {true} boxShadow = {true}  />
      </div>
      <div style = {{position: 'relative', transform: 'rotateY(95deg)', width:'0%', height:'0px', left: '95%', }}>
        <CircledText  text = 'lololololololololo' degrees = {degrees} height= {height/2} width= '10' fontSize= '10' left = {0} top = '0'  animate = {true} boxShadow = {true}  />
      </div>
      <MDBRow>
        <h3 className = 'text-center pb-2 pt-1 small shadow-5-strong hover-shadow inner-shadow' style= {{background: 'linear-gradient( #e66465, black, gold 75%, black 80%)', borderRadius: '10px', transform: 'rotateX(0deg)', color: '#f6ff00', lineHeight: '0.5em', fontSize: '0.75em'}}> Lose Everything </h3>
      </MDBRow>
      <div className = 'text-center'>
       <MDBBtn> 
        Spin
      </MDBBtn>
      </div>
    <div className="scene">
      <div className="carousel">
        <div className ="carousel__cell">1</div>
        <div className="carousel__cell">2</div>
        <div className="carousel__cell">3</div>
        <div className="carousel__cell">4</div>
        <div className="carousel__cell">5</div>
        <div className="carousel__cell">6</div>
        <div className="carousel__cell">7</div>
        <div className="carousel__cell">8</div>
        <div className="carousel__cell">9</div>
      </div>
    </div> 
    </MDBContainer>
      
    </>
  )
}