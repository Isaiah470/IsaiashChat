import {MDBContainer, MDBRow, MDBCol,MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
// https://www.copycat.dev/blog/bootstrap-breakpoints/
import './SidebarNav.css'
import {useState} from 'react'
//side is left or right
import useOutsideClick from '../utils/useOutsideClick'
export default function SidebarNav({side}) {
  const [isExpanded, setExpanded] = useState(false);
  const ref = useOutsideClick(() => {setExpanded(false)});
  return (
    <MDBCol ref = {ref} md = '2' size='0' className = {`d-flex d-md-flex align-items-stretch px-0 sidebarnav ${isExpanded ? 'expanded': 'contracted'} ${side} ${side === 'left' ?'' : 'flex-row-reverse justify-content-end'}`} >
      
        <div  className = {`d-flex p-0 text-nowrap sidebarnavinner ${isExpanded ? 'expanded': 'contracted'} bg-dark ${side}`} style = {{height: '80vh', overflow: 'scroll'}} >
          {/* wacky element */ }
        <div className = 'd-flex flex-column p-0 text-nowrap bg-dark' style = {{height: '80vh', overflow: 'scroll'}} > 
          <img src="https://mdbcdn.b-cdn.net/img/new/avatars/3.webp" className="img-fluid rounded-circle" style = {{height: '36px'}}  /> 
          <img src="https://mdbcdn.b-cdn.net/img/new/avatars/3.webp" className="img-fluid rounded-circle" style = {{height: '36px'}}  /> 
          <img src="https://mdbcdn.b-cdn.net/img/new/avatars/3.webp" className="img-fluid rounded-circle" style = {{height: '36px'}}  /> 
          <img src="https://mdbcdn.b-cdn.net/img/new/avatars/3.webp" className="img-fluid rounded-circle" style = {{height: '36px'}}  /> 
          <img src="https://mdbcdn.b-cdn.net/img/new/avatars/3.webp" className="img-fluid rounded-circle" style = {{height: '36px'}}  /> 
        </div>

          <div className = 'd-flex flex-column p-0 text-nowrap bg-dark' style = {{height: '80vh', overflow: 'scroll'}} > 
          <p> Room 1</p>
            <p> Room 1</p>
            <p> Room 1</p>
            <p> Room 1</p>
          </div>
            

        </div>
        
      <div className = {`d-flex align-self-stretch sidebarnavbutton ${isExpanded ? 'expanded': 'contracted'} ${side}`} style = {{height: '80vh', overflow: 'scroll'}}>
        
        <MDBBtn className="me-0 ms-0 align-self-stretch shadow-5-strong "  color = 'white'  style = {{ paddingRight: "0px", paddingLeft: "0px", borderRadius: '0px', writingMode: 'vertical-lr', transform: side === 'left'  ? 'rotate(180deg)' : '' , width: '10px', marginLeft: '0px', lineHeight: '0px'}} onClick = {()=> setExpanded(!isExpanded)}>
          
          <MDBIcon fas icon={isExpanded ? 'angle-right': 'angle-left'} style = {{width: '10px', paddingRight: '0px'}} className = '' /> <span className = ''> Rooms </span>
        
          </MDBBtn>
        </div>
      
      
    </MDBCol>
    
  )
}