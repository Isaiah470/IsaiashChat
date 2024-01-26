import {
  MDBBtn,
  MDBCard, 
  MDBRipple,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBIcon,
} from 'mdb-react-ui-kit';
import crosswordImg from "/src/assets/crossword.png";
import twoImg from "/src/assets/2048.png";
import slotsImg from "/src/assets/slots.jpeg";
import blackjackImg from "/src/assets/blackjack.jpg";
import { Outlet, Link } from "react-router-dom";

export default function Games() {

  return(
    <>
    <h1 style = {{textAlign: 
      'center'}}>
      <MDBIcon fas icon="gamepad" > </MDBIcon>
    &nbsp; Games &nbsp;

      <MDBIcon fas icon="gamepad" > </MDBIcon>
    </h1>
    <div className = 'd-flex justify-content-center flex-wrap'> 
      <Link to = {`2048`} >
      <MDBCard alignment='center'>
        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
          <MDBCardImage src={twoImg} fluid alt='...' style = {{maxWidth: '200px'}}/>
            <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </MDBRipple>
        <MDBCardBody>
          <MDBCardTitle>2048</MDBCardTitle>
          <MDBBtn >Play </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </Link>
      <Link to = {`Crossword`} >
      <MDBCard alignment='center'>
        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
          <MDBCardImage src={crosswordImg} fluid alt='...' style = {{maxWidth: '200px'}}/>
      
            <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
    
        </MDBRipple>
        <MDBCardBody>
          <MDBCardTitle>Crossword</MDBCardTitle>
          <MDBBtn >Play </MDBBtn>
        </MDBCardBody>
      </MDBCard>
      </Link>
      <Link to = {`Blackjack`} >
      <MDBCard alignment='center'>
        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
          <MDBCardImage src={blackjackImg} fluid alt='...' style = {{maxWidth: '200px'}}/>

            <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
   
        </MDBRipple>
        <MDBCardBody>
          <MDBCardTitle>Blackjack</MDBCardTitle>
          <MDBBtn >Play </MDBBtn>
        </MDBCardBody>
      </MDBCard>
      </Link>
      <Link to = {`Slots`} >
      <MDBCard alignment='center'>
        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
          <MDBCardImage src={slotsImg} fluid alt='...' style = {{maxWidth: '200px'}}/>
            <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </MDBRipple>
        <MDBCardBody>
          <MDBCardTitle>Slots</MDBCardTitle>
          <MDBBtn >Play </MDBBtn>
        </MDBCardBody>
      </MDBCard>
      </Link>
    </div>
    </>
  )
}