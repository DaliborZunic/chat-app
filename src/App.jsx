import { createContext, useEffect, useState } from "react";
import MessageInput from "./components/MessageInput";
import Messages from "./components/Messages";
import "./styles/main.scss";

export const CurrentMessageContext = createContext();

export const AllMessagesContext = createContext();

function App() {
  const [currentMessage, setCurrentMessage] = useState({
    messageBody: "",
    user: "Blue Moon",
  });

  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    console.log(allMessages);
  }, [allMessages]);

  return (
    <AllMessagesContext.Provider value={{ allMessages, setAllMessages }}>

      <CurrentMessageContext.Provider
        value={{ currentMessage, setCurrentMessage }}
      >
        <div className="App">
          <div className="main-container">
            <Messages />
            <MessageInput />
          </div>
        </div>
      </CurrentMessageContext.Provider>

    </AllMessagesContext.Provider>
  );
}

export default App;
