import { useContext, useEffect } from "react";
import { DroneContext, CurrentMessageContext } from "../App";

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
      <button onClick={handleClick}>POŠALJI</button>
    </div>
  );
};

export default MessageInput;
