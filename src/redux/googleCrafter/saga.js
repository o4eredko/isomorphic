import { all, takeEvery, takeLatest, fork, call, put, select } from "redux-saga/effects";
import actions from "./actions";
import SuperFetch from "src/library/helpers/superFetch";
import message from "src/components/uielements/message";
import isErrorStatus from "src/library/helpers/isErrorStatus";
import config from "src/config/googleCrafter.config";


const getSettings = (state) => state.googleCrafter.settings;

export function* loadSettings() {

  function* worker() {
    const url = config.settingsUrl;
    const { data, status } = yield call(SuperFetch.get, url);
    if (isErrorStatus(status)) {
      message.error("Error " + status);
    } else {
      yield put({ type: actions.LOAD_SETTINGS_SUCCESS, payload: data })
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

export default function* rootSaga() {
  yield all([
    fork(loadSettings),
    fork(deleteSettingsItem),
  ]);
}
