import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBCard, MDBCardHeader, MDBCardBody, MDBCardText, MDBIcon } from 'mdb-react-ui-kit';
import socket from '../../utils/socket.js'
export default function ChatUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    function onUserOnline(data) {
      if (data?.online) {
        if (!users.includes(data.uniqueKey)) {
          const noRepeats = users.filter((user) => user !== data.uniqueKey)
          setUsers([...noRepeats, data.uniqueKey])
        }
        else {
          setUsers(users);
        }
      }
      else {
        setUsers(users => users.filter((user) => user !== data.uniqueKey));
      }
    }

    function onGetOnline(data) {
      setUsers(data);
    }

    socket.on('user.user.online', onUserOnline);
    socket.on('user.get.online', onGetOnline);
    return () => {
      socket.off('user.user.online', onUserOnline);
      socket.off('user.get.online', onGetOnline);
    };
  }, [users])

  return (
    <MDBContainer className='d-flex-column'>
      {users.map((user) =>
        <MDBCard key={user}>
          <div className='d-flex'>
            <MDBIcon icon='user' size='3x' className='mr-3' />
            <MDBCardText > {user} </MDBCardText>
          </div>
        </MDBCard>
      )
      }
    </MDBContainer>
  )
}
