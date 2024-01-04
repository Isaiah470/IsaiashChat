import React, { useContext, useState } from 'react';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBIcon, MDBContainer, } from 'mdb-react-ui-kit';
import { ListContext } from './ListWrapper';

export default function DropdownSort() {
  const { sortMethod, setSortMethod, } = useContext(ListContext);
  const sortToIcon = { 'new': 'paper-plane', 'old': 'scroll', 'hot': 'fire', 'top': 'circle-arrow-up', 'bottom': 'circle-arrow-down', 'controversial': 'angry' };
  const handleDropdown = (sortMethod) => {
    setSortMethod(sortMethod);
  };

  return (
    <MDBContainer className='mt-2'>
      <MDBDropdown className='' animation={/*false*/ true} >
        <MDBDropdownToggle color='secondary'> <MDBIcon fas icon={sortToIcon[sortMethod]} className='me-2' /> {sortMethod} </MDBDropdownToggle>
        <MDBDropdownMenu style={{ margin: 0 }} dark >
          <MDBDropdownItem link onClick={() => handleDropdown('new')}> <MDBIcon fas icon="paper-plane me-2" />New</MDBDropdownItem>
          <MDBDropdownItem link onClick={() => handleDropdown('old')}> <MDBIcon fas icon="scroll me-2" />Old</MDBDropdownItem>
          <MDBDropdownItem link onClick={() => handleDropdown('hot')}> <MDBIcon fas icon="fire me-2" />Hot</MDBDropdownItem>
          <MDBDropdownItem link onClick={() => handleDropdown('top')}> <MDBIcon fas icon="circle-arrow-up me-2" />Top</MDBDropdownItem>
          <MDBDropdownItem link onClick={() => handleDropdown('bottom')}> <MDBIcon fas icon="circle-arrow-down me-2" />Bottom</MDBDropdownItem>
          <MDBDropdownItem link onClick={() => handleDropdown('controversial')}> <MDBIcon fas icon="angry me-2" />Controversial</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    </MDBContainer>
  )
}