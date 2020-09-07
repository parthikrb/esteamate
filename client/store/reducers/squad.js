import * as types from "../actions/action-types";

const initialState = {
  squads: [],
  loading: false,
  error: null,
};

const squadReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_SQUAD_START:
      return { ...state, loading: true };
    case types.ADD_SQUAD_SUCCESS:
      return {
        ...state,
        loading: false,
        squads: state.squads.concat(action.payload.data),
        error: null,
      };
    case types.ADD_SQUAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.data,
      };
    case types.LOAD_SQUADS_START:
      return { ...state, loading: true };
    case types.LOAD_SQUADS_SUCCESS:
      return { ...state, loading: false, squads: action.payload.data };
    case types.LOAD_SQUADS_FAILURE:
      return { ...state, loading: false, err: action.payload.data };
    default:
      return state;
  }
};

export default squadReducer;
