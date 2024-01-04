import React from 'react'; 
import {
  MDBTable, MDBTableHead, MDBTableBody, 
  MDBBtn, MDBBadge, 
} from 'mdb-react-ui-kit';
//additional props: need to have: 
export default function Table({
  columns, rows, 
}) {
  return (
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Title</th>
          <th scope='col'>Status</th>
          <th scope='col'>Position</th>
          <th scope='col'>Actions</th>
        </tr>
      </MDBTableHead>
      
      <MDBTableBody>
        {rows.map((row, index) => {
          return (
            <tr>
              <td>
                <div className='d-flex align-items-center'>
                  <img
                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                    alt=''
                    style={{ width: '45px', height: '45px' }}
                    className='rounded-circle'
                  />
                  <div className='ms-3'>
                    <p className='fw-bold mb-1'>John Doe</p>
                    <p className='text-muted mb-0'>john.doe@gmail.com</p>
                  </div>
                </div>
              </td>
              <td>
                <p className='fw-normal mb-1'>Software engineer</p>
                <p className='text-muted mb-0'>IT department</p>
              </td>
              <td>
                <MDBBadge color='success' pill>
                  Active
                </MDBBadge>
              </td>
              <td>Senior</td>
              <td>
                <MDBBtn color='link' rounded size='sm'>
                  Edit
                </MDBBtn>
              </td>
            </tr>
          )
        })}
        
      </MDBTableBody>
    </MDBTable>
  );
}