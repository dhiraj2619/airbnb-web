import {
  FETCH_PROPERTY_OPTIONS_FAILURE,
  FETCH_PROPERTY_OPTIONS_REQUEST,
  FETCH_PROPERTY_OPTIONS_SUCCESS,
  FETCH_PROPERTYTYPE_FAILURE,
  FETCH_PROPERTYTYPE_REQUEST,
  FETCH_PROPERTYTYPE_SUCCESS,
} from "../constants/PropertyConstant";

const initalState = {
  loading: false,
  propertyTypes: [],
  privacyOptions:[],
  error: null,
};

export const PropertyTypeReducer = (state = initalState, action) => {
  switch (action.type) {
    case FETCH_PROPERTYTYPE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PROPERTYTYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        propertyTypes: action.payload,
      };

    case FETCH_PROPERTYTYPE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};


export const PrivacyOptionsReducer=(state=initalState,action)=>{
   switch(action.type){
       case FETCH_PROPERTY_OPTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PROPERTY_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        privacyOptions: action.payload,
      };
    case FETCH_PROPERTY_OPTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
   }
}