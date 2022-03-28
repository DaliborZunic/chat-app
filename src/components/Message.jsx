const Message = (props) => {
  const myMessageStyle = {
    backgroundColor: "#10a887",
    alignSelf: "end"
  };

  return (

    <div className={`Message ${props.sentByMe === true ? "sent-by-me" : null}`}>

      <div className="avatar-column">
        <div className="avatar"></div>
      </div>

      <div className="message-column">

        <span className="message-sender">{props.user}</span>
        <span className="message-timestamp">09:00</span>
        <span className="message-body">{props.messageBody}</span>
      </div>


    </div>
  );
};

export default Message;
