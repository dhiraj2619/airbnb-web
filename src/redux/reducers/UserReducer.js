import { CHECK_USER_FAIL, CHECK_USER_REQUEST, CHECK_USER_SUCCESS, GOOGLE_LOGIN_FAIL, GOOGLE_LOGIN_REQUEST, GOOGLE_LOGIN_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "../constants/UserConstant"

const intialState ={
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    userExists:null
}

export const UserReducer = (state=intialState, action) => {
    switch(action.type) {
        case CHECK_USER_REQUEST:
        case REGISTER_USER_REQUEST:
        case GOOGLE_LOGIN_REQUEST:
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
                userExists:action.payload.userExists,
                existingUser:action.payload.user
            }
        case REGISTER_USER_SUCCESS:
        case GOOGLE_LOGIN_SUCCESS:
            return{
                ...state,
                 loading:false,
                 isAuthenticated:true,
                 user:action.payload
                 
            }     
        case CHECK_USER_FAIL:
            return{
                ...state,
                loading:false,
                userExists: null,
                error: action.payload
            }

        case REGISTER_USER_FAIL:
        case GOOGLE_LOGIN_FAIL:
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                error:action.payload
            }
        
        default:
            return state;
    }
}