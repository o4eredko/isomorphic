import { all, takeEvery, takeLatest, fork, call, put, select } from "redux-saga/effects";
import actions from "./actions";
import SuperFetch from "src/library/helpers/superFetch";
import message from "src/components/uielements/message";
import isErrorStatus from "src/library/helpers/isErrorStatus";
import config from "src/config/googleCrafter.config";


const getSettings = (state) => state.googleCrafter.settings;
const getSelectedSettingsItem = (state) => state.googleCrafter.selectedSettingsItem;


export function* loadSettings() {

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

  yield takeLatest(actions.LOAD_SETTINGS, worker);
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
    let selectedSettingsItem = yield select(getSelectedSettingsItem);
    selectedSettingsItem = {
      ...selectedSettingsItem,
      [payload.key]: payload.value
    };

    // try {
    //   const response = yield call(superFetch.put, selectedSettingsItem);
    // } catch (err) {
    //   yield put({
    //     type:actions.UPDATE_SELECTED_ITEM_FAILURE,
    //     details: err,
    //   });
    // }

    yield put({
      type: actions.UPDATE_SELECTED_ITEM_SUCCESS,
      payload: selectedSettingsItem,
    });
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
