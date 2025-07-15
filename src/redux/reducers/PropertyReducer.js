import {
  FETCH_HOST_PROPERTY_FAILURE,
  FETCH_HOST_PROPERTY_REQUEST,
  FETCH_HOST_PROPERTY_SUCCESS,
  FETCH_PROPERTY_FAILURE,
  FETCH_PROPERTY_REQUEST,
  FETCH_PROPERTY_SUCCESS,
  GET_PROPERTY_BYID_FAILURE,
  GET_PROPERTY_BYID_REQUEST,
  GET_PROPERTY_BYID_SUCCESS,
  GET_SELECTED_PRIVACY_BY_ID_FAILURE,
  GET_SELECTED_PRIVACY_BY_ID_REQUEST,
  GET_SELECTED_PRIVACY_BY_ID_SUCCESS,
  UPDATE_PROPERTY_LOCATION_FAILURE,
  UPDATE_PROPERTY_LOCATION_REQUEST,
  UPDATE_PROPERTY_LOCATION_SUCCESS,
  UPDATE_PROPERTY_STEP_FAILURE,
  UPDATE_PROPERTY_STEP_REQUEST,
  UPDATE_PROPERTY_STEP_SUCCESS,
} from "../constants/PropertyConstant";

const initialState = {
  properties: [],
  loading: false,
  error: null,
  selectedPrivacyId:null
};

export const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROPERTY_REQUEST:
    case FETCH_HOST_PROPERTY_REQUEST:
    case UPDATE_PROPERTY_LOCATION_REQUEST:
    case UPDATE_PROPERTY_STEP_REQUEST:
    case GET_PROPERTY_BYID_REQUEST:
    case GET_SELECTED_PRIVACY_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        properties: action.payload,
      };

    case FETCH_HOST_PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        properties: action.payload,
        error: false,
      };

    case UPDATE_PROPERTY_LOCATION_SUCCESS:
    case UPDATE_PROPERTY_STEP_SUCCESS:
      return {
        ...state,
        loading: false,
        properties: state.properties.map((property) =>
          property._id === action.payload._id ? action.payload : property
        ),
      };

    case GET_PROPERTY_BYID_SUCCESS:
      const updatedProperties = state.properties.filter(
        (p) => p._id !== action.payload._id
      );

      return {
        ...state,
        loading: false,
        properties: [...updatedProperties, action.payload],
      };

    case GET_SELECTED_PRIVACY_BY_ID_SUCCESS:
      return{
        ...state,
        loading: false,
        selectedPrivacyId: action.payload,
      }

    case FETCH_PROPERTY_FAILURE:
    case FETCH_HOST_PROPERTY_FAILURE:
    case UPDATE_PROPERTY_LOCATION_FAILURE:
    case UPDATE_PROPERTY_STEP_FAILURE:
    case GET_PROPERTY_BYID_FAILURE:
    case GET_SELECTED_PRIVACY_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
