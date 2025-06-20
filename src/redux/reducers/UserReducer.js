import { CHECK_USER_FAIL, CHECK_USER_REQUEST, CHECK_USER_SUCCESS } from "../constants/UserConstant"

const intialState ={
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
    userExists:null
}

export const UserReducer = (state=intialState, action) => {
    switch(action.type) {
        case CHECK_USER_REQUEST:
            return{
                ...state,
                loading:true,
                userExists: null,
                error: null
            }

        case CHECK_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                userExists:action.payload,
            }
        case CHECK_USER_FAIL:
            return{
                ...state,
                loading:false,
                userExists: null,
                error: action.payload
            }

        default:
            return state;
    }
}