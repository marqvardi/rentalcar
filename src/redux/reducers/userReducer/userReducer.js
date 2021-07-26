import { userActionTypes } from "./userActionTypes";

const INITIAL_STATE = {
  currentUser: null,
  isSignedIn: false,
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case userActionTypes.CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
        isSignedIn: true,
      };
    case userActionTypes.SIGN_OUT_USER:
      return {
        ...state,
        currentUser: payload,
        isSignedIn: false,
      };
    case userActionTypes.UPDATE_USER:
      return {
        ...state,
        currentUser: payload,
        isSignedIn: true,
      };

    default:
      return state;
  }
};

export default userReducer;
