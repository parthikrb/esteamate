import * as types from "./action-types";
import axios from "axios";

export const addUserStart = () => {
  return { type: types.ADD_USER_START };
};

export const addUserSuccess = (data) => {
  return {
    type: types.ADD_USER_SUCCESS,
    payload: { data },
  };
};

export const addUserFailure = (data) => {
  return {
    type: types.ADD_USER_FAILURE,
    payload: { data },
  };
};

export const removeUser = (id) => {
  return {
    type: types.REMOVE_USER,
    payload: {
      id,
    },
  };
};

export const updateUser = (id, data) => {
  return {
    type: types.UPDATE_USER,
    payload: {
      id,
      data,
    },
  };
};

export const loadUsersStart = () => {
  return {
    type: types.LOAD_USERS_START,
  };
};

export const loadUsersSuccess = (users) => {
  return {
    type: types.LOAD_USERS_SUCCESS,
    payload: { data: users },
  };
};

export const loadUsersFailure = (error) => {
  return {
    type: types.LOAD_USERS_FAILURE,
    payload: { data: error },
  };
};

export const addUser = (data) => {
  return async (dispatch) => {
    dispatch(addUserStart());
    await axios
      .post("/api/users/signup", data)
      .then((response) => dispatch(addUserSuccess(response.data)))
      .catch((error) => dispatch(addUserFailure(error)));
  };
};

export const loadUsers = (client) => {
  return async (dispatch, getState) => {
    const state = getState();
    if (state.user.users.length === 0) {
      dispatch(loadUsersStart());
      await client
        .get("/api/users")
        .then((response) => dispatch(loadUsersSuccess(response.data)))
        .catch((error) => dispatch(loadUsersFailure(error)));
    }
  };
};
