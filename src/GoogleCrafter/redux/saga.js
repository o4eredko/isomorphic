import { all, takeEvery, takeLatest, fork, call, put, select } from "redux-saga/effects";
import { preparedData, preparedSql } from "./data";

import actions from "./actions";

import { message } from "antd";
import SuperFetch from "src/lib/helpers/superFetch";

import config from "src/GoogleCrafter/config/googleCrafter.config";


const getSettings = (state) => state.googleCrafter.settings;
const getSelectedSettingsItem = (state) => state.googleCrafter.selectedSettingsItem;
const getSqlMap = (state) => state.googleCrafter.sql;


function* requestFailure() {
  function worker({ payload }) {
    message.error(payload.reason);
    console.error(payload.reason, payload.details);
  }

  yield takeEvery(actions.REQUEST_FAILURE, worker);
}


function* requestSuccess() {
  function worker({ payload }) {
    if (payload) {
      console.log(payload);
      message.success(payload);
    }
  }

  yield takeEvery(actions.REQUEST_SUCCESS, worker);
}


export function* loadSettings() {
  function* mockedWorker() {
    const sqlData = {};
    for (const { id, value } of preparedSql)
      sqlData[id] = value;
    yield put({ type: actions.LOAD_SETTINGS_SUCCESS, payload: preparedData });
    yield put({ type: actions.LOAD_SQL_SUCCESS, payload: sqlData });
  }

  function* worker() {
    try {
      yield put(actions.sendRequest());
      const [settings, sql] = yield all([
        call(SuperFetch.get, config.settingsUrl),
        call(SuperFetch.get, config.tipsUrl)
      ]);
      yield put(actions.requestSuccess());

      const sqlData = {};
      for (const { id, value } of sql.data)
        sqlData[id] = value;

      yield put(actions.loadSettingsSuccess(settings.data));
      yield put(actions.loadSqlSuccess(sqlData));
    } catch (e) {
      const errorMsg = "Load settings failed.";
      yield put(actions.requestFailure(errorMsg, e));
    }
  }

  yield takeLatest(actions.LOAD_SETTINGS, worker);
}


export function* deleteSettingsItem() {

  function* worker({ payload }) {
    const requestUrl = `${config.settingsUrl}${payload}`;
    const requestBody = {"_method": "delete"};

    try {
      yield put(actions.sendRequest());
      yield call(SuperFetch.post, requestUrl, false, requestBody);
      yield put(actions.requestSuccess("Item deleted successfully."));

      let settings = yield select(getSettings);
      settings = settings.filter(settingsItem => settingsItem.id !== payload);
      yield put(actions.deleteSettingsItemSuccess(settings));
    } catch (e) {
      const errorMsg = `Delete settings with id=${payload} failed.`;
      yield put(actions.requestFailure(errorMsg, e));
    }
  }

  yield takeEvery(actions.DELETE_SETTINGS_ITEM, worker)
}


function* updateSettingsItem() {
  function* worker({ payload }) {
    const selectedSettingsItem = yield select(getSelectedSettingsItem);
    const settings = yield select(getSettings);
    const selectedIndex = settings.indexOf(selectedSettingsItem);

    const settingsItemCopy = {
      ...selectedSettingsItem,
      [payload.key]: payload.value
    };
    const settingsCopy = [...settings];
    settingsCopy[selectedIndex] = settingsItemCopy;

    try {
      settingsItemCopy["_method"] = "put";
      const requestUrl = `${config.settingsUrl}${selectedSettingsItem.id}`;
      yield put(actions.sendRequest());
      yield call(SuperFetch.post, requestUrl, false, settingsItemCopy);
      yield put(actions.requestSuccess("Item updated successfully."));
      delete settingsItemCopy["_method"];

      yield put(actions.updateSelectedItemSuccess(settingsCopy, settingsItemCopy));
    } catch (e) {
      const errorDetails = `Update ${payload.key}=${payload.value} failed.`;
      yield put(actions.requestFailure(errorDetails, e));
    }
  }

  yield takeEvery(actions.UPDATE_SELECTED_ITEM, worker);
}


function* updateSql() {
  function* worker({ payload }) {
    const SqlMap = yield select(getSqlMap);
    const selectedSettingsItem = yield select(getSelectedSettingsItem);
    const sqlId = selectedSettingsItem["sql_id"];

    const sqlMapCopy = {...SqlMap, [sqlId]: payload};

    try {
      const requestUrl = `${config.tipsUrl}${sqlId}`;
      const requestBody = {"value": payload};
      yield put(actions.sendRequest());
      yield call(SuperFetch.put, requestUrl, false, requestBody);
      yield put(actions.requestSuccess("SQL updated successfully."));

      yield put(actions.updateSqlSuccess(sqlMapCopy));
    } catch (e) {
      const errorMsg = `Updating SQL id=${sqlId} failed.`;
      yield put(actions.requestFailure(errorMsg, e));
    }
  }

  yield takeEvery(actions.UPDATE_SQL, worker);
}


export default function* rootSaga() {
  yield all([
    fork(requestSuccess),
    fork(requestFailure),
    fork(loadSettings),
    fork(updateSettingsItem),
    fork(deleteSettingsItem),
    fork(updateSql),
  ]);
}
