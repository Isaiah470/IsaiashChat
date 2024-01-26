import React, { useState, useLayoutEffect, useRef } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBtn,
  MDBNavbarNav,
  MDBIcon,
  MDBInputGroup,
  MDBTooltip,
  MDBInput
} from 'mdb-react-ui-kit';
import CircledText from '../utils/CircledText'
import ProfileDropdown from './ProfileDropdown'
import {Link, useNavigate} from 'react-router-dom'
//inspirational: https://mdbootstrap.com/snippets/jquery/marta-szymanska/1818927#
export default function Navbar() {
  const navigate = useNavigate()
  const [showNavNoTogglerThird, setShowNavNoTogglerThird] = useState(false);

  const ref = useRef(null);

  const [nextHeight, setHeight] = useState('0px');
  const [autoHeight, setAutoHeight] = useState(0);
  const [visibility, setVisibility] = useState('hidden');
  const [position, setPosition] = useState('static');
  useLayoutEffect(() => {
    const height = ref.current.offsetHeight;
    if (nextHeight === '0px') {
      if (showNavNoTogglerThird && autoHeight === 0) {
        setVisibility('hidden')
        setPosition('absolute')
        setHeight('auto');
      }
      else if (visibility === 'hidden' && showNavNoTogglerThird && autoHeight !== 0) {
        setVisibility('visible')
        setPosition('static')
        setHeight(`${autoHeight}px`)
      }
      /*     else if (visibility !== 'hidden' && !showNavNoTogglerThird) {
             setTimeout(() => {
               setVisibility('hidden');
             }, 500)
           } */
    }
    else {
      if (visibility === 'hidden' && showNavNoTogglerThird) {
        setHeight('0px');
        setPosition('static')
        setAutoHeight(height)
      }
      else if (visibility !== 'hidden' && !showNavNoTogglerThird) {
        setHeight('0px');
        setPosition('static')
        setAutoHeight(0);
      }

    }

    console.log(height)
  }, [showNavNoTogglerThird, nextHeight]);

  return (
    <>
      <MDBNavbar expand='md' light bgColor='light' className='p-0'>
        <MDBContainer fluid className='flex-nowrap p-0'>
          <MDBNavbarBrand  className=''  onClick = {() => navigate(`/`)}>
            <MDBBtn className='mx-2 ' color="dark" floating>
              <CircledText height={15} width={4} degrees={30} text='Isaiash' fontSize={5.5} left={16.5} top={3} transformOrigin = 'bottom center'>
              </CircledText>
              <MDBIcon fas icon='dragon' color='danger'>  </MDBIcon>
            </MDBBtn>
          </MDBNavbarBrand>


          <MDBNavbarNav className='justify-content-center mb-0 mb-lg-0' >
            <div className='d-none d-md-block'>

              {/* <MDBInputGroup tag="form" className='d-flex w-auto mb-0'>
              <input className='form-control' placeholder="Type query" aria-label="Search" type='Search' />
              <MDBBtn outline className = ''>Search</MDBBtn>
            </MDBInputGroup> */}
              <MDBNavbarItem className="d-flex align-items-center">
                <MDBInput label='Search' id='form1' type='text' />
                <MDBIcon fas icon="search mx-2" />
              </MDBNavbarItem>


            </div>
          </MDBNavbarNav>

          
          <MDBNavbarItem className='' style={{ display: 'inline' }}>
            <div className='d-flex  justify-content-evenly'>
              <MDBNavbarLink href='#' className='me-3 me-lg-3'>
                <MDBTooltip tag='span' wrapperProps={{}} title={<p className='p-0 m-0' style={{ fontSize: '0.75em' }}> Notifications </p>}>
                  <MDBIcon fas icon='bell' /> </MDBTooltip>
              </MDBNavbarLink>

              <span className='me-3 me-lg-3'>
                <MDBTooltip tag='span' wrapperProps={{}} title={<p className='p-0 m-0' style={{ fontSize: '0.75em' }}> Create Post </p>}>
                  <Link to = {'create_post'}>
                  <MDBIcon fas icon='feather' />  </Link> </MDBTooltip>
              </span>
              
              <span className='me-3 me-lg-3'>
                <MDBTooltip tag='span' wrapperProps={{}} title={<p className='p-0 m-0' style={{ fontSize: '0.75em' }}>  Chat  </p>}>
                  <Link to = {'Chat'}><MDBIcon fas icon='message' /> </Link>  </MDBTooltip>
              </span>
              
              <span className='me-3 me-lg-3'>
                <MDBTooltip tag='span' wrapperProps={{}} title={<p className='p-0 m-0' style={{ fontSize: '0.75em' }}>  Posts  </p>}>
                  <Link to = {'Posts'}><MDBIcon fas icon='comments' /> </Link>  </MDBTooltip>
              </span>

              <span className='me-3 me-lg-3'>
                <MDBTooltip tag='span' wrapperProps={{}} title={<p className='p-0 m-0' style={{ fontSize: '0.75em' }}>  Games  </p>}>
                  <Link to = {'Games'}><MDBIcon fas icon='dice' /> </Link>  </MDBTooltip>
              </span>

              <MDBNavbarLink href='#' className='me-3 me-lg-3'>
                <MDBTooltip tag='span' wrapperProps={{}} title={<p className='p-0 m-0' style={{ fontSize: '0.75em' }}> Store </p>}>
                  <MDBIcon fas icon='store' /> </MDBTooltip>
              </MDBNavbarLink>
            </div>
          </MDBNavbarItem>

          <div className='d-none d-md-block p-0 m-0'>
            <ProfileDropdown />
          </div>

          <MDBNavbarToggler
            type='button'
            data-target='#navbarTogglerDemo03'
            aria-controls='navbarTogglerDemo03'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavNoTogglerThird(!showNavNoTogglerThird)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
        </MDBContainer>



        <div className='d-md-none p-0 m-0'
          ref={ref} style={{ height: nextHeight, visibility: visibility, position: position, transition: 'height 0.5s', overflow: 'hidden' }}>
          <ProfileDropdown />
        </div>

      </MDBNavbar>

    </>
  );
}