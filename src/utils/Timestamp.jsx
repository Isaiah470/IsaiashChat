//basically, messageTime is timestamp of message (milliseconds since 1970) 
//you want to calculate difference between currentTime and message time, then if it is like 1000, or 1 second, display 1 sec, if it is like 60000, or a minute, display one minute, same for hours, days.
import { useState, useEffect, useCallback } from 'react'
import {
  MDBTooltip
} from 'mdb-react-ui-kit'
import useInterval from './useInterval'
export default function Timestamp({ messageTime }) {
  const [count, setCount] = useState(0);
  const hoverTimestamp = (new Date(messageTime)).toLocaleString()

  const currentTime = Date.now();
  let milliseconds = currentTime - messageTime;
  let displayedMessage = ''
  const timeToMessage = useCallback((milliseconds) => {
    let displayedMessage = ''
    if (milliseconds < (60000)) {
      displayedMessage = 'now'
    }
    else if (milliseconds < (3600000)) {

      milliseconds = Math.floor(milliseconds / (60000))
      displayedMessage = milliseconds + "m"
    }

    else if (milliseconds < (86400000)) {
      milliseconds = Math.floor(milliseconds / (3600000))
      displayedMessage = milliseconds + "h"
    }

    else if (milliseconds < (604800000)) {

      milliseconds = Math.floor(milliseconds / (86400000))
      displayedMessage = milliseconds + "d"

    }

    else if (milliseconds < (2628000000)) {
      milliseconds = Math.floor(milliseconds / (604800000))
      displayedMessage = milliseconds + "w"
    }

    else if (milliseconds < (31536000000)) {

      milliseconds = Math.floor(milliseconds / (2628000000))
      displayedMessage = milliseconds + "m"
    }

    else {

      milliseconds = Math.floor(milliseconds / (31536000000))
      displayedMessage = milliseconds + "yr"
    }
    return displayedMessage;
  }, [])

  displayedMessage = timeToMessage(milliseconds)
  useInterval(() => {
    setCount(count + 1);
  }, 1000);
  
  return (
    <div>
      <MDBTooltip tag='span' wrapperClass='m-0 small' title={<p className='p-0 m-0' style={{ fontSize: '0.75em', margin: '0px', }}> {hoverTimestamp} </p>}>
        {displayedMessage}
      </MDBTooltip>
    </div>
  );
}
