import * as types from "../actions/action-types";

const initialState = {
  retros: [],
  loading: false,
  error: null,
};

const retroReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_RETRO_START:
      return { ...state, loading: true };
    case types.ADD_RETRO_SUCCESS:
      return {
        ...state,
        loading: false,
        retros: state.retros.concat(action.payload.data),
        error: null,
      };
    case types.ADD_RETRO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.data,
      };
    case types.LOAD_RETROS_START:
      return { ...state, loading: true };
    case types.LOAD_RETROS_SUCCESS:
      return { ...state, loading: false, retros: action.payload.data };
    case types.LOAD_RETROS_FAILURE:
      return { ...state, loading: false, err: action.payload.data };
    default:
      return state;
  }
};

export default retroReducer;
