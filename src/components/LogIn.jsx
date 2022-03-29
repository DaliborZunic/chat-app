import detective from "../images/detective.svg"
import astronaut from "../images/astronaut.svg"
import ninja from "../images/ninja.svg"
import { MyUserNameContext, MyChosenAvatarContext } from "../App";
import { useContext, useEffect } from "react";

const LogIn = () => {

    const { myUserName, setMyUserName } = useContext(
        MyUserNameContext
    );

    const { myChosenAvatar, setMyChosenAvatar } = useContext(
        MyChosenAvatarContext
    );

    const handleChange = (e) => {
        setMyUserName(e.target.value)
    }

    useEffect( () => {
        console.log(myUserName);
    }, [myUserName] )

    const setAvatar = (myString) => {

        setMyChosenAvatar(myString)

    }

    useEffect( ()=> {
        console.log(myChosenAvatar);
    }, [myChosenAvatar] )

    return (
        <div className="Login">
            <span className="heading">First type your chat name and pick
                an avatar</span>
            <span className="description">Choose one from existing avatars</span>
            <input className="username-input" type="text" value={myUserName} onChange={handleChange} />
            <div className="avatar-container">

                <div onClick={() => setAvatar("astronaut")} className="avatar-item avatar-item-selected">
                    <img src={astronaut} alt="" />
                </div>

                <div onClick={() => setAvatar("ninja")} className="avatar-item">
                    <img src={ninja} alt="" />
                </div>

                <div onClick={() => setAvatar("detective")} className="avatar-item">
                    <img src={detective} alt="" />
                </div>

            </div>

            <button className="login-button">OK</button>
        </div>
    )
}

export default LogIn
