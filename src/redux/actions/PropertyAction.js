import axios from "axios";
import {
  FETCH_HOST_PROPERTY_FAILURE,
  FETCH_HOST_PROPERTY_REQUEST,
  FETCH_HOST_PROPERTY_SUCCESS,
  UPDATE_PROPERTY_LOCATION_FAILURE,
  UPDATE_PROPERTY_LOCATION_REQUEST,
  UPDATE_PROPERTY_LOCATION_SUCCESS,
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

export const updateLocationofProperty =
  (propertyId, locationData, token) => async (dispatch) => {
    try {
      console.log("payload being sent", locationData);
      console.log("property id is", propertyId);
      console.log("token is", token);

      dispatch({ type: UPDATE_PROPERTY_LOCATION_REQUEST });

      const { data } = await axios.put(
        `${ServerApi}/property/location/${propertyId}`,
        locationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(" API response received:", data);

      dispatch({
        type: UPDATE_PROPERTY_LOCATION_SUCCESS,
        payload: data.property,
      });

      console.log("Api response", data);
    } catch (error) {
      console.error("Error while updating property location:", error);

      dispatch({
        type: UPDATE_PROPERTY_LOCATION_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
