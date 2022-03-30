import { createContext, useEffect, useState } from "react";
import {
  uniqueNamesGenerator,
  starWars,
  adjectives,
} from "unique-names-generator";
import LogIn from "./components/LogIn";
import MessageInput from "./components/MessageInput";
import Messages from "./components/Messages";
import "./styles/main.scss";
import { Scrollbars } from 'react-custom-scrollbars-2';

export const CurrentMessageContext = createContext();

export const AllMessagesContext = createContext();

export const MyUserNameContext = createContext();

export const MyChosenAvatarContext = createContext();

function App() {
  const [myUserName, setMyUserName] = useState("");

  const [myChosenAvatar, setMyChosenAvatar] = useState("");

  const [drone, setDrone] = useState("");

  useEffect(() => {
    if (drone !== "") {
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

        room.on("message", (message) => {
          setAllMessages((prevValues) => [
            ...prevValues,
            {
              messageBody: message.data,
              userID: message.clientId,
              userName: message.member,
              timestamp: message.timestamp,
            },
          ]);
        });
      });
    }
  }, [drone]);

  const [currentMessage, setCurrentMessage] = useState("");

  const [allMessages, setAllMessages] = useState([]);

  return (
    <MyChosenAvatarContext.Provider
      value={{ myChosenAvatar, setMyChosenAvatar }}
    >
      <MyUserNameContext.Provider value={{ myUserName, setMyUserName }}>
        <AllMessagesContext.Provider value={{ allMessages, setAllMessages }}>
          <CurrentMessageContext.Provider
            value={{ currentMessage, setCurrentMessage }}
          >
            <div className="App">
              {drone === "" ? (
                <LogIn drone={drone} setDrone={setDrone} />
              ) : (
                <div className="main-container">

                  <Scrollbars>

                    <Messages drone={drone} />
                  </Scrollbars>


                  <MessageInput drone={drone} />
                </div>
              )}
            </div>
          </CurrentMessageContext.Provider>
        </AllMessagesContext.Provider>
      </MyUserNameContext.Provider>
    </MyChosenAvatarContext.Provider>
  );
}

export default App;
