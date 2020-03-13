import { all, takeEvery, takeLatest, fork, call, put, select } from "redux-saga/effects";
// import { preparedData, preparedSql } from "./data";
import {
  workerDecorator, getSettingsList,
  getSqlMap, getSelectedSettingsItem
} from "src/GoogleCrafter/utils/sagaUtils";

import settingsActions from "src/GoogleCrafter/redux/settings/actions";

import SuperFetch from "src/lib/helpers/superFetch";

import config from "src/GoogleCrafter/config/googleCrafter.config";


export function* loadSettings() {
  // function* mockedWorker() {
  //   const sqlData = {};
  //   for (const { id, value } of preparedSql)
  //     sqlData[id] = value;
  //   yield put({ type: settingsActions.LOAD_SETTINGS_SUCCESS, payload: preparedData });
  //   yield put({ type: settingsActions.LOAD_SQL_SUCCESS, payload: sqlData });
  // }

  function* worker() {
    const [settings, sql] = yield all([
      call(SuperFetch.get, config.settingsUrl),
      call(SuperFetch.get, config.tipsUrl)
    ]);

    const sqlData = {};
    for (const { id, value } of sql.data)
      sqlData[id] = value;

    yield put(settingsActions.loadSettingsSuccess(settings.data));
    yield put(settingsActions.loadSqlSuccess(sqlData));
  }

  yield takeLatest(
    settingsActions.LOAD_SETTINGS,
    workerDecorator("Load settings failed.")(worker)
  );
}


export function* deleteSettingsItem() {

  function* worker({ payload }) {
    const requestUrl = `${config.settingsUrl}${payload}`;
    yield call(SuperFetch.delete, requestUrl, false);

    let settings = yield select(getSettingsList);
    settings = settings.filter(settingsItem => settingsItem.id !== payload);
    yield put(settingsActions.deleteSettingsItemSuccess(settings));
  }

  yield takeEvery(
    settingsActions.DELETE_SETTINGS_ITEM,
    workerDecorator("Delete settings failed.", "Item deleted successfully.")(worker)
  )
}


function* updateSettingsItem() {
  function* worker({ payload }) {
    const selectedSettingsItem = yield select(getSelectedSettingsItem);
    const settings = yield select(getSettingsList);
    const selectedIndex = settings.indexOf(selectedSettingsItem);

    const requestUrl = `${config.settingsUrl}${selectedSettingsItem.id}`;
    const requestBody = {[payload.key]: payload.value};
    yield call(SuperFetch.put, requestUrl, false, requestBody);

    const settingsItemCopy = {
      ...selectedSettingsItem,
      [payload.key]: payload.value
    };
    const settingsCopy = [...settings];

    settingsCopy[selectedIndex] = settingsItemCopy;

    yield put(settingsActions.updateSelectedItemSuccess(settingsCopy, settingsItemCopy));
  }

  yield takeEvery(
    settingsActions.UPDATE_SELECTED_ITEM,
    workerDecorator("Update settings item failed.", "Item updated successfully.")(worker)
  );
}


function* updateSql() {
  function* worker({ payload }) {
    const SqlMap = yield select(getSqlMap);
    const selectedSettingsItem = yield select(getSelectedSettingsItem);
    const sqlId = selectedSettingsItem["sql_id"];

    const requestUrl = `${config.tipsUrl}${sqlId}`;
    const requestBody = {"value": payload};
    yield call(SuperFetch.put, requestUrl, false, requestBody);

    const sqlMapCopy = {...SqlMap, [sqlId]: payload};

    yield put(settingsActions.updateSqlSuccess(sqlMapCopy));
  }

  yield takeEvery(
    settingsActions.UPDATE_SQL,
    workerDecorator("Update SQL failed.", "SQL updated successfully.")(worker)
  );
}


export default function* rootSaga() {
  yield all([
    fork(loadSettings),
    fork(updateSettingsItem),
    fork(deleteSettingsItem),
    fork(updateSql),
  ]);
}
