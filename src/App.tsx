import "./App.css";
import { authWithGoogle } from "./store/actions/authActions";
import { signIn } from "./store/actions/authActions";

function App() {
  return (
    <div className="App">
      <button
        onClick={() =>
          signIn({ email: "hello", password: "22" }, () => {
            console.log("hello");
          })
        }
      >
        просто
      </button>
      <button onClick={authWithGoogle}>гугл</button>
    </div>
  );
}

export default App;
