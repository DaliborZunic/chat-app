import { useContext } from "react";
import { CurrentMessageContext, AllMessagesContext } from "../App";

const MessageInput = () => {
  const { currentMessage, setCurrentMessage } = useContext(
    CurrentMessageContext
  );

  const { allMessages, setAllMessages } = useContext(AllMessagesContext);

  const handleChange = (e) => {
    setCurrentMessage({ ...currentMessage, messageBody: e.target.value });
  };

  const handleClick = () => {
    if (currentMessage.messageBody !== "") {
      setAllMessages([...allMessages, currentMessage]);
      setCurrentMessage({ ...currentMessage, messageBody: "" });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        handleClick()
      }
  }

  return (
    <div className="MessageInput">
      <input
        placeholder="Upiši poruku..."
        type="text"
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        value={currentMessage.messageBody}
      />
      <button onClick={handleClick}>POŠALJI</button>
    </div>
  );
};

export default MessageInput;
