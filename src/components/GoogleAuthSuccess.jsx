import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import {
  GOOGLE_LOGIN_FAIL,
  GOOGLE_LOGIN_SUCCESS,
} from "../redux/constants/UserConstant";
import axios from "axios";
import { ServerApi } from "../config/ServerApi";

const GoogleAuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");

    if (!token) {
      dispatch({ type: GOOGLE_LOGIN_FAIL, payload: "Missing token" });
      return navigate("/");
    }

    localStorage.setItem("jwt", token);

    axios
      .get(`${ServerApi}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: data.user });
      })
      .catch((err) =>
        dispatch({
          type: GOOGLE_LOGIN_FAIL,
          payload: err.response?.data?.message || "Login failed",
        })
      )
      .finally(() => navigate("/"));
  }, [dispatch, navigate]);
  return <p className="m-4">Signing you in…</p>;
};

export default GoogleAuthSuccess;
