import axios from "axios";
import {
  FETCH_HOST_PROPERTY_FAILURE,
  FETCH_HOST_PROPERTY_REQUEST,
  FETCH_HOST_PROPERTY_SUCCESS,
} from "../constants/PropertyConstant";
import { ServerApi } from "../../config/ServerApi";

export const fetchHostProperties = (userId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_HOST_PROPERTY_REQUEST });

    const { data } = await axios.get(
      `${ServerApi}/property/processingproperties/${userId}`
    );

    
    dispatch({
      type: FETCH_HOST_PROPERTY_SUCCESS,
      payload: data.hostingProperties,
    });

    return data.hostingProperties;
  } catch (error) {
    dispatch({
      type: FETCH_HOST_PROPERTY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
