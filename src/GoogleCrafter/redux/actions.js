const notesAction = {
  LOAD_SETTINGS: "LOAD_SETTINGS",
  LOAD_SETTINGS_SUCCESS: "LOAD_SETTINGS_SUCCESS",
  LOAD_SQL_SUCCESS: "LOAD_SQL_SUCCESS",

  DELETE_SETTINGS_ITEM: "DELETE_SETTINGS_ITEM",
  DELETE_SETTINGS_ITEM_SUCCESS: "DELETE_SETTINGS_ITEM_SUCCESS",

  SELECT_SETTINGS_ITEM: "SELECT_SETTINGS_ITEM",

  UPDATE_SELECTED_ITEM: "UPDATE_SELECTED_ITEM",
  UPDATE_SELECTED_ITEM_SUCCESS: "UPDATE_SELECTED_ITEM_SUCCESS",
  UPDATE_SELECTED_ITEM_FAILURE: "UPDATE_SELECTED_ITEM_FAILURE",

  loadSettings: () => ({ type: notesAction.LOAD_SETTINGS }),

  selectSettingsItem: item => ({ type: notesAction.SELECT_SETTINGS_ITEM, payload: item }),
  deleteSettingsItem: id => ({ type: notesAction.DELETE_SETTINGS_ITEM, payload: id }),

  updateSelectedItem: (key, value) => ({ type: notesAction.UPDATE_SELECTED_ITEM, payload: {key, value} }),
  updateSelectedItemSuccess: (payload) => ({ type: notesAction.UPDATE_SELECTED_ITEM_SUCCESS, payload }),
  updateSelectedItemFailure: (details) => ({ type: notesAction.UPDATE_SELECTED_ITEM_FAILURE, details }),
};

export default notesAction;
