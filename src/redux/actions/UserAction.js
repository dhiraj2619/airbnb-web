import axios from "axios";
import {
  CHECK_USER_FAIL,
  CHECK_USER_REQUEST,
  CHECK_USER_SUCCESS,
  GOOGLE_LOGIN_FAIL,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from "../constants/UserConstant";
import { ServerApi } from "../../config/ServerApi";

export const checkUserExists = (email) => async (dispatch) => {
  try {
    dispatch({ type: CHECK_USER_REQUEST });

    const { data } = await axios.post(`${ServerApi}/user/check-user`, {
      email,
    });

    dispatch({
      type: CHECK_USER_SUCCESS,
      payload: { userExists: data.userExists, user: data.user },
    });

    return data.userExists;
  } catch (error) {
    console.error("something wents wrong");

    dispatch({
      type: CHECK_USER_FAIL,
      payload: error.response?.data?.message || error.message,
    });

    return false;
  }
};

export const RegisterUser =
  ({ firstName, lastName, email, mobile, dateofbirth, password, role }) =>
  async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });

      console.log("[REGISTER_USER] outgoing POST body:", {
        firstName,
        lastName,
        email,
        mobile,
        dateofbirth,
        password,
        role,
      });

      const { data } = await axios.post(`${ServerApi}/user/signup`, {
        firstName,
        lastName,
        email,
        mobile,
        dateofbirth,
        password,
        address: "N/A",
        role,
      });
      console.log("[REGISTER_USER] server responded:", data);

      localStorage.setItem("token", data.token);

      if (data.success) {
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });

        return {
          success: true,
          user: data.user,
          token: data.token,
        };
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";

      dispatch({
        type: REGISTER_USER_FAIL,
        payload: errorMessage,
      });
    }
  };

export const LoginWithEmail = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post(`${ServerApi}/user/login`, {
      email,
      password,
    });

    localStorage.setItem("token", data.token);

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });

    return {
      success: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
     const errorMessage =
        error.response?.data?.message || "Login issue - Internal server";

      dispatch({
        type: REGISTER_USER_FAIL,
        payload: errorMessage,
      });
  }
};

export const googleLogin = (accessToken) => async (dispatch) => {
  try {
    dispatch({ type: GOOGLE_LOGIN_REQUEST });

    const { data } = await axios.post(`${ServerApi}/user/google-login`, {
      token: accessToken,
    });

    const { token, user } = data;

    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    dispatch({
      type: GOOGLE_LOGIN_SUCCESS,
      payload: user,
    });

    return user;
  } catch (error) {
    dispatch({
      type: GOOGLE_LOGIN_FAIL,
      payload: error.response?.data?.message || "Google login failed",
    });
    return null;
  }
};

export const LogoutUser = () => async (dispatch) => {
  try {
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch({ type: LOGOUT_USER });
  } catch (error) {
    console.error("log out failed");
  }
};
