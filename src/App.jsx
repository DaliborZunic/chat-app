import { createContext, useEffect, useState } from "react";
import {
  uniqueNamesGenerator,
  starWars,
  adjectives,
} from "unique-names-generator";
import MessageInput from "./components/MessageInput";
import Messages from "./components/Messages";
import "./styles/main.scss";

export const CurrentMessageContext = createContext();

export const AllMessagesContext = createContext();

function App() {
  const generateUsername = () =>
    uniqueNamesGenerator({
      dictionaries: [adjectives, starWars],
      length: 2,
      separator: " ",
    });

  useEffect(() => {
    const CHANNEL_ID = "ef5U3gbtGAc2hez6";
    const drone = new window.ScaleDrone(CHANNEL_ID, {
      data: {
        // Will be sent out as clientData via events
        name: "Dalibooor"
      },
    });

    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      console.log("Successfully connected to Scaledrone");

      const room = drone.subscribe("observable-room");
      room.on("open", (error) => {
        if (error) {
          return console.error(error);
        }
        console.log("Successfully joined room");
      });

      // More events code to follow..
    });
  }, []);

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
