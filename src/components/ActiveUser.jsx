import detective from "../images/detective.svg";
import astronaut from "../images/astronaut.svg";
import ninja from "../images/ninja.svg";

const ActiveUser = (props) => {

    const setAvatar = () => {
        if (props.avatar === "detective") {
          return detective
        }
    
        if (props.avatar === "astronaut") {
          return astronaut
        }
    
        if (props.avatar === "ninja") {
          return ninja
        }
      }

  return (
    <div className={`ActiveUser ${props.currentUser ? "currentUser" : ""}`}>

        <div className="sidebar-avatar-frame">
            <img className="active-user-avatar-icon" src={setAvatar()} alt="" />
        </div>
      
      <span className="sidebar-username">{props.username}</span>
      <span>{props.currentlyTyping.includes(props.activeUser) ? "is typing" : ""}</span>
    </div>
  );
};

export default ActiveUser;
