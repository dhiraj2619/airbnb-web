import axios from "axios";
import {
  FETCH_HOST_PROPERTY_FAILURE,
  FETCH_HOST_PROPERTY_REQUEST,
  FETCH_HOST_PROPERTY_SUCCESS,
  GET_PROPERTY_BYID_FAILURE,
  GET_PROPERTY_BYID_REQUEST,
  GET_PROPERTY_BYID_SUCCESS,
  UPDATE_PROPERTY_LOCATION_FAILURE,
  UPDATE_PROPERTY_LOCATION_REQUEST,
  UPDATE_PROPERTY_LOCATION_SUCCESS,
  UPDATE_PROPERTY_STEP_FAILURE,
  UPDATE_PROPERTY_STEP_REQUEST,
  UPDATE_PROPERTY_STEP_SUCCESS,
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

      dispatch({
        type: UPDATE_PROPERTY_LOCATION_SUCCESS,
        payload: data.property,
      });
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

export const updatePropertyStep =
  (propertyId, stepData, token) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PROPERTY_STEP_REQUEST });

      const { data } = await axios.put(
        `${ServerApi}/property/${propertyId}/step`,
        stepData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: UPDATE_PROPERTY_STEP_SUCCESS,
        payload: data.property,
      });
    } catch (error) {
      console.error("Error while updating property step:", error);

      dispatch({
        type: UPDATE_PROPERTY_STEP_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getPropertyById = (propertyId, token) => async (dispatch) => {
  try {
    dispatch({ type: GET_PROPERTY_BYID_REQUEST });

    const { data } = await axios.get(`${ServerApi}/property/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: GET_PROPERTY_BYID_SUCCESS,
      payload: data.property,
    });
    return data.property;
    
  } catch (error) {
    console.error("Error fetching property by ID:", error);

    dispatch({
      type: GET_PROPERTY_BYID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
