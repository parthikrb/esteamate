import * as types from "./action-types";
import axios from "axios";

export const addReleaseStart = () => {
  return { type: types.ADD_RELEASE_START };
};

export const addReleaseSuccess = (data) => {
  return {
    type: types.ADD_RELEASE_SUCCESS,
    payload: { data },
  };
};

export const addReleaseFailure = (data) => {
  return {
    type: types.ADD_RELEASE_FAILURE,
    payload: { data },
  };
};

export const addRelease = (data) => {
  return (dispatch) => {
    dispatch(addReleaseStart());
    axios
      .post("/api/releases", data)
      .then((response) => dispatch(addReleaseSuccess(response.data)))
      .catch((error) => dispatch(addReleaseFailure(error)));
  };
};

export const loadReleasesStart = () => {
  return {
    type: types.LOAD_RELEASES_START,
  };
};

export const loadReleasesSuccess = (data) => {
  return {
    type: types.LOAD_RELEASES_SUCCESS,
    payload: { data },
  };
};

export const loadReleasesFailure = (data) => {
  return {
    type: types.LOAD_RELEASES_FAILURE,
    payload: { data },
  };
};

export const loadReleases = (client) => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.release.releases.length === 0) {
      dispatch(loadReleasesStart());
      client
        .get("/api/releases")
        .then((response) => dispatch(loadReleasesSuccess(response.data)))
        .catch((error) => dispatch(loadReleasesFailed(error)));
    }
  };
};
