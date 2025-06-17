import { FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS } from "../constants/PropertyConstant"

const initialState = {
  categories: [],
  loading: false,
  error: null,
  
}


export const CategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_REQUEST:
            return{
                ...state,
                loading: true,
                categories: [],
                error:null
            }
    
        case FETCH_CATEGORIES_SUCCESS:
            return{
                ...state,
                loading:false,
                categories:action.payload,
                error:null
            }
    
        case FETCH_CATEGORIES_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}