const notesAction = {
  LOAD_SETTINGS: "LOAD_SETTINGS",
  LOAD_SETTINGS_SUCCESS: "LOAD_SETTINGS_SUCCESS",

  DELETE_SETTINGS_ITEM: "DELETE_SETTINGS_ITEM",
  DELETE_SETTINGS_ITEM_SUCCESS: "DELETE_SETTINGS_ITEM_SUCCESS",

  CHANGE_SELECTED_ID: "CHANGE_SELECTED_ID",

  loadSettings: () => ({ type: notesAction.LOAD_SETTINGS }),

  selectSettingsItem: id => ({ type: notesAction.CHANGE_SELECTED_ID, payload: id }),
  deleteSettingsItem: id => ({ type: notesAction.DELETE_SETTINGS_ITEM, payload: id }),
};
export default notesAction;
