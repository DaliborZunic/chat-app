import { useContext, useEffect, useState } from "react";
import { DroneContext, CurrentMessageContext } from "../App";
import sendButton from "../images/send-icon.svg";
import emojiIcon from "../images/emoji-icon.svg";
import Picker from 'emoji-picker-react';

const MessageInput = (props) => {

  const [emojiPickerShown, setEmojiPickerShown] = useState(false)

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

  const handleEmojiIcon = () => {
    setEmojiPickerShown(!emojiPickerShown)
  }



  return (
    <div className="MessageInput">

      <input
        placeholder="Upiši poruku..."
        type="text"
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        value={currentMessage}
      />

      {
        emojiPickerShown && <Picker />
      }
      <img className="emoji-icon" onClick={handleEmojiIcon} src={emojiIcon} alt="" />

      <img onClick={handleClick} src={sendButton} alt="" />
    </div>
  );
};

export default MessageInput;
