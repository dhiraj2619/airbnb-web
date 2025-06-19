import { FETCH_PROPERTY_FAILURE, FETCH_PROPERTY_REQUEST, FETCH_PROPERTY_SUCCESS } from "../constants/PropertyConstant";


const initialState = {
  properties: [],
  loading: false,
  error: null,
};

export const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROPERTY_REQUEST:
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
    case FETCH_PROPERTY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

