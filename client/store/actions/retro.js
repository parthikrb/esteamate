import * as types from "./action-types";
import axios from "axios";

export const addRetroStart = () => {
  return { type: types.ADD_RETRO_START };
};

export const addRetroSuccess = (data) => {
  return {
    type: types.ADD_RETRO_SUCCESS,
    payload: { data },
  };
};

export const addRetroFailure = (data) => {
  return {
    type: types.ADD_RETRO_FAILURE,
    payload: { data },
  };
};

export const addRetro = (data) => {
  return (dispatch) => {
    dispatch(addRetroStart());
    axios
      .post("/api/retros", data)
      .then((response) => dispatch(addRetroSuccess(response.data)))
      .catch((error) => dispatch(addRetroFailure(error)));
  };
};

export const updateRetroStart = () => {
  return { type: types.UPDATE_RETRO_START };
};

export const updateRetroSuccess = (id, data) => {
  return {
    type: types.UPDATE_RETRO_SUCCESS,
    payload: { id, data },
  };
};

export const updateRetroFailure = (data) => {
  return {
    type: types.UPDATE_RETRO_FAILURE,
    payload: { data },
  };
};

export const updateRetro = (id, data) => {
  return (dispatch) => {
    dispatch(updateRetroStart());
    axios
      .put("/api/retros/" + id, data)
      .then((response) => dispatch(updateRetroSuccess(id, response.data)))
      .catch((error) => dispatch(updateRetroFailure(error)));
  };
};

export const loadRetrosStart = () => {
  return {
    type: types.LOAD_RETROS_START,
  };
};

export const loadRetrosSuccess = (data) => {
  return {
    type: types.LOAD_RETROS_SUCCESS,
    payload: { data },
  };
};

export const loadRetrosFailure = (data) => {
  return {
    type: types.LOAD_RETROS_FAILURE,
    payload: { data },
  };
};

export const loadRetros = (client) => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.retro.retros.length === 0) {
      dispatch(loadRetrosStart());
      client
        .get("/api/retros")
        .then((response) => dispatch(loadRetrosSuccess(response.data)))
        .catch((error) => dispatch(loadRetrosFailed(error)));
    }
  };
};
