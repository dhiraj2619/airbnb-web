import {
  FETCH_PROPERTY_OPTIONS_FAILURE,
  FETCH_PROPERTY_OPTIONS_REQUEST,
  FETCH_PROPERTY_OPTIONS_SUCCESS,
  FETCH_PROPERTYTYPE_FAILURE,
  FETCH_PROPERTYTYPE_REQUEST,
  FETCH_PROPERTYTYPE_SUCCESS,
  GET_SELECTED_PRIVACY_BY_ID_FAILURE,
  GET_SELECTED_PRIVACY_BY_ID_REQUEST,
  GET_SELECTED_PRIVACY_BY_ID_SUCCESS,
} from "../constants/PropertyConstant";

const initalState = {
  loading: false,
  propertyTypes: [],
  privacyOptions:[],
  error: null,
  selectedPrivacyId:null
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
       case GET_SELECTED_PRIVACY_BY_ID_REQUEST:
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

     case GET_SELECTED_PRIVACY_BY_ID_SUCCESS:
          return{
            ...state,
            loading: false,
            selectedPrivacyId: action.payload,
          }
    case FETCH_PROPERTY_OPTIONS_FAILURE:
    case GET_SELECTED_PRIVACY_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
   }
}