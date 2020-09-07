import * as types from "./action-types";
import axios from "axios";

export const addSquadStart = () => {
  return { type: types.ADD_SQUAD_START };
};

export const addSquadSuccess = (data) => {
  return {
    type: types.ADD_SQUAD_SUCCESS,
    payload: { data },
  };
};

export const addSquadFailure = (data) => {
  return {
    type: types.ADD_SQUAD_FAILURE,
    payload: { data },
  };
};

export const addSquad = (data) => {
  return (dispatch) => {
    dispatch(addSquadStart());
    axios
      .post("/api/squads", data)
      .then((response) => dispatch(addSquadSuccess(response.data)))
      .catch((error) => dispatch(addSquadFailure(error)));
  };
};

export const loadSquadsStart = () => {
  return {
    type: types.LOAD_SQUADS_START,
  };
};

export const loadSquadsSuccess = (data) => {
  return {
    type: types.LOAD_SQUADS_SUCCESS,
    payload: { data },
  };
};

export const loadSquadsFailure = (data) => {
  return {
    type: types.LOAD_SQUADS_FAILURE,
    payload: { data },
  };
};

export const loadSquads = (client) => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.squad.squads.length === 0) {
      dispatch(loadSquadsStart());
      client
        .get("/api/squads")
        .then((response) => dispatch(loadSquadsSuccess(response.data)))
        .catch((error) => dispatch(loadSquadsFailed(error)));
    }
  };
};
