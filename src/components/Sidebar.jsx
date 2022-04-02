import React from "react";
import ActiveUser from "./ActiveUser";

const Sidebar = (props) => {
  return (
    <div className="Sidebar">
      {props.activeUsers.map((activeUser) => (
        <ActiveUser
          key={activeUser.id}
          username={activeUser.clientData.myUserName}
          avatar={activeUser.clientData.myChosenAvatar}
          currentUser = {props.drone.clientId === activeUser.id ? true : false}
        />
      ))}
    </div>
  );
};

export default Sidebar;
