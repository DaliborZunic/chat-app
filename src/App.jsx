import { createContext, useState } from "react";
import {
  uniqueNamesGenerator,
  starWars,
} from "unique-names-generator";
import MessageInput from "./components/MessageInput";
import Messages from "./components/Messages";
import "./styles/main.scss";

export const CurrentMessageContext = createContext();

export const AllMessagesContext = createContext();

function App() {

  const generateUsername = () =>
    uniqueNamesGenerator({
      dictionaries: [starWars]
    });

  const [currentMessage, setCurrentMessage] = useState({
    messageBody: "",
    user: generateUsername(),
  });

  const [allMessages, setAllMessages] = useState([]);

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
