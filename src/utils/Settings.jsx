import React, { useState, useRef, useCallback } from 'react';
import {
  MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane, MDBRange,
  MDBRow, MDBCol, MDBBtn, MDBIcon,
} from 'mdb-react-ui-kit';
import useOutsideClick from './useOutsideClick'
import './Settings.css'
import SettingsTabs from './SettingsTabs'
import BlackDragon from "../img/blackDragon.svg?react";
import StylishDragon from "../img/StylishDragon.svg?react";
export default function Settings() {
  const [verticalActive, setVerticalActive] = useState('tab1');
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const categories = ['General', 'Appearance', 'Notifications', 'Security', 'Advanced', 'App/Bots'];
  
  const ref = useOutsideClick(() => {setIsVisible(false)});
  const pauseRef = useRef();
  const buttonRef = useRef();
  const rangeRef = useRef();
  const imagesRef = useRef();
  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }
    setVerticalActive(value);
  };
  const handleCollapseClick = () => {
    setIsCollapsed(!isCollapsed)
  }
  const handleVisibleClick = () => {
    setIsVisible(!isVisible)
  }
  /* 
  categories.map((name, index) => {
  return (
  <MDBTabsPane show={verticalActive === 'tab1'}>
      <p>asdad</p>
  </MDBTabsPane>
  )})
  */
  // let x= createsvg from svg
  //x.setfills(color)
  //set background x

  //CAROUSEL MDBOOTSTRAP FOR MULTIPLE DRAGONS
  const [flippedState, setFlipped]  = useState([0, 0, 0, 0, 0, 0, 0])
  const handleFlip = useCallback((state, index) => {
  const nextFlipped = state.map((flip, i) => {
      if (i === index) {
        return flip === 0 ? 1 : 0;
      } else {
        return flip;
      }
    });
    setFlipped(nextFlipped)  }, []) 
  //
  return (
    <>
      <div ref = {imagesRef} className = 'd-flex' style = {{position: 'relative' , overflowX: 'auto', 
        scrollSnapType: 'x mandatory', }} >
        <div className = 'w-100 d-flex flex-shrink-0 h-100 carousel-settings-items' style = {{scrollSnapAlign: 'center'}}> 
          {[0,1,2,3].map((index) => {return <BlackDragon data-flipped = {flippedState[index] ? '1' : '0'} onClick = {() => {handleFlip(flippedState, index)}}/>})}
            </div>
        <div className = 'w-100 d-flex flex-shrink-0 h-100 carousel-settings-items' style = {{scrollSnapAlign: 'center'}}> {[4,5,6].map((index) => {return <StylishDragon data-flipped = {flippedState[index] ? '1' : '0'} onClick = {() => {handleFlip(flippedState, index)}}/>})}</div>
      
      </div>
      
      <MDBBtn ref= {buttonRef} className = 'settings-display-button' onClick = {(e) => {e.stopPropagation(); handleVisibleClick()}}>
        <MDBIcon fas icon = 'bars'/>
      </MDBBtn>
      <MDBRange
        defaultValue={2.5}
        min='0'
        max='50'
        step='0.1'
        id='settings-custom-slider'
        label= ''
        inputRef = {rangeRef}
        style = {{}}
        onChange = {() =>{
          const rangeWidth = rangeRef.current.offsetWidth;
          const sliderValue = rangeRef.current.value;
          const buttonWidth = buttonRef.current.offsetWidth;
          const percentWidth = rangeWidth*sliderValue/50;
          const calcWidth = Math.min(Math.max(0, percentWidth- buttonWidth/2), rangeWidth - buttonWidth)
          ref.current.style.setProperty('--settings-column-offset', `${Math.min(calcWidth, rangeWidth -200)}px`);
          buttonRef.current.style.transform = `translateX(${calcWidth}px)`;
          imagesRef.current.style.setProperty('--images-color', `hsl(${sliderValue/50*359},50%,50%)`);
          imagesRef.current.style.setProperty('--images-hue-rotate', `${sliderValue/50*359}deg`)
        }}
      /> 
      <MDBRow >
        <MDBCol ref = {ref} size= '0' md = '3' className = {`settings-column ${isVisible ? 'expanded' : 'contracted'} square border border-2 p-0`}>
          <div className = 'd-flex flex-nowrap settings-background' style = {{position: 'static', width: '100%'}}>
          
          <MDBTabs className={`flex-column text-center ${isCollapsed ? 'w-50' : 'w-100'} settings-nav`} color = 'dark' >
            {
              categories.map((name, index) => {
                return (
                <MDBTabsItem tag = 'span' className = 'btn' key = {name}>
                  <MDBTabsLink className = 'bg-light d-block settings-link' onClick={() => handleVerticalClick('tab' + (index+1))} active={verticalActive === 'tab'+ (index+1)} style = {{
                 fontSize: '1em' }}>
                    <span > {name} </span>
                  </MDBTabsLink>
                </MDBTabsItem>
                )})
            }
          </MDBTabs>
          
        <MDBBtn className = 'ps-0 pe-1 settings-line-button' onClick = {() => handleCollapseClick()}>          </MDBBtn>
         
            {isCollapsed && <div className = 'hidden-settings-wrapper hidden-settings flex-grow-1 bg-dark ' ref = {pauseRef} style = {{ overflowX: 'scroll',  }}>
           <MDBTabs className={`flex-column text-center `}>
              <MDBTabsItem tag = 'span' >
                <span className = 'text-white'>You found the HIDDEN DRAGON!</span> 
                </MDBTabsItem>
                <MDBBtn onClick = {()=> {const running = pauseRef.current.style.animationPlayState !== 'paused'; pauseRef.current.style.animationPlayState = running ? 'paused' : 'running'} }>
                  Pause
                </MDBBtn>
          </MDBTabs> 
        </div>}
          
          </div>
          
        </MDBCol>
        
        <MDBCol size='12' md= '9' >
          <MDBTabsContent>
            <MDBTabsPane show={verticalActive === 'tab1'}>
              <SettingsTabs cardLists = {[
      {title: 'lmao', children: [{type: 'switch', title: 'WOWs', body: 'text'},
        {type: 'switch', title: 'WOW', body: 'text'}, 
        {type: 'range', title: 'range', data: {min: 0, max: 50, step: 0.5}},              {type: 'dropdown',title: 'dropdown'}, {type: 'range', title: 'range2', data: {min: 0, max: 50, step: 0.5}},              {type: 'dropdown', title: 'seconddrop'}, 
        {type: 'radio', title:'radio'}, 
        {type: 'subcard', title: 'subcard', children: [
            {type: 'switch', title: 'WOW', body: 'text'}, 
            {type: 'range', title: 'range', data: {min: 0, max: 50, step: 0.5}},              {type: 'dropdown',title: 'com'}, 
            {type: 'radio', title: 'radio'},], },
      ]}, {title: 'huh', children: [{type: 'link', title: 'fdas'}]}
          ]} />
            </MDBTabsPane>
            <MDBTabsPane show={verticalActive === 'tab2'}>
              Profile content
            </MDBTabsPane>
            <MDBTabsPane show={verticalActive === 'tab3'}>
              Messages content
            </MDBTabsPane>
            <MDBTabsPane show={verticalActive === 'tab4'}>
              Messages content
            </MDBTabsPane>
            <MDBTabsPane show={verticalActive === 'tab5'}>
              Messages content
            </MDBTabsPane>
            <MDBTabsPane show={verticalActive === 'tab6'}>
              Messages content
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>

    </>
  );
}