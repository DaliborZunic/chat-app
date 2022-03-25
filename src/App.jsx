import MessageInput from "./components/MessageInput";
import Messages from "./components/Messages";
import "./styles/main.scss";

function App() {
  return (
    <div className="App">
      <div className="main-container">
        <Messages />
        <MessageInput />
      </div>
    </div>
  );
}

export default App;
