const Message = (props) => {

  const formatTimestamp = (unixTimestamp) => {
    const miliseconds = unixTimestamp * 1000
    const dateObject = new Date(miliseconds)
    const hours = addZero(dateObject.getHours().toString())  
    const minutes = addZero(dateObject.getMinutes().toString())  

    return `${hours}:${minutes}`
  }

  const addZero = (number) => {
    if (number.length === 1) {
      return `${0}${number}`
    }
    else {
      return `${number}`
    }
  }

  return (

    <div className={`Message ${props.sentByMe === true ? "sent-by-me" : null}`}>

      <div className="avatar-column">
        <div className="avatar"></div>
      </div>

      <div className="message-column">

        <span className="message-sender">{props.user}</span>
        <span className="message-timestamp">{formatTimestamp(props.timestamp)}</span>
        <span className="message-body">{props.messageBody}</span>
      </div>


    </div>
  );
};

export default Message;
