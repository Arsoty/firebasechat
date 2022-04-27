import { Provider } from "react-redux";
import "./styles/AppStyles.scss";
import { store } from "./store";
import "./App.css";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { BrowserRouter, Navigate, Routes } from "react-router-dom";
import { Auth } from "./components/Auth";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Grid } from "@mui/material";
import { Workspace } from "./components/Workspace";

function App() {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Grid container className="appBox">
            <Routes>
              {!authenticated && <Route path="/auth" element={<Auth />} />}
              {authenticated && (
                <>
                  <Route path="/chat" element={<Workspace />} />
                  {/* <Route path="/dashboard" element={Dashboard} /> */}
                </>
              )}
              <Route
                path="*"
                element={<Navigate to={authenticated ? "/chat" : "/auth"} />}
              />
              {/* <Route path="/dashboard" element={Dashboard} /> */}
            </Routes>
          </Grid>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
