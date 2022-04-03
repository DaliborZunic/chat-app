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

      props.drone.publish({
        room: "observable-room",
        message: { isTyping: false },
      });

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

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    setCurrentMessage((prevValue) => `${prevValue}${emojiObject.emoji}`)
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
        emojiPickerShown && <Picker onEmojiClick={onEmojiClick} />
      }
      <img className="emoji-icon" onClick={handleEmojiIcon} src={emojiIcon} alt="" />

      <img className="send-button" onClick={handleClick} src={sendButton} alt="" />
    </div>
  );
};

export default MessageInput;
