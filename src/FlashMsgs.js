import React from 'react'

const FlashMsgs = (props) => {
  return (
    <div className="floating-alert">
      {props.messages.map((msg, index) => (
        <div key={index} className={`alert alert-success floating-alert`}>
          {msg}
        </div>
      ))}
    </div>
  )
}

export default FlashMsgs
