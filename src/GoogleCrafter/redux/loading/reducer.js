import actions from "./actions";

const initialState = {
  isLoading: false,
};


export default function loading(state=initialState, action) {
  switch (action.type) {
    case actions.SEND_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case actions.REQUEST_FAILURE:
    case actions.REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
}