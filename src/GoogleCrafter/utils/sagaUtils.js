import { put } from "redux-saga/effects";

import loadingActions from "src/GoogleCrafter/redux/loading/actions";

const getSettingsList = (state) => state.googleCrafter.settings.settingsList;
const getSelectedSettingsItem = (state) => state.googleCrafter.settings.selectedSettingsItem;
const getSqlMap = (state) => state.googleCrafter.settings.sqlMap;

const getGenerationList = state => state.googleCrafter.generations.generationList;


const workerDecorator = (errorMsg, successMsg) => (workerGenerator) => function* (action) {
  yield put(loadingActions.sendRequest());
  try {
    yield* workerGenerator(action);
    yield put(loadingActions.requestSuccess(successMsg));
  } catch (e) {
    yield put(loadingActions.requestFailure(errorMsg, e));
  }
};


export { workerDecorator, getSettingsList, getSelectedSettingsItem, getSqlMap, getGenerationList };
