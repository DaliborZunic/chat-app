import React from "react";

const Sidebar = (props) => {
  return (
    <div className="Sidebar">
      {props.activeUsers.map((activeUser) => (
        <div key={activeUser.id}>{activeUser.clientData.myUserName}</div>
      ))}
    </div>
  );
};

export default Sidebar;
