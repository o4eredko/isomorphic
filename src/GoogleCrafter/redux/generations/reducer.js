import actions from "./actions";


const initState = {
  isLoading: false,
  generationList: [],
};

export default function settingsReducer(state = initState, action) {
  switch (action.type) {

    case actions.LOAD_GENERATIONS_SUCCESS:
      return { ...state, generationList: action.payload };

    case actions.SET_LOADING:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
}
