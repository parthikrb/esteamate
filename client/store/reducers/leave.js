import * as types from "../actions/action-types";

const initialState = {
  squadLeaves: [],
  loading: false,
  error: null,
};

const leaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_USER_LEAVES_START:
    case types.ADD_LEAVE_START:
    case types.DELETE_LEAVE_START:
      return { ...state, loading: true, error: null };

    case types.LOAD_USER_LEAVES_FAILURE:
    case types.ADD_LEAVE_FAILURE:
    case types.DELETE_LEAVE_FAILURE:
      return { ...state, loading: false, error: action.payload.data };

    case types.LOAD_USER_LEAVES_SUCCESS:
      return { ...state, squadLeaves: action.payload.data, loading: false };
    case types.ADD_LEAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        squadLeaves: state.squadLeaves.concat(action.payload.data),
      };
    case types.DELETE_LEAVE_SUCCESS:
      const deletedLeave = state.squadLeaves.filter(
        (leave) => leave.id !== action.payload.id
      );
      return { ...state, loading: false, squadLeaves: deletedLeave };
    default:
      return state;
  }
};

export default leaveReducer;
