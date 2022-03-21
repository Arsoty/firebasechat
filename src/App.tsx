import { Provider } from "react-redux";
import { store } from "./store";
import "./App.css";
import {
  authWithGoogle,
  signUp,
  signIn,
  fe,
} from "./store/actions/authActions";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <button
          onClick={() =>
            signUp({
              email: "yaya@gmail.com",
              password: "1234",
              nickname: "Joshua",
            })
          }
        >
          просто
        </button>
        <button onClick={() => authWithGoogle()}>гугл</button>
      </div>
    </Provider>
  );
}

export default App;
