import * as types from "./action-types";
import axios from "axios";

export const addSprintStart = () => {
  return { type: types.ADD_SPRINT_START };
};

export const addSprintSuccess = (data) => {
  return {
    type: types.ADD_SPRINT_SUCCESS,
    payload: { data },
  };
};

export const addSprintFailure = (data) => {
  return {
    type: types.ADD_SPRINT_FAILURE,
    payload: { data },
  };
};

export const addSprint = (data) => {
  return async (dispatch) => {
    dispatch(addSprintStart());
    await axios
      .post("/api/sprints", data)
      .then((response) => dispatch(addSprintSuccess(response.data)))
      .catch((error) => dispatch(addSprintFailure(error)));
  };
};

export const loadSprintsStart = () => {
  return {
    type: types.LOAD_SPRINTS_START,
  };
};

export const loadSprintsSuccess = (data) => {
  return {
    type: types.LOAD_SPRINTS_SUCCESS,
    payload: { data },
  };
};

export const loadSprintsFailure = (data) => {
  return {
    type: types.LOAD_SPRINTS_FAILURE,
    payload: { data },
  };
};

export const loadSprints = (client) => {
  return async (dispatch, getState) => {
    const state = getState();
    if (state.sprint.sprints.length === 0) {
      dispatch(loadSprintsStart());
      await client
        .get("/api/sprints")
        .then((response) => dispatch(loadSprintsSuccess(response.data)))
        .catch((error) => dispatch(loadSprintsFailed(error)));
    }
  };
};
