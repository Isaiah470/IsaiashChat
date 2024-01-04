import React, { useEffect, useState } from 'react';
import socket from '../utils/socket'
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox, 
  MDBInputGroup,
  MDBValidation,
  MDBValidationItem
}
from 'mdb-react-ui-kit';

export default function Login() {
  const navigate = useNavigate();
  const [justifyActive, setJustifyActive] = useState('tab1');;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [buttonState, setButton] = useState(false);
  const [checked, setCheck] = useState(false);
  const [formValue, setFormValue] = useState({ uname: '', pword: '', cpword: '', terms: '', });
  const [valid, setValid] = useState({uname: '', pword: '', cpword: '', terms: '', });
  const [feedback, setFeedback] = useState({uname: '', pword: '', cpword: '', terms: '', });
  const [validL, setValidL] = useState({uname: '', pword: ''});
  const [feedbackL, setFeedbackL] = useState({uname: '', pword: '' });
  useEffect(() => {
    function setSessionID(data) {
      localStorage.setItem('token', JSON.stringify(data));
      localStorage.setItem('id', data.id);
      localStorage.setItem('sessionID', data.sessionID);
      localStorage.setItem('password', data.password);
      console.log(JSON.stringify(data));
      socket.auth = {token: data};
      socket.disconnect().connect();
      navigate("../");
    }
    function setBadLogin(data) {
      if (data === 'Server error') {
        setFeedbackL({...feedbackL, ['pword']: 'Server error. Try again' })}
      else {
      setFeedbackL({...feedbackL, ['pword']: 'Incorrect password' }) }
      setValidL({...validL, ['pword']: 'is-invalid' })
      setButton(false);
    }
    function setDuplicate(data) {
      console.log('duplicate');
      console.log(data);
      if (data.none === 'none') { 
        setValid({...valid, ['uname']: 'is-valid' })
      }
      else {
      setValid({...valid, ['uname']: 'is-invalid' })
      setFeedback({...feedback, ['uname']: 'Username already taken' })
      }
    }
    
    socket.on('user.get.success', setSessionID);
    socket.on('user.get.error', setBadLogin);
    socket.on('duplicate user', setDuplicate);
    return () => {
      socket.off('user.get.success', setSessionID);
      socket.off('user.get.error', setBadLogin);
      socket.off('duplicate user', setDuplicate);
    };
  }, []);
  
  const onChange = (e) => {
    const val = e.target.value;
    console.log(val);
    if (e.target.name === 'pword') {
      (val === "") ? setFeedback({...feedback, ['pword']: 'Please choose a password' 
  }) : setFeedback({...feedback, ['pword']: 'Password is too short' })
    }
    if (e.target.name === 'cpword') {
      (val === "") ? setFeedback({...feedback, ['cpword']: 'Please confirm password' 
  }) : setFeedback({...feedback, ['cpword']: 'Passwords need to match' })
    }
    switch(e.target.name) {
      case 'uname':
        socket.emit('check duplicates', {'username': val}) 
        console.log('sent')
        break;
      case 'pword':
        if (val !== formValue.cpword ) {
          (val.length < 10) ? setValid({...valid, ['cpword']: 'is-invalid', ['pword']: 'is-invalid' }) : setValid({...valid, ['cpword']: 'is-invalid', ['pword']: 'is-valid' });
        }
        else {
          (val.length < 10) ? setValid({...valid, ['cpword']: 'is-valid', ['pword']: 'is-invalid' }) : setValid({...valid, ['cpword']: 'is-valid', ['pword']: 'is-valid' });
        }
        break;
      case 'cpword':
        (val !== formValue.pword) ? setValid({...valid, ['cpword']: 'is-invalid' 
  }) : setValid({...valid, ['cpword']: 'is-valid' }); 
        break;
      default: 
        break;
    }
    setFormValue({ ...formValue, [e.target.name]: val});
    
  }; 
  
  const login = (e) => {
    e.preventDefault();
    setButton(true)
    socket.emit('login', {
        username: username,
        password: password,
    });
  }
  
  const register = (e) => {
    e.preventDefault();
    setButton(true);
    if (formValue.uname.length >= 1 && feedback.uname !== 'Username already taken' && formValue.pword.length >= 10 && formValue.pword === formValue.cpword && checked) {
    socket.emit('register', {
        username: formValue.uname,
        password: formValue.pword,
    });
      
    } else {
      console.log("wrong registration")
      setButton(false);
    }
  }
  
  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setButton(false);
    setFormValue({uname: '', pword: '', cpword: '', terms: '', });
    setUsername('');
    setPassword('');
    setValid({uname: '', pword: '', cpword: '', terms: '', });
    setValidL({uname: '',pword: ''});
    setFeedback({uname: '', pword: '', cpword: '', terms: '', });
    setFeedbackL({uname: '',pword: ''});
    setJustifyActive(value);
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom d-flex flex-column w-100">
    <MDBRow>
        
    <MDBCol md='6'>
      <img src="https://cdn.stocksnap.io/img-thumbs/960w/shore-bird_WNEE11N4R4.jpg" className="img-fluid" alt="Sample image" />
    </MDBCol>
        
    <MDBCol md='6' >
    <MDBRow>
    <MDBCol md = '6' offsetMd = '3'>
        
    <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
    <MDBTabsItem>
      <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
        Login
      </MDBTabsLink>
      </MDBTabsItem>
      <MDBTabsItem>
      <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
        Register
      </MDBTabsLink>
      </MDBTabsItem>
    </MDBTabs>            

    <MDBTabsContent>
      
      {/* FIRST TAB*/ }
      <MDBTabsPane show={justifyActive === 'tab1'}>
       
        <div className="text-center mb-3">
          <p>Sign in:</p>
        </div>
        
      <MDBValidation>
        <MDBValidationItem className='col-md-12 '  
feedback= {feedbackL.uname} invalid>
            <MDBInput
              className = {validL.uname}
              wrapperClass='mb-4'
              value={username}
              name='cpword'
              onChange={(e) => setUsername(e.target.value)}
              id='validationCustom11'
              required
              label='Username'
            />
        </MDBValidationItem>
        <MDBValidationItem className='col-md-12 '  
feedback= {feedbackL.pword} invalid>
            <MDBInput
              className = {validL.pword}
              wrapperClass='mb-4'
              value={password}
              name='cpword'
              onChange={(e) => {if (e.target.value == '') setValidL({...feedbackL, ['pword']: ''});setPassword(e.target.value)}}
              id='validationCustom12'
              required
              label='Password'
              type = 'password'
            />
        </MDBValidationItem>
        <div className="d-flex justify-content-between mx-4 mb-4">
          <MDBCheckbox name='flexCheck' value='' id='form1F3' label='Remember me' defaultChecked />
          <a href="!#">Forgot password?</a>
        </div>
        
        <MDBBtn type = "submit" className="mb-4 w-100" disabled = {buttonState} onClick = {login}>Sign in</MDBBtn>
        <p className="text-center">Not a member? <a href="" onClick={(e) => {e.preventDefault(); handleJustifyClick('tab2')}} >Register</a></p>

      </MDBValidation>
      </MDBTabsPane>
      
      {/* SECOND TAB*/ }
      <MDBTabsPane show={justifyActive === 'tab2'}>
        <div className="text-center mb-3">
          <p>Sign up:</p>
        </div>
        
      <MDBValidation>
        <MDBValidationItem className='col-md-12'  
feedback={feedback.uname} invalid>
            <MDBInput 
              className = {valid.uname}
              wrapperClass='mb-4'
              value={formValue.uname}
              name='uname'
              onChange={onChange}
              id='validationCustom01'
              required
              maxLength = '64'
              label='Username'
            />
        </MDBValidationItem>
          {/* <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' value = {username} onChange={(e) => s
          etUsername(e.target.value)}/> */}
        <MDBValidationItem className='col-md-12'  
feedback={feedback.pword} invalid>
            <MDBInput
              className = {valid.pword}
              wrapperClass='mb-4'
              value={formValue.pword}
              name='pword'
              onChange={onChange}
              id='validationCustom02'
              required
              minLength = '10'
              label='Password'
              type = 'password'
            />
        </MDBValidationItem>
        {/*<MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' value = {password} onChange={(e) => setPassword(e.target.value)}/>*/}
        <MDBValidationItem className='col-md-12 '  
feedback= {feedback.cpword} invalid>
            <MDBInput
              className = {valid.cpword}
              wrapperClass='mb-4'
              value={formValue.cpword}
              name='cpword'
              onChange={onChange}
              id='validationCustom03'
              required
              label='Confirm Password'
              type = 'password'
            />
        </MDBValidationItem>
        {/*<MDBInput wrapperClass='mb-4' label='Confirm Password' id='form1' type='password'/>*/}
        
        <MDBValidationItem className='col-12 mb-4' feedback='You must agree before submitting.' invalid>  
          <div className="d-flex justify-content-between mx-4 mb-4">
          <MDBCheckbox className = {valid.terms} label='Agree to terms and conditions' id='invalidCheck' required checked = {checked} onChange = {(e)=> { if (!checked){setValid({...valid, ['terms']: 'is-valid' }) } else {setValid({...valid, ['terms']: 'is-invalid' }) } setCheck(!checked);}}/>
            </div>
        </MDBValidationItem>
         
        {/* <div className='d-flex justify-content-center mb-4'>
          <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
        </div>*/}
        
        
        <MDBBtn type = 'submit' className="mb-4 w-100" disabled = {buttonState} onClick = {register}>Register</MDBBtn>
        
        </MDBValidation>
      </MDBTabsPane>

    </MDBTabsContent>
    </MDBCol>
    </MDBRow>
    </MDBCol>
    </MDBRow>
    </MDBContainer>
  );
}
