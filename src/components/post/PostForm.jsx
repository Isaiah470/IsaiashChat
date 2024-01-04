import socket from '../../utils/socket';
import { useState, useEffect } from 'react'
import {
  MDBContainer, MDBRow, MDBTextArea, MDBDropdown, MDBBtn, MDBInput, 
} from 'mdb-react-ui-kit'
export default function PostForm({ }) {
  const [value, setValue] = useState('');
  const [spaceList, setSpaceList] = useState([])
  const handleSubmit = () => {
    const data = { content: value, spaceId: 1, isPost: true }
    setValue('')
    socket.emit('postComment', data)
  }
  useEffect(() => {
    function setSpaces(data) {
        setSpaceList(data.spaces)
    }
    socket.emit('getSpaces')
    socket.on('spaces.get.success', setSpaces);
    return () => {
      socket.off('spaces.get.success', setSpaces);
    };
  }, []);
  return (
    <MDBContainer className='w-100'>
      <MDBRow>
        Space:
        <MDBInput list="spaces" >
        </MDBInput>
        
        <datalist id="spaces">
          {spaceList.map((space) => {return <option key = {space} value={space}></option>})}
        </datalist>
      </MDBRow>
      <MDBRow>
        Title: <MDBInput autoFocus={true} id='typeText' type='text' />
      </MDBRow>
      <MDBRow>
        Content:
        <MDBTextArea className='' autoFocus={true} value={value} onChange={(e) => setValue(e.target.value)} rows={4} onSubmit={() => handleSubmit()}>

        </MDBTextArea>
        <div className='d-flex justify-content-end'>
          <MDBBtn onClick={() => handleSubmit()}>
            Submit
          </MDBBtn>
        </div>
      </MDBRow>

    </MDBContainer>

  )
}