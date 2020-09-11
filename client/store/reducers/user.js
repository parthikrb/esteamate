import * as types from "../actions/action-types";
// import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_USER_START:
      return { ...state, loading: true };
    case types.ADD_USER_FAILURE:
      return { ...state, loading: false, error: action.payload.data };
    case types.ADD_USER_SUCCESS:
      return {
        ...state,
        users: state.users.concat(action.payload.data),
        loading: false,
        error: null,
      };
    case types.REMOVE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload.id),
      };
    case types.UPDATE_USER:
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      let updatedUser = { ...state.users };
      updatedUser[userIndex] = action.payload.data;
      return { ...state, users: updatedUser, loading: false};
    case types.LOAD_USERS_START:
      return { ...state, loading: true };
    case types.LOAD_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload.data };
    case types.LOAD_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload.data };
    default:
      return state;
  }
};

export default userReducer;
