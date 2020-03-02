import { all, takeEvery, takeLatest, fork, call, put, select } from "redux-saga/effects";
import { preparedData, preparedSql } from "./data";

import actions from "./actions";

import { message } from "antd";
import SuperFetch from "src/lib/helpers/superFetch";
import isErrorStatus from "src/lib/helpers/isErrorStatus";

import config from "src/config/googleCrafter.config";


const getSettings = (state) => state.googleCrafter.settings;
const getSelectedSettingsItem = (state) => state.googleCrafter.selectedSettingsItem;


export function* loadSettings() {
  function* mockedWorker() {
    const sqlData = {};
    for (const { id, value } of preparedSql)
      sqlData[id] = value;
    yield put({ type: actions.LOAD_SETTINGS_SUCCESS, payload: preparedData });
    yield put({ type: actions.LOAD_SQL_SUCCESS, payload: sqlData });
  }

  function* worker() {
    const [settings, sql] = yield all([
      call(SuperFetch.get, config.settingsUrl),
      call(SuperFetch.get, config.tipsUrl)
    ]);

    if (isErrorStatus(settings.status) || isErrorStatus(sql.status))
      message.error("Error");
    else {
      const sqlData = {};
      for (const { id, value } of sql.data)
        sqlData[id] = value;

      yield put({ type: actions.LOAD_SETTINGS_SUCCESS, payload: settings.data });
      yield put({ type: actions.LOAD_SQL_SUCCESS, payload: sqlData });
    }
  }

  yield takeLatest(actions.LOAD_SETTINGS, mockedWorker);
}

export function* deleteSettingsItem() {

  function* worker({ payload }) {
    let settings = yield select(getSettings);
    settings = settings.filter(settingsItem => settingsItem.id !== payload);
    yield put(
      { type: actions.DELETE_SETTINGS_ITEM_SUCCESS, payload: settings }
    );
    // yield call
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

    settingsItemCopy["_method"] = "put";
    try {
      const requestUrl = `${config.settingsUrl}${selectedSettingsItem.id}`;
      const response = yield call(SuperFetch.post, requestUrl, false, settingsItemCopy);
    } catch (err) {
      const errorDetails = `Update ${payload.key}=${payload.value} failed.`;
      yield put(actions.updateSelectedItemFailure(errorDetails));
      return;
    }
    delete settingsItemCopy["_method"];

    yield put(actions.updateSelectedItemSuccess({
      selectedSettingsItem: settingsItemCopy,
      settings: settingsCopy,
    }));
  }

  yield takeEvery(actions.UPDATE_SELECTED_ITEM, worker);
}

export default function* rootSaga() {
  yield all([
    fork(loadSettings),
    fork(updateSettingsItem),
    fork(deleteSettingsItem),
  ]);
}
