import React from "react";
import ActiveUser from "./ActiveUser";

const Sidebar = (props) => {
  return (
    <div className="Sidebar">
      {props.activeUsers.map((activeUser) => (
        <ActiveUser
          key={activeUser.id}
          activeUser={activeUser.id}
          username={activeUser.clientData.myUserName}
          avatar={activeUser.clientData.myChosenAvatar}
          drone={props.drone}
          currentUser = {props.drone.clientId === activeUser.id ? true : false}
          currentlyTyping = {props.currentlyTyping}
        />
      ))}
    </div>
  );
};

export default Sidebar;
