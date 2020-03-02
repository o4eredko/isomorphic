import actions from "./actions";


const initState = {
  settings: [],
  sql: [],
  selectedSettingsItem: null,
};

export default function googleCrafterReducer(state = initState, action) {
  switch (action.type) {
    case actions.SELECT_SETTINGS_ITEM:
      return { ...state, selectedSettingsItem: action.payload };

    case actions.LOAD_SETTINGS_SUCCESS:
    case actions.DELETE_SETTINGS_ITEM_SUCCESS:
      const selectedSettingsItem = action.payload.length
        ? action.payload[0]
        : initState.selectedSettingsItem;
      return {
        ...state,
        settings: action.payload,
        selectedSettingsItem,
      };

    case actions.LOAD_SQL_SUCCESS:
      return { ...state, sql: action.payload };

    case actions.UPDATE_SELECTED_ITEM_SUCCESS:
      return { ...state, settings: action.payload.settings, selectedSettingsItem: action.payload.selectedSettingsItem};

    default:
      return state;
  }
}
