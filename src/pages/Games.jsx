import {
  MDBBtn,
  MDBCard, 
  MDBRipple,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBIcon,
} from 'mdb-react-ui-kit';
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
          <MDBCardImage src='/IsaiashChat/src/img/2048.png' fluid alt='...' style = {{maxWidth: '200px'}}/>
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
          <MDBCardImage src='/IsaiashChat/src/img/crossword.png' fluid alt='...' style = {{maxWidth: '200px'}}/>
      
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
          <MDBCardImage src='/IsaiashChat/src/img/blackjack.jpg' fluid alt='...' style = {{maxWidth: '200px'}}/>

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
          <MDBCardImage src='/IsaiashChat/src/img/slots.jpeg' fluid alt='...' style = {{maxWidth: '200px'}}/>
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