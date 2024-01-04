import React, {useState, useCallback, Fragment} from 'react'
import { MDBCard, MDBCardTitle, MDBListGroup, MDBListGroupItem, MDBSwitch , MDBBtn, MDBIcon, MDBCardBody, MDBRange,MDBRadio, MDBBtnGroup , MDBCollapse, } from 'mdb-react-ui-kit';
/* want to have color chooser, upload background, change password, change flair input*/

export default function SettingsTabs({cardLists}) {
  const [showShow, setShowShow] = useState(false);

  const toggleShow = () => setShowShow(!showShow);
  const dontshow = false;
  /*
  -card list has: title, children, each children is type, text, if dropdown has dropdown, etc, modals, if is link, then
  - subcard, subcard has title, cards. these cards can also be links to more subcards. 
  
need to have subform: title and cards

need to have cards: list together, each card is link to new thing, or opens a modal, 
have radio buttons, dropdown select. 

card item types:
link (right arrow, link subcard)
switch (toggle switch)
range (slider)
dropdown (dropdown)
radio (radio buttons)
text (text input)
subcard (has another cardlist in it)
collapse (idon't even know. )
{cardLists} 
{cardLists.map((cardList) => { return (
      <Fragment key = {cardList.title} >
    <div><span> {cardList.title} </span></div>
    {cardList.children.map((child) => {return 
      matchChild(child)

    })}
    </Fragment>
)})}

const matchChild = useCallback((child)=> {
  else if (child.type === 'link') {
  }
  else if (child.type === 'range') {
  }
  else if (child.type === 'dropdown') {
  }
  else if (child.type === 'radio') {
  }
  else if (child.type === 'text') {
  }
  else if (child.type === 'subcard') {
  }
  else if (child.type === 'collapse') {
  }
  else if (childtype === 'modal') {
  }
}, [])
  */
  // NEED TO GIVE EVERYTHING (SWITCHES) UNIQUE IDS!!! HOW TO DO THIS? TAKE ACCOUNT DIFFERENT PANES TOO, SUBCARDS. actually, unique key is not so hard, only requires those in map are different. 
  const matchChild = useCallback((child)=> {
  if (child.type === 'switch') {
    return (
    <MDBBtn key = {child.title} className = 'w-100 square border-bottom' noRipple color = 'light'>
      <div className = 'd-flex align-items-center '>
        <div className = 'text-start me-auto'>
          <span className = ''> {child.title} </span>
          <div className = 'fw-lighter'>
            <span >{child.body}</span> 
          </div>
        </div>
      <MDBSwitch id='flexSwitchCheckDefault' className = 'p-0 m-0' wrapperClass = 'p-0 m-0 ' inline /> 
      </div>
      </MDBBtn>
    )
  }
  else if (child.type === 'range') {
    return (
      <MDBBtn key = {child.title} className = 'w-100 border-bottom' noRipple color = 'light'>
        <div className = 'd-flex align-items-center'>
          <div className = 'text-start me-auto'>
          <span className = ''> {child.title} </span>
          </div>
          <MDBRange
            defaultValue={2.5}
            min={child.data.min}
            max={child.data.max}
            step={child.data.step}
            id='customRange6'
            label= ''
            style = {{}}
          />
        </div>
      </MDBBtn>
    )
  }
  else if (child.type === 'dropdown') {
    return (
      <MDBBtn key = {child.title} className = 'w-100 border-bottom' noRipple color = 'light'>
        <div className = 'd-flex'>
          <div className = 'text-start me-auto'>
            <span className = ''> Dapibus ac facilisis in </span>
            <div className = 'fw-lighter'>
              <span > New line</span> 
            </div>
           </div>
          <select className=" select align-items-start border-0 ps-1 pe-4  rounded " style = {{paddingTop: '0.6em', pattingBottom: '0px', verticalAlign: 'middle', height: '2.5em'}}>
            <option value="1">Onedaadaaads </option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="5">Five</option>
            <option value="6">Six</option>
            <option value="7">Seven</option>
            <option value="8">Eight</option>
          </select>
        </div>
      </MDBBtn>
      
    )
  }
  else if (child.type === 'radio') {
    return (
      <MDBListGroupItem key = {child.title}>
        <MDBListGroup >

          <div  className = 'd-flex btn  w-100 shadow-0' color = 'light'> <span className = ' '>Dapibus ac facilisis in </span> </div>
        <div  className = 'btn  w-100 shadow-0 pb-0' color = 'light'>
          <div className = 'd-flex align-items-center'>
            <MDBRadio name = 'radioNoLabel' id='radioNoLabell' className = 'me-3  '/>
            <div className = 'ps-1 text-start me-auto'>
            <span className = ''> Dapibus ac facilisis in </span>
            <div className = 'fw-lighter'>
              <span > New line</span> 
            </div>
            </div>

          </div>
        </div>
          <MDBBtn className = 'w-100 border-bottom' noRipple color = 'light'>
            <div className = 'd-flex align-items-center'>
              <MDBIcon fas icon = 'trash' className = 'ms-1 me-4 '/>
              <div className = 'text-start me-auto'>
              <span className = ''> Dapibus ac facilisis in </span>
              <div className = 'fw-lighter'>
                <span > New line</span> 
              </div>
              </div>
              <MDBIcon fas icon = 'angle-right' />
            </div>
            </MDBBtn>
        <div  className = 'btn  w-100 shadow-0 border-bottom' color = 'light'>
          <div className = 'd-flex align-items-center'>
            <MDBRadio name = 'radioNoLabel' id='radioNoLabell' className = 'me-3 '/>
            <div className = 'ps-1 text-start me-auto'>
            <span className = ''> Dapibus ac facilisis in </span>
            <div className = 'fw-lighter'>
              <span > New line</span> 
            </div>
            </div>
          </div>
        </div>
        </MDBListGroup>
        </MDBListGroupItem>
    )
  }
  else if (child.type === 'subcard') {
    return (
      <MDBListGroup key = {child.title} >
      <MDBListGroupItem >
        <MDBListGroup >
        <span className = 'fw-normal small'>Vestibulum at eros </span>
          <MDBListGroupItem noBorders>
          </MDBListGroupItem>

          {child.children.map((grandchild) => {
              return matchChild(grandchild)
          })}

        </MDBListGroup>
      </MDBListGroupItem>
      </MDBListGroup>
    )
  }
  else if (child.type === 'collapse') {
    return (
      <Fragment key = {child.title}>
      <MDBBtn onClick={toggleShow} className = 'w-100 border-bottom' noRipple color = 'light'>
        <div className = 'd-flex align-items-center'>
          <MDBIcon fas icon = 'trash' className = 'me-4 '/>
          <div className = 'text-start me-auto'>
          <span className = ''> Dapibus ac facilisis in </span>
          <div className = 'fw-lighter'>
            <span > New line</span> 
          </div>
          </div>
          <MDBIcon fas icon = 'angle-right' />
        </div>
      </MDBBtn>
      <MDBCollapse show={showShow}>
        <MDBBtn onClick={toggleShow} className = 'w-100 border-bottom' noRipple color = 'light'>
          <div className = 'd-flex align-items-center'>
            <MDBIcon fas icon = 'trash' className = 'me-4 '/>
            <div className = 'text-start me-auto'>
            <span className = ''> Dapibus ac facilisis in </span>
            <div className = 'fw-lighter'>
              <span > New line</span> 
            </div>
            </div>
            <MDBIcon fas icon = 'angle-right' />
          </div>
        </MDBBtn>
      </MDBCollapse>
      </Fragment>
    )
  }
  else if (child.type === 'link') {
    return (
    <Fragment key = {child.title}>
    <MDBBtn  className = 'w-100 border-bottom' noRipple color = 'light'>
      <div className = 'd-flex align-items-center'>
        <MDBIcon fas icon = 'trash' className = 'ms-1 me-4 '/>
        <div className = 'text-start me-auto'>
        <span className = ''> Dapibus ac facilisis in </span>
        <div className = 'fw-lighter'>
          <span > New line</span> 
        </div>
        </div>
        <MDBIcon fas icon = 'angle-right' />
      </div>
      </MDBBtn>
    </Fragment>
      )
  }
  }, [])
  
    return (
      <MDBCard >
        { cardLists.map((cardList) => { return (
              <Fragment key = {cardList.title} >
            <div><span> {cardList.title} </span></div>
            {cardList.children.map((child) => {
                return (<Fragment key= {child.title} >{matchChild(child)} </Fragment> )
            })}
            </Fragment>
        )})}

        {dontshow && <MDBListGroup className = ''>
          {/* subcard title*/}
            <div className = 'w-100 border-bottom mb-4'  color = 'light'>
              <div className = 'd-flex align-items-center'>
                <MDBBtn floating tag='a' className = 'mx-4' color = 'light'>
                  <MDBIcon fas icon = 'arrow-left' />
                </MDBBtn>
                
                <div className = 'text-start me-auto'>
                <span className = 'fw-normal'> Dapibus ac facilisis in </span>
                </div>
                
              </div>
            </div>
          {/* toggle switch
          want this to toggle on click also
          */}
            <MDBBtn className = 'w-100 square border-bottom' noRipple color = 'light'>
            <div className = 'd-flex align-items-center '>
              <div className = 'text-start me-auto'>
                <span className = ''> Dapibus ac facilisis in </span>
                <div className = 'fw-lighter'>
                  <span > New line</span> 
                </div>
              </div>
            <MDBSwitch id='flexSwitchCheckDefault' className = 'p-0 m-0' wrapperClass = 'p-0 m-0 ' inline /> 
            </div>
            </MDBBtn>

          {/* modal*/}
              <MDBBtn className = 'w-100 border-bottom' noRipple color = 'light'>
              <div className = 'd-flex align-items-center'>
                <MDBIcon fas icon = 'trash' className = 'me-4 '/>
                <div className = 'text-start me-auto'>
                <span className = ''> Dapibus ac facilisis in </span>
                <div className = 'fw-lighter'>
                  <span > New line</span> 
                </div>
                </div>
                <MDBIcon fas icon = 'angle-right' />
              </div>
              </MDBBtn>

          {/* Range */}
          <MDBBtn className = 'w-100 border-bottom' noRipple color = 'light'>
            <div className = 'd-flex align-items-center'>
              <div className = 'text-start me-auto'>
              <span className = ''>Dapibus ac facilisis in </span>
              </div>
              <MDBRange
                defaultValue={2.5}
                min='0'
                max='50'
                step='0.5'
                id='customRange4'
                label= ''
                style = {{}}
              />
            </div>
          </MDBBtn>
          {/* Select*/}
            <MDBBtn className = 'w-100 border-bottom' noRipple color = 'light'>
              <div className = 'd-flex'>
                <div className = 'text-start me-auto'>
                  <span className = ''> Dapibus ac facilisis in </span>
                  <div className = 'fw-lighter'>
                    <span > New line</span> 
                  </div>
                 </div>
                <select className=" select align-items-start border-0 ps-1 pe-4  rounded " style = {{paddingTop: '0.6em', pattingBottom: '0px', verticalAlign: 'middle', height: '2.5em'}}>
                  <option value="1">Onedaadaaads </option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Four</option>
                  <option value="5">Five</option>
                  <option value="6">Six</option>
                  <option value="7">Seven</option>
                  <option value="8">Eight</option>
                </select>
              </div>
            </MDBBtn>
          {/* Radio buttons*/}
          <MDBListGroupItem >
          <MDBListGroup >
            
            <div  className = 'd-flex btn  w-100 shadow-0 ps-0' color = 'light'> <span className = ' '>Dapibus ac facilisis in </span> </div>
          <div  className = 'btn  w-100 shadow-0 pb-0' color = 'light'>
            <div className = 'd-flex align-items-center'>
              <MDBRadio name = 'radioNoLabel' id='radioNoLabell' className = 'me-4 '/>
              <div className = 'text-start me-auto'>
              <span className = ''> Dapibus ac facilisis in </span>
              <div className = 'fw-lighter'>
                <span > New line</span> 
              </div>
              </div>
              
            </div>
          </div>

          <div  className = 'btn  w-100 shadow-0 border-bottom' color = 'light'>
            <div className = 'd-flex align-items-center'>
              <MDBRadio name = 'radioNoLabel' id='radioNoLabell' className = 'me-4 '/>
              <div className = 'text-start me-auto'>
              <span className = ''> Dapibus ac facilisis in </span>
              <div className = 'fw-lighter'>
                <span > New line</span> 
              </div>
              </div>
            </div>
          </div>
          </MDBListGroup>
          </MDBListGroupItem>
          

          {/* Modal */}

          
          <MDBListGroupItem >
            <MDBListGroup >
            <span className = 'fw-normal small'>Vestibulum at eros </span>
              <MDBListGroupItem noBorders>
                
              </MDBListGroupItem>
  
                <MDBBtn className = 'w-100 border-bottom' noRipple color = 'light'>
                  <div className = 'd-flex align-items-center'>
                    <MDBIcon fas icon = 'trash' className = 'me-4 '/>
                    <div className = 'text-start me-auto'>
                    <span className = ''> Dapibus ac facilisis in </span>
                    <div className = 'fw-lighter'>
                      <span > New line</span> 
                    </div>
                    </div>
                    <MDBIcon fas icon = 'angle-right' />
                  </div>
                </MDBBtn>

              <div className = ' btn w-100 shadow-0 border-bottom' color = 'light'>
                  <div className = 'd-flex align-items-center '>
                    <MDBRadio name = 'radioNoLabel' id='radioNoLabell' className = 'me-4 '/>
                    <div className = 'text-start me-auto'>
                    <span className = ''> Dapibus ac facilisis in </span>
                    <div className = 'fw-lighter'>
                      <span > New line</span> 
                    </div>
                    </div>
                    <MDBIcon fas icon = 'angle-right' />
                  </div>
                </div>

              <div  className = 'btn  w-100 shadow-0 border-bottom'  color = 'light'>
                  <div className = 'd-flex align-items-center'>
                    <MDBRadio name = 'radioNoLabel' id='radioNoLabell' className = 'me-4 '/>
                    <div className = 'text-start me-auto'>
                    <span className = ''> Dapibus ac facilisis in </span>
                    <div className = 'fw-lighter'>
                      <span > New line</span> 
                    </div>
                    </div>
                    <MDBIcon fas icon = 'angle-right' />
                  </div>
                </div>
              
            </MDBListGroup>
          </MDBListGroupItem>

          <MDBBtn onClick={toggleShow} className = 'w-100 border-bottom' noRipple color = 'light'>
            <div className = 'd-flex align-items-center'>
              <MDBIcon fas icon = 'trash' className = 'me-4 '/>
              <div className = 'text-start me-auto'>
              <span className = ''> Dapibus ac facilisis in </span>
              <div className = 'fw-lighter'>
                <span > New line</span> 
              </div>
              </div>
              <MDBIcon fas icon = 'angle-right' />
            </div>
          </MDBBtn>
          <MDBCollapse show={showShow}>
            <MDBBtn onClick={toggleShow} className = 'w-100 border-bottom' noRipple color = 'light'>
              <div className = 'd-flex align-items-center'>
                <MDBIcon fas icon = 'trash' className = 'me-4 '/>
                <div className = 'text-start me-auto'>
                <span className = ''> Dapibus ac facilisis in </span>
                <div className = 'fw-lighter'>
                  <span > New line</span> 
                </div>
                </div>
                <MDBIcon fas icon = 'angle-right' />
              </div>
            </MDBBtn>
          </MDBCollapse>

          
        </MDBListGroup> }
      
      </MDBCard>
  )
}