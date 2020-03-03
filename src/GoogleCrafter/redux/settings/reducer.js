import settingsActions from "src/GoogleCrafter/redux/settings/actions";


const initState = {
  isLoading: false,
  settingsList: [],
  sqlMap: {},
  selectedSettingsItem: null,
};

export default function settingsReducer(state = initState, action) {
  switch (action.type) {
    case settingsActions.SEND_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case settingsActions.REQUEST_FAILURE:
    case settingsActions.REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false
      };

    case settingsActions.ADD_SETTINGS_ITEM:
      return {
        ...state,
        settingsList: [action.settingsItem, ...state.settingsList],
        selectedSettingsItem: action.settingsItem,
        sqlMap: { ...state.sqlMap, [action.sqlId]: action.sqlValue }
      };

    case settingsActions.SELECT_SETTINGS_ITEM:
      return {
        ...state,
        selectedSettingsItem: action.payload
      };

    case settingsActions.LOAD_SETTINGS_SUCCESS:
    case settingsActions.DELETE_SETTINGS_ITEM_SUCCESS:
      const selectedSettingsItem = action.payload.length
        ? action.payload[0]
        : initState.selectedSettingsItem;
      return {
        ...state,
        settingsList: action.payload,
        selectedSettingsItem: (
          action.payload.length ?
            action.payload[0] :
            initState.selectedSettingsItem
        ),
      };

    case settingsActions.LOAD_SQL_SUCCESS:
      return {
        ...state,
        sqlMap: action.payload
      };

    case settingsActions.UPDATE_SELECTED_ITEM_SUCCESS:
      return {
        ...state,
        settingsList: action.payload.settings,
        selectedSettingsItem: action.payload.selectedSettingsItem
      };

    case settingsActions.UPDATE_SQL_SUCCESS:
      return {
        ...state,
        sqlMap: action.payload
      };

    default:
      return state;
  }
}
