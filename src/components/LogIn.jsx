import detective from "../images/detective.svg"
import astronaut from "../images/astronaut.svg"
import ninja from "../images/ninja.svg"

const LogIn = () => {
    return (
        <div className="Login">
            <span className="heading">First type your chat name and pick
                an avatar</span>
                <span className="description">Choose one from existing avatars</span>
                <input className="username-input" type="text" />
                <div className="avatar-container">

                    <div className="avatar-item avatar-item-selected">
                        <img src={astronaut} alt="" />
                    </div>

                    <div className="avatar-item">
                        <img src={ninja} alt="" />
                    </div>

                    <div className="avatar-item">
                        <img src={detective} alt="" />
                    </div>

                </div>

                <button className="login-button">OK</button>
        </div>
    )
}

export default LogIn
