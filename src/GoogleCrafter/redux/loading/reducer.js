import actions from "./actions";

const initialState = {
  isLoading: 0,
};


export default function loading(state=initialState, action) {
  switch (action.type) {
    case actions.SEND_REQUEST:
      return {
        ...state,
        isLoading: state.isLoading + 1
      };

    case actions.REQUEST_FAILURE:
    case actions.REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: state.isLoading - 1
      };

    default:
      return state;
  }
}