import { useContext, useEffect } from "react";
import { DroneContext, CurrentMessageContext } from "../App";
import sendButton from "../images/send-icon.svg"

const MessageInput = (props) => {



  const { currentMessage, setCurrentMessage } = useContext(
    CurrentMessageContext
  );

  const handleChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const handleClick = (e) => {
    if (currentMessage !== "") {

      props.drone.publish({
        room: "observable-room",
        message: currentMessage
      })

      setCurrentMessage("")

    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };



  return (
    <div className="MessageInput">

      <input
        placeholder="Upiši poruku..."
        type="text"
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        value={currentMessage}
      />
      <img onClick={handleClick} src={sendButton} alt="" />
    </div>
  );
};

export default MessageInput;
