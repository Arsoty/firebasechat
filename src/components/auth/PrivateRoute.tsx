import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Route, RouteProps, Navigate } from "react-router-dom";

import { RootState } from "../../store";

interface Props extends RouteProps {
  //Поменяю
  component: any;
}

const PrivateRoute: FC<Props> = ({ component: Component, ...rest }) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Route
      {...rest}
      element={(props: any): JSX.Element =>
        authenticated ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
};
