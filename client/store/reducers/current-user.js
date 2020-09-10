import * as types from "../actions/action-types";

const initialState = {
  user: {},
  squads: [],
  releases: [],
  sprints: [],
  loading: false,
  error: null,
};

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CLEAR_CURRENTUSER:
      return { ...state, user: null, loading: false, error: null };
    case types.LOAD_CURRENTUSER_START:
    case types.LOAD_CURRENTUSERSQUADS_START:
    case types.LOAD_CURRENTUSERRELEASES_START:
    case types.LOAD_CURRENTUSERSPRINTS_START:
      return { ...state, loading: true, error: null };

    case types.LOAD_CURRENTUSER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.data,
        error: null,
      };
    case types.LOAD_CURRENTUSERSQUADS_SUCCESS:
      return {
        ...state,
        loading: false,
        squads: action.payload.data,
        error: null,
      };
    case types.LOAD_CURRENTUSERRELEASES_SUCCESS:
      return {
        ...state,
        loading: false,
        releases: action.payload.data,
        error: null,
      };
    case types.LOAD_CURRENTUSERSPRINTS_SUCCESS:
      return {
        ...state,
        loading: false,
        sprints: action.payload.data,
        error: null,
      };
    case types.LOAD_CURRENTUSER_FAILURE:
    case types.LOAD_CURRENTUSERSQUADS_FAILURE:
    case types.LOAD_CURRENTUSERRELEASES_FAILURE:
    case types.LOAD_CURRENTUSERSPRINTS_FAILURE:
      return { ...state, loading: false, error: action.payload.data };
    default:
      return state;
  }
};

export default currentUserReducer;
