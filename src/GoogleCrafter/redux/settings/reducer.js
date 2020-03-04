import actions from "./actions";


const initState = {
  settingsList: [],
  sqlMap: {},
  selectedSettingsItem: null,
};

export default function settingsReducer(state = initState, action) {
  switch (action.type) {
    case actions.ADD_SETTINGS_ITEM:
      return {
        ...state,
        settingsList: [action.settingsItem, ...state.settingsList],
        selectedSettingsItem: action.settingsItem,
        sqlMap: { ...state.sqlMap, [action.sqlId]: action.sqlValue }
      };

    case actions.SELECT_SETTINGS_ITEM:
      return {
        ...state,
        selectedSettingsItem: action.payload
      };

    case actions.LOAD_SETTINGS_SUCCESS:
    case actions.DELETE_SETTINGS_ITEM_SUCCESS:
      return {
        ...state,
        settingsList: action.payload,
        selectedSettingsItem: (
          action.payload.length ?
            action.payload[0] :
            initState.selectedSettingsItem
        ),
      };

    case actions.LOAD_SQL_SUCCESS:
      return {
        ...state,
        sqlMap: action.payload
      };

    case actions.UPDATE_SELECTED_ITEM_SUCCESS:
      return {
        ...state,
        settingsList: action.payload.settings,
        selectedSettingsItem: action.payload.selectedSettingsItem
      };

    case actions.UPDATE_SQL_SUCCESS:
      return {
        ...state,
        sqlMap: action.payload
      };

    default:
      return state;
  }
}
