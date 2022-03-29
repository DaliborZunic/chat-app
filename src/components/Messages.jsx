import { useContext, useEffect } from "react";
import Message from "./Message";
import { AllMessagesContext } from "../App";

const Messages = (props) => {
  const { allMessages, setAllMessages } = useContext(AllMessagesContext);

  return (
    <div className="Messages">
      {allMessages.map((message, index) => (

          <Message
            key={index}
            sentByMe = {props.drone.clientId === message.userID ? true : false}
            messageBody={message.messageBody}
            timestamp={message.timestamp}
            user={message.userName.clientData.myUserName}
            avatar={message.userName.clientData.myChosenAvatar}
          />

      ))}
    </div>
  );
};

export default Messages;
