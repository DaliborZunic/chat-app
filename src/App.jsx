import { createContext, useContext, useEffect, useState, useRef } from "react";
import {
  uniqueNamesGenerator,
  starWars,
  adjectives,
} from "unique-names-generator";
import LogIn from "./components/LogIn";
import MessageInput from "./components/MessageInput";
import Messages from "./components/Messages";
import "./styles/main.scss";
import { Scrollbars } from "react-custom-scrollbars-2";
import Sidebar from "./components/Sidebar";
import hamburger from "./images/hamburger.svg";
import close from "./images/close.svg";

export const CurrentMessageContext = createContext();

export const AllMessagesContext = createContext();

export const MyUserNameContext = createContext();

export const MyChosenAvatarContext = createContext();

function App() {
  const [myUserName, setMyUserName] = useState("");

  const [myChosenAvatar, setMyChosenAvatar] = useState("");

  const [activeUsers, setActiveUsers] = useState([]);

  const [drone, setDrone] = useState("");

  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const [currentlyTyping, setCurrentlyTyping] = useState([]);

  const scrollAnchor = useRef(null);

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
          if (message.data) {
            if (message.data.hasOwnProperty("isTyping")) {
              if (message.data.isTyping) {
                setCurrentlyTyping((prevValues) => [
                  ...prevValues,
                  message.member.id,
                ]);
              } else {
                setCurrentlyTyping((prevValues) =>
                  prevValues.filter((value) => value !== message.member.id)
                );
              }
            } else {
              setAllMessages((prevValues) => [
                ...prevValues,
                {
                  messageBody: message.data,
                  userID: message.clientId,
                  userName: message.member,
                  timestamp: message.timestamp,
                },
              ]);
              scrollAnchor.current.scrollIntoView({ behavior: "smooth" });
            }
          }
        });

        room.on("members", (members) => {
          setActiveUsers(members);
        });

        room.on("member_join", (member) => {
          console.log(`${member.clientData.myUserName} joined the room`);
          setActiveUsers((prevValues) => [...prevValues, member]);
        });

        room.on("member_leave", (member) => {
          console.log(`${member.clientData.myUserName} left the room`);
          setActiveUsers((prevValues) =>
            prevValues.filter((user) => user.id !== member.id)
          );
        });
      });
    }
  }, [drone]);

  const handleMobileToggle = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  const [currentMessage, setCurrentMessage] = useState("");

  const [allMessages, setAllMessages] = useState([]);

  const usePreviousValue = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevCurrentMessage = usePreviousValue(currentMessage);

  useEffect(() => {
    if (prevCurrentMessage !== undefined) {
      if (prevCurrentMessage.length === 0 && currentMessage.length === 1) {
        drone.publish({
          room: "observable-room",
          message: { isTyping: true },
        });
      } else if (
        prevCurrentMessage.length === 1 &&
        currentMessage.length === 0
      ) {
        drone.publish({
          room: "observable-room",
          message: { isTyping: false },
        });
      }
    }
  }, [currentMessage]);

  useEffect(() => {
    console.log(currentlyTyping);
  }, [currentlyTyping]);

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
                  <button onClick={handleMobileToggle} className="mobileToggle">
                    <img
                      className="hamburger-icon"
                      src={showMobileSidebar ? close : hamburger}
                      alt=""
                    />
                  </button>

                  <div
                    className={`sidebar-wrapper ${
                      showMobileSidebar ? "show-sidebar-wrapper" : ""
                    }`}
                  >
                    <Sidebar drone={drone} activeUsers={activeUsers} />
                  </div>

                  <div className="content-wrapper">
                    <Scrollbars>
                      <Messages drone={drone} />
                      <div ref={scrollAnchor} className="scrollAnchor"></div>
                    </Scrollbars>

                    <MessageInput drone={drone} />
                  </div>
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
