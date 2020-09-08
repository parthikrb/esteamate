import * as types from "../actions/action-types";

const initialState = {
  sprints: [],
  loading: false,
  error: null,
};

const sprintReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_SPRINT_START:
      return { ...state, loading: true };
    case types.ADD_SPRINT_SUCCESS:
      return {
        ...state,
        loading: false,
        sprints: state.sprints.concat(action.payload.data),
        error: null,
      };
    case types.ADD_SPRINT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.data,
      };
    case types.LOAD_SPRINTS_START:
      return { ...state, loading: true };
    case types.LOAD_SPRINTS_SUCCESS:
      return { ...state, loading: false, sprints: action.payload.data };
    case types.LOAD_SPRINTS_FAILURE:
      return { ...state, loading: false, err: action.payload.data };
    default:
      return state;
  }
};

export default sprintReducer;
