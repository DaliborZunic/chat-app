import detective from "../images/detective.svg";
import astronaut from "../images/astronaut.svg";
import ninja from "../images/ninja.svg";
import { MyUserNameContext, MyChosenAvatarContext } from "../App";
import { useContext, useEffect } from "react";

const LogIn = (props) => {
  const { myUserName, setMyUserName } = useContext(MyUserNameContext);

  const { myChosenAvatar, setMyChosenAvatar } = useContext(
    MyChosenAvatarContext
  );

  const handleChange = (e) => {
    setMyUserName(e.target.value);
  };

  const setAvatar = (myString) => {
    setMyChosenAvatar(myString);
  };

  const handleOkButton = () => {
    props.setDrone(
      new window.ScaleDrone("ef5U3gbtGAc2hez6", {
        data: {
          myUserName,
          myChosenAvatar,
        },
      })
    );
  };

  useEffect( ()=> {
    console.log(props.drone);
  }, [props.drone] )

  return (
    <div className="Login">
      <span className="heading">
        First type your chat name and pick an avatar
      </span>
      <span className="description">Choose one from existing avatars</span>
      <input
        className="username-input"
        type="text"
        value={myUserName}
        onChange={handleChange}
      />
      <div className="avatar-container">
        <div
          onClick={() => setAvatar("astronaut")}
          className={`avatar-item ${
            myChosenAvatar === "astronaut" ? "avatar-item-selected" : null
          }`}
        >
          <img src={astronaut} alt="" />
        </div>

        <div
          onClick={() => setAvatar("ninja")}
          className={`avatar-item ${
            myChosenAvatar === "ninja" ? "avatar-item-selected" : null
          }`}
        >
          <img src={ninja} alt="" />
        </div>

        <div
          onClick={() => setAvatar("detective")}
          className={`avatar-item ${
            myChosenAvatar === "detective" ? "avatar-item-selected" : null
          }`}
        >
          <img src={detective} alt="" />
        </div>
      </div>

      <button onClick={handleOkButton} className="login-button">
        OK
      </button>
    </div>
  );
};

export default LogIn;
