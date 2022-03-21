import React, { FC } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../store";

import { signOutHandler } from "../../store/actions/authActions";

const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return <div></div>;
};
