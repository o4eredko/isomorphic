import actions from "./actions";


const initState = {
  settings: [],
  selectedId: null,
};

export default function googleCrafterReducer(state = initState, action) {
  switch (action.type) {
    case actions.CHANGE_SELECTED_ID:
      return { ...state, selectedId: action.payload };

    case actions.LOAD_SETTINGS_SUCCESS:
    case actions.DELETE_SETTINGS_ITEM_SUCCESS:
      const selectedId = action.payload.length ? action.payload[0].id : initState.selectedId;
      return {
        ...state,
        settings: action.payload,
        selectedId,
      };

    default:
      return state;
  }
}
