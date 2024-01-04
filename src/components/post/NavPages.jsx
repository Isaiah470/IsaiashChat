import React, { useState } from 'react';
import useOutsideClick from '../../utils/useOutsideClick'
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBIcon,
  MDBPopover, MDBPopoverHeader, MDBPopoverBody,
  MDBBtn,
  MDBInput,

} from 'mdb-react-ui-kit';

//onclick of ..., show tooltip , field to go to text area, +- button, go button 

export default function NavPages({ numPages, currPageProp }) {
  const [currPage, setCurrPage] = useState(currPageProp);
  const [toPrevPage, setPrevPage] = useState(currPage - 3);
  const [toNextPage, setNextPage] = useState(currPage + 3);
  const [open, setOpen] = useState(false);
  const ref = useOutsideClick(() => { setOpen(false) });
  const [openTwo, setOpenTwo] = useState(false);
  const refTwo = useOutsideClick(() => { setOpenTwo(false) });
  const changePage = (e) => {
    setCurrPage(e.target.value);
  }

  return (
    <nav >

      <MDBPagination className='mt-2'>
        {currPage !== 1 && <MDBPaginationItem className='shadow-3 me-2'>
          <MDBPaginationLink href='#;' onClick={() => { }}> <MDBIcon fas icon="angle-left me-1" /> Prev</MDBPaginationLink> </MDBPaginationItem>}

        {currPage !== 1 && <MDBPaginationItem className='shadow-3' >
          <MDBPaginationLink href='#;'>1</MDBPaginationLink>
        </MDBPaginationItem>}

        {currPage > 1 ? currPage <= 5 ? [...Array(currPage - 2).keys()].map((num) => <MDBPaginationItem className='shadow-3' key={num} >
          <MDBPaginationLink href='#;'  >{num + 2}</MDBPaginationLink>
        </MDBPaginationItem>) :
          <>
            <MDBPaginationItem className='shadow-3' >
              <MDBPopover className='page-link m-0' btnClassName='px-2 py-0 page-link h-100' color='light' onHide={() => { setPrevPage(currPage - 3); setOpen(false) }} onShow={() => setOpen(true)} btnChildren='. . .' isOpen={open} onClick={(e) => { e.stopPropagation(); }} >
                <div ref={ref}>
                  <MDBPopoverHeader text-size='sm' >Go to page:</MDBPopoverHeader>
                  <MDBPopoverBody className='p-1' >
                    <div className='d-flex ' style={{ width: '15rem' }}>
                      <MDBInput className='flex-shrink-1' label='Page number' min={1} max={numPages} value={toPrevPage}
                        id='typeNumber' type='number' onChange={(e) => setPrevPage(e.target.value)} />
                      <MDBBtn size='sm' className='text-nowrap' onClick={() => changePage()}> <div>Go</div> </MDBBtn> </div>

                  </MDBPopoverBody>
                </div>
              </MDBPopover>

            </MDBPaginationItem>
            <MDBPaginationItem className='shadow-3' >
              <MDBPaginationLink href='#;'>{currPage - 2}
              </MDBPaginationLink>
            </MDBPaginationItem>
            <MDBPaginationItem className='shadow-3'>
              <MDBPaginationLink href='#;'>{currPage - 1}
              </MDBPaginationLink>
            </MDBPaginationItem>
          </> : <></>}

        {numPages > 1 && <MDBPaginationItem className='shadow-3' active={true}>
          <MDBPaginationLink href='#;'>{currPage}</MDBPaginationLink>
        </MDBPaginationItem>}

        {currPage < numPages ? numPages - currPage < 5 ? [...Array(numPages - currPage - 1).keys()].map((num) => <MDBPaginationItem className='shadow-3' key={num} >
          <MDBPaginationLink href='#;'>{num + currPage + 1}</MDBPaginationLink>
        </MDBPaginationItem>) :
          <>
            <MDBPaginationItem className='shadow-3' >
              <MDBPaginationLink href='#;'>{currPage + 1}</MDBPaginationLink>
            </MDBPaginationItem>
            <MDBPaginationItem className='shadow-3' >
              <MDBPaginationLink href='#;'>{currPage + 2}
              </MDBPaginationLink>
            </MDBPaginationItem>



            <MDBPaginationItem className='shadow-3'>
              <MDBPopover className='page-link m-0' btnClassName='px-2 py-0 page-link h-100' color='light' onHide={() => { setNextPage(currPage + 3); setOpenTwo(false) }} onShow={() => setOpenTwo(true)}
                btnChildren='. . .' isOpen={openTwo} onClick={(e) => { e.stopPropagation(); }}>
                <div ref={refTwo}>
                  <MDBPopoverHeader text-size='sm' >Go to page:</MDBPopoverHeader>
                  <MDBPopoverBody className='p-1' >
                    <div className='d-flex ' style={{ width: '15rem' }}>
                      <MDBInput className='flex-shrink-1' label='Page number' min={1} max={numPages} value={toNextPage}
                        id='typeNumber' type='number' onChange={(e) => setNextPage(e.target.value)} />
                      <MDBBtn size='sm' className='text-nowrap'> <div>Go</div> </MDBBtn> </div>

                  </MDBPopoverBody>
                </div>
              </MDBPopover>

            </MDBPaginationItem>
          </> : <></>}


        {currPage !== numPages && <MDBPaginationItem className='shadow-3' > <MDBPaginationLink href='#;'>{numPages}</MDBPaginationLink>
        </MDBPaginationItem>}


        {currPage !== numPages && <MDBPaginationItem className='shadow-3 ms-2'>
          <MDBPaginationLink href='#;'>Next <MDBIcon fas icon="angle-right ms-1" /> </MDBPaginationLink>
        </MDBPaginationItem>}
      </MDBPagination>
    </nav>
  )
}
