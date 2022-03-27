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

  let username = generateUsername()

  const [drone, setDrone] = useState(
    new window.ScaleDrone("ef5U3gbtGAc2hez6", {
      data: username,
    })
  );

  useEffect(() => {
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

      room.on("data", (data, member) => {
        console.log(member);
        console.log(drone);

        setAllMessages((prevValues) => [
          ...prevValues,
          { messageBody: data, userID: member.id, userName: member },
        ]);
      });

      // More events code to follow..
    });
  }, []);

  const [currentMessage, setCurrentMessage] = useState("");

  const [allMessages, setAllMessages] = useState([]);

  return (
    <AllMessagesContext.Provider value={{ allMessages, setAllMessages }}>
      <CurrentMessageContext.Provider
        value={{ currentMessage, setCurrentMessage }}
      >
        <div className="App">
          <div className="main-container">
            <Messages drone={drone} />
            <MessageInput drone={drone} />
          </div>
        </div>
      </CurrentMessageContext.Provider>
    </AllMessagesContext.Provider>
  );
}

export default App;
