import actions from "./actions";


const initState = {
  generationList: [],
};

export default function settingsReducer(state = initState, action) {
  switch (action.type) {

    case actions.LOAD_GENERATIONS_SUCCESS:
      return { ...state, generationList: action.payload };

    default:
      return state;
  }
}
