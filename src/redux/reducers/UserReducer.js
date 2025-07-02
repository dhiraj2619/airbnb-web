import {
  CHECK_USER_FAIL,
  CHECK_USER_REQUEST,
  CHECK_USER_SUCCESS,
  GOOGLE_LOGIN_FAIL,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from "../constants/UserConstant";

const intialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  googleLoading: false,
  error: null,
  userExists: null,
};

export const UserReducer = (state = intialState, action) => {
  switch (action.type) {
    case CHECK_USER_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        userExists: null,
        error: null,
      };

    case GOOGLE_LOGIN_REQUEST:
      return {
        ...state,
        googleLoading: true,
        userExists: null,
        error: null,
        isAuthenticated:false
      };

    case CHECK_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userExists: action.payload.userExists,
        existingUser: action.payload.user,
      };
    case REGISTER_USER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        googleLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case CHECK_USER_FAIL:
      return {
        ...state,
        loading: false,
        userExists: null,
        error: action.payload,
      };

    case REGISTER_USER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    case GOOGLE_LOGIN_FAIL:
      return {
        ...state,
        googleLoading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        userExists: null,
      };
    default:
      return state;
  }
};
