import * as types from "./action-types";
import axios from "axios";

export const loadUserLeavesStart = () => {
  return { type: types.LOAD_USER_LEAVES_START };
};

export const loadUserLeavesSuccess = (data) => {
  return { type: types.LOAD_USER_LEAVES_SUCCESS, payload: { data } };
};

export const loadUserLeavesFailure = (data) => {
  return { type: types.LOAD_USER_LEAVES_FAILURE, payload: { data } };
};

export const loadUserLeaves = (client, users) => {
  return (dispatch) => {
    dispatch(loadUserLeavesStart());
    client
      .get("/api/leaves/user/" + users)
      .then((response) => dispatch(loadUserLeavesSuccess(response.data)))
      .catch((error) => dispatch(loadUserLeavesFailure(error)));
  };
};

export const addLeaveStart = () => {
  return { type: types.ADD_LEAVE_START };
};

export const addLeaveSuccess = (data) => {
  return { type: types.ADD_LEAVE_SUCCESS, payload: { data } };
};

export const addLeaveFailure = (data) => {
  return { type: types.ADD_LEAVE_FAILURE, payload: { data } };
};

export const addLeave = (data) => {
  return (dispatch) => {
    dispatch(addLeaveStart());
    axios
      .post("/api/leaves", data)
      .then((response) => dispatch(addLeaveSuccess(response.data)))
      .catch((error) => dispatch(addLeaveFailure(error)));
  };
};

export const deleteLeaveStart = () => {
  return { type: types.DELETE_LEAVE_START };
};

export const deleteLeaveSuccess = (id) => {
  return { type: types.DELETE_LEAVE_SUCCESS, payload: { id } };
};

export const deleteLeaveFailure = (data) => {
  return { type: types.DELETE_LEAVE_FAILURE, payload: { data } };
};

export const deleteLeave = (id) => {
  return (dispatch) => {
    dispatch(deleteLeaveStart());
    axios
      .delete("/api/leaves/" + id)
      .then((response) => dispatch(deleteLeaveSuccess(id)))
      .catch((error) => dispatch(deleteLeaveFailure(error)));
  };
};
