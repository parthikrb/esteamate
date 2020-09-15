import * as types from "./action-types";
import axios from "axios";

export const clearCurrentUser = () => {
  return { type: types.CLEAR_CURRENTUSER };
};

export const loadCurrentUserStart = () => {
  return { type: types.LOAD_CURRENTUSER_START };
};

export const loadCurrentUserSuccess = (data) => {
  return {
    type: types.LOAD_CURRENTUSER_SUCCESS,
    payload: { data },
  };
};

export const loadCurrentUserFailure = (data) => {
  return {
    type: types.LOAD_CURRENTUSER_FAILURE,
    payload: { data },
  };
};

export const loadCurrentUser = (client) => {
  console.log("Inside Load Current User");
  return async (dispatch, getState) => {
    const state = getState();
    const current_user = state.current_user.user || {};
    if (current_user && Object.keys(current_user).length === 0) {
      dispatch(loadCurrentUserStart());
      await client
        .get("/api/users/currentUser")
        .then((response) => {
          dispatch(loadCurrentUserSuccess(response.data.currentUser));
        })
        .catch((error) => dispatch(loadCurrentUserFailure(error)));
    }
  };
};

export const loadCurrentUserSquadsStart = () => {
  return {
    type: types.LOAD_CURRENTUSERSQUADS_START,
  };
};

export const loadCurrentUserSquadsSuccess = (data) => {
  return {
    type: types.LOAD_CURRENTUSERSQUADS_SUCCESS,
    payload: { data },
  };
};

export const loadCurrentUserSquadsFailure = (data) => {
  return {
    type: types.LOAD_CURRENTUSERSQUADS_FAILURE,
    payload: { data },
  };
};

export const loadCurrentUserSquads = (client) => {
  return async (dispatch, getState) => {
    const state = getState();
    if (state.current_user.user) {
      const current_user_id = state.current_user.user.id || 0;
      if (state.current_user.squads.length === 0) {
        dispatch(loadCurrentUserSquadsStart());
        await client
          .get("/api/squads/user/" + current_user_id)
          .then((response) => {
            dispatch(loadCurrentUserSquadsSuccess(response.data));
          })
          .catch((error) => dispatch(loadCurrentUserSquadsFailure(error)));
      }
    }
  };
};

export const loadCurrentUserReleasesStart = () => {
  return {
    type: types.LOAD_CURRENTUSERRELEASES_START,
  };
};

export const loadCurrentUserReleasesSuccess = (data) => {
  return {
    type: types.LOAD_CURRENTUSERRELEASES_SUCCESS,
    payload: { data },
  };
};

export const loadCurrentUserReleasesFailure = (data) => {
  return {
    type: types.LOAD_CURRENTUSERRELEASES_FAILURE,
    payload: { data },
  };
};

export const loadCurrentUserReleases = (client) => {
  return async (dispatch, getState) => {
    const state = getState();
    const currentUserSquads = state.current_user.squads;
    const userSquads = currentUserSquads.reduce((acc, cur) => {
      return (acc += `,${cur.id}`);
    }, "");
    dispatch(loadCurrentUserReleasesStart());
    await client
      .get("/api/releases/squad/" + userSquads.slice(1))
      .then((response) => {
        dispatch(loadCurrentUserReleasesSuccess(response.data));
      })
      .catch((error) => dispatch(loadCurrentUserReleasesFailure(error)));
  };
};

export const loadCurrentUserSprintsStart = () => {
  return {
    type: types.LOAD_CURRENTUSERSPRINTS_START,
  };
};

export const loadCurrentUserSprintsSuccess = (data) => {
  return {
    type: types.LOAD_CURRENTUSERSPRINTS_SUCCESS,
    payload: { data },
  };
};

export const loadCurrentUserSprintsFailure = (data) => {
  return {
    type: types.LOAD_CURRENTUSERSPRINTS_FAILURE,
    payload: { data },
  };
};

export const loadCurrentUserSprints = (client) => {
  return async (dispatch, getState) => {
    dispatch(loadCurrentUserSprintsStart());
    const state = getState();
    const currentUserReleases = state.current_user.releases;
    const userReleases = currentUserReleases.reduce((acc, cur) => {
      return (acc += `,${cur.id}`);
    }, "");
    await client
      .get("/api/sprints/release/" + userReleases.slice(1))
      .then((response) =>
        dispatch(loadCurrentUserSprintsSuccess(response.data))
      )
      .catch((error) => dispatch(loadCurrentUserSprintsFailure(error)));
  };
};
