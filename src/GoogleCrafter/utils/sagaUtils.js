import { put } from "redux-saga/effects";

import settingsActions from "src/GoogleCrafter/redux/settings/actions";

const getSettingsList = (state) => state.googleCrafter.settings.settingsList;
const getSelectedSettingsItem = (state) => state.googleCrafter.settings.selectedSettingsItem;
const getSqlMap = (state) => state.googleCrafter.settings.sqlMap;


const workerDecorator = (errorMsg, successMsg) => (workerGenerator) => function* (action) {
  yield put(settingsActions.sendRequest());
  try {
    yield* workerGenerator(action);
    yield put(settingsActions.requestSuccess(successMsg));
  } catch (e) {
    yield put(settingsActions.requestFailure(errorMsg, e));
  }
};


export { workerDecorator, getSettingsList, getSelectedSettingsItem, getSqlMap };
