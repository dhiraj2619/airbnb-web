import axios from "axios";
import {
  FETCH_PROPERTY_AMENITYLIST_FAILURE,
  FETCH_PROPERTY_AMENITYLIST_REQUEST,
  FETCH_PROPERTY_AMENITYLIST_SUCCESS,
  FETCH_PROPERTY_OPTIONS_FAILURE,
  FETCH_PROPERTY_OPTIONS_REQUEST,
  FETCH_PROPERTY_OPTIONS_SUCCESS,
  FETCH_PROPERTYTYPE_FAILURE,
  FETCH_PROPERTYTYPE_REQUEST,
  FETCH_PROPERTYTYPE_SUCCESS,
} from "../constants/PropertyConstant";
import { ServerApi } from "../../config/ServerApi";

export const fetchAllPropertyTypes = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PROPERTYTYPE_REQUEST });

    const { data } = await axios.get(`${ServerApi}/property/alltypes`);

    dispatch({ type: FETCH_PROPERTYTYPE_SUCCESS, payload: data.allTypes });
  } catch (error) {
    console.error("Error fetching property type:", error);
    dispatch({
      type: FETCH_PROPERTYTYPE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchPrivacyOptions = (propertyTypeId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PROPERTY_OPTIONS_REQUEST });

    const { data } = await axios.get(
      `${ServerApi}/property/privacyoptions/${propertyTypeId}`
    );

    dispatch({ type: FETCH_PROPERTY_OPTIONS_SUCCESS, payload: data.options });
  } catch (error) {
    console.error("Error fetching property option:", error);
    dispatch({
      type: FETCH_PROPERTY_OPTIONS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchAmenititesList =
  (propertyTypeId, token) => async (dispatch) => {
    try {
      dispatch({ type: FETCH_PROPERTY_AMENITYLIST_REQUEST });

      const { data } = await axios.get(
        `${ServerApi}/property/amenities/${propertyTypeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: FETCH_PROPERTY_AMENITYLIST_SUCCESS,
        payload: data.amenities,
      });
    } catch (error) {
      console.error("Error fetching amenities list:", error);
      dispatch({
        type: FETCH_PROPERTY_AMENITYLIST_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
