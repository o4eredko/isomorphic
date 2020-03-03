const settingsActions = {
  SEND_REQUEST: "SEND_REQUEST",
  REQUEST_SUCCESS: "REQUEST_SUCCESS",
  REQUEST_FAILURE: "REQUEST_FAILURE",

  LOAD_SETTINGS: "LOAD_SETTINGS",
  LOAD_SETTINGS_SUCCESS: "LOAD_SETTINGS_SUCCESS",
  LOAD_SQL_SUCCESS: "LOAD_SQL_SUCCESS",

  DELETE_SETTINGS_ITEM: "DELETE_SETTINGS_ITEM",
  DELETE_SETTINGS_ITEM_SUCCESS: "DELETE_SETTINGS_ITEM_SUCCESS",

  SELECT_SETTINGS_ITEM: "SELECT_SETTINGS_ITEM",

  UPDATE_SELECTED_ITEM: "UPDATE_SELECTED_ITEM",
  UPDATE_SELECTED_ITEM_SUCCESS: "UPDATE_SELECTED_ITEM_SUCCESS",

  UPDATE_SQL: "UPDATE_SQL",
  UPDATE_SQL_SUCCESS: "UPDATE_SQL_SUCCESS",

  sendRequest: () => ({
    type: settingsActions.SEND_REQUEST,
  }),
  requestSuccess: (prompt="") => ({
    type: settingsActions.REQUEST_SUCCESS,
    payload: prompt,
  }),
  requestFailure: (reason, details) => ({
    type: settingsActions.REQUEST_FAILURE,
    payload: { reason, details },
  }),

  loadSettings: () => ({
    type: settingsActions.LOAD_SETTINGS
  }),
  loadSettingsSuccess: payload => ({
    type: settingsActions.LOAD_SETTINGS_SUCCESS,
    payload,
  }),
  loadSqlSuccess: payload => ({
    type: settingsActions.LOAD_SQL_SUCCESS,
    payload,
  }),

  selectSettingsItem: item => ({
    type: settingsActions.SELECT_SETTINGS_ITEM,
    payload: item,
  }),

  deleteSettingsItem: id => ({
    type: settingsActions.DELETE_SETTINGS_ITEM,
    payload: id,
  }),
  deleteSettingsItemSuccess: payload => ({
    type:settingsActions.DELETE_SETTINGS_ITEM_SUCCESS,
    payload,
  }),

  updateSelectedItem: (key, value) => ({
    type: settingsActions.UPDATE_SELECTED_ITEM,
    payload: { key, value },
  }),
  updateSelectedItemSuccess: (settings, selectedSettingsItem) => ({
    type: settingsActions.UPDATE_SELECTED_ITEM_SUCCESS,
    payload: { settings, selectedSettingsItem },
  }),

  updateSql: (sql) => ({
    type: settingsActions.UPDATE_SQL,
    payload: sql,
  }),

  updateSqlSuccess: (sql) => ({
    type: settingsActions.UPDATE_SQL_SUCCESS,
    payload: sql,
  }),
};

export default settingsActions;
