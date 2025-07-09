import { FETCH_HOST_PROPERTY_FAILURE, FETCH_HOST_PROPERTY_REQUEST, FETCH_HOST_PROPERTY_SUCCESS, FETCH_PROPERTY_FAILURE, FETCH_PROPERTY_REQUEST, FETCH_PROPERTY_SUCCESS } from "../constants/PropertyConstant";


const initialState = {
  properties: [],
  loading: false,
  error: null,
};

export const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROPERTY_REQUEST:
    case FETCH_HOST_PROPERTY_REQUEST:
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
      return{
          ...state,
          loading:false,
          properties:action.payload,
          error:false
      };

    case FETCH_PROPERTY_FAILURE:
    case FETCH_HOST_PROPERTY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    
    default:
      return state;
  }
};

