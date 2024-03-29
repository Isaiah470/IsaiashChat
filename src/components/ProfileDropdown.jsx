import React, { useState } from 'react';
import {
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBtn,
  MDBNavbarNav,
  MDBIcon,
} from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
export default function ProfileDropdown() {
  const navigate = useNavigate();
  //0 is text, 1 is icon, 2 is link
  const dropdownItems = [['Profile', 'circle-user', '#'],
  ['Settings', 'cog', 'Settings',], ['Bugs/Suggestions', 'bug', '#'],
  ['Contact Us', 'pen-to-square', '#'],
  //         ['Suicide Prevention Resources', 'book-skull', 'https://sanctioned-suicide.net/'],               
  ['Log Out', 'right-from-bracket', '/login']
  ];

  return (
    <MDBNavbarNav className='ms-auto p-0 m-0'>

      <MDBNavbarItem className='p-0 m-0'>
        <MDBNavbarLink href='#' className='text-nowrap my-0'> User: {localStorage.getItem('id') + ""} </MDBNavbarLink>
      </MDBNavbarItem>

      <MDBNavbarItem className='d-none d-md-block p-0 my-0'>
        <MDBDropdown animation={ /*true */ true} className='my-0'>
          <MDBDropdownToggle tag='a' className='nav-link' role='button'>
            Dropdown
          </MDBDropdownToggle>


          <MDBDropdownMenu style={{ margin: 0, /* animationDuration: */ }}>

            {dropdownItems.map((item) => {
              return (
                <MDBDropdownItem link onClick = {() => navigate(`${item[2]}`)} className='text-nowrap' key={item[0]}>
                  <MDBIcon fas icon={item[1]} className='me-4' />
                  {item[0]}
                </MDBDropdownItem>
              )
            })}

          </MDBDropdownMenu>


        </MDBDropdown>
      </MDBNavbarItem>

      {dropdownItems.map((item) => {
        return (
          <MDBNavbarItem className='d-md-none ms-4' key={item[0]}>
            <MDBNavbarLink className='text-nowrap ' onClick = {() => navigate(`${item[2]}`)}>
              <MDBIcon fas icon={item[1]} className='me-4' /> {item[0]}
            </MDBNavbarLink>
          </MDBNavbarItem>
        )
      })}

    </MDBNavbarNav>
  )
}
