import axios from "axios";
import {
  CHECK_USER_FAIL,
  CHECK_USER_REQUEST,
  CHECK_USER_SUCCESS,
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
