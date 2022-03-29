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

export const CurrentMessageContext = createContext();

export const AllMessagesContext = createContext();

export const MyUserNameContext = createContext();

export const MyChosenAvatarContext = createContext();

function App() {
  const generateUsername = () =>
    uniqueNamesGenerator({
      dictionaries: [adjectives, starWars],
      length: 2,
      separator: " ",
    });

  const [myUserName, setMyUserName] = useState("")

  const [myChosenAvatar, setMyChosenAvatar] = useState("")

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

      room.on("message", (message) => {


        setAllMessages((prevValues) => [
          ...prevValues,
          { messageBody: message.data, userID: message.clientId, userName: message.member, timestamp: message.timestamp },
        ]);
      });

    });
  }, []);



  const [currentMessage, setCurrentMessage] = useState("");

  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    console.log(allMessages)
  }, [allMessages])


  return (

    <MyChosenAvatarContext.Provider value={{ myChosenAvatar, setMyChosenAvatar }}>

      <MyUserNameContext.Provider value={{ myUserName, setMyUserName }}>

        <AllMessagesContext.Provider value={{ allMessages, setAllMessages }}>
          <CurrentMessageContext.Provider
            value={{ currentMessage, setCurrentMessage }}
          >
            <div className="App">
              <LogIn />

              {/* <div className="main-container">

            <Messages drone={drone} />
            <MessageInput drone={drone} />
          </div> */}

            </div>


          </CurrentMessageContext.Provider>
        </AllMessagesContext.Provider>


      </MyUserNameContext.Provider>

    </MyChosenAvatarContext.Provider>





  );
}

export default App;
