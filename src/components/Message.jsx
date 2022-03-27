const Message = (props) => {
  const myMessageStyle = {
    backgroundColor: "#10a887",
    alignSelf: "end"
  };

  return (
    <div className= {`Message ${props.sentByMe === true ? "sent-by-me" : null}`}>
      <span className="message-sender">{props.user}</span>
      <span className="message-body">{props.messageBody}</span>
    </div>
  );
};

export default Message;
