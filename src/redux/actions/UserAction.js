import axios from "axios";
import {
  CHECK_USER_FAIL,
  CHECK_USER_REQUEST,
  CHECK_USER_SUCCESS,
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

    dispatch({ type: CHECK_USER_SUCCESS, payload: data.userExists });

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
  ({ firstName, lastName, email, mobile, dateofbirth, password }) =>
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
     });

      const { data } = await axios.post(`${ServerApi}/user/signup`, {
        firstName,
        lastName,
        email,
        mobile,
        dateofbirth,
        password,
      });
      console.log("[REGISTER_USER] server responded:", data);

      if (data.success) {
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });

        return {
          success: true,
          user: data.user,
          token: data.token,
        };
      }
    } catch (error) {
       dispatch({
         type:REGISTER_USER_FAIL
       })
        console.error(
       "[REGISTER_USER] caught error:",
       error.response?.data || error.message
     );

    }
  };
