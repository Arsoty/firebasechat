import { Provider } from "react-redux";
import { store } from "./store";
import "./App.css";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import Header from "./components/Header";
import { BrowserRouter, Navigate, Routes } from "react-router-dom";
import { Chat } from "./components/Chat";
import { Auth } from "./components/Auth";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Routes>
            {!authenticated && <Route path="/auth" element={<Auth />} />}
            {authenticated && (
              <>
                <Route path="/chat" element={<Chat />} />
                {/* <Route path="/dashboard" element={Dashboard} /> */}
              </>
            )}
            <Route
              path="*"
              element={<Navigate to={authenticated ? "/chat" : "/auth"} />}
            />
            {/* <Route path="/dashboard" element={Dashboard} /> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
