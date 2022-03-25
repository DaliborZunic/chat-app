const Message = (props) => {
  return (
    <div className="Message">
        <span className="message-sender">{props.user}</span>
        <span className="message-body">{props.messageBody}</span>
      
    </div>
  )
}

export default Message
