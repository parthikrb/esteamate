import * as types from "../actions/action-types";

const initialState = {
  releases: [],
  loading: false,
  error: null,
};

const releaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_RELEASE_START:
      return { ...state, loading: true };
    case types.ADD_RELEASE_SUCCESS:
      return {
        ...state,
        loading: false,
        releases: state.releases.concat(action.payload.data),
        error: null,
      };
    case types.ADD_RELEASE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.data,
      };
    case types.LOAD_RELEASES_START:
      return { ...state, loading: true };
    case types.LOAD_RELEASES_SUCCESS:
      return { ...state, loading: false, releases: action.payload.data };
    case types.LOAD_RELEASES_FAILURE:
      return { ...state, loading: false, err: action.payload.data };
    default:
      return state;
  }
};

export default releaseReducer;
