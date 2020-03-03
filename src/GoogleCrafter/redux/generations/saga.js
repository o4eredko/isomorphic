import { all, takeEvery, takeLatest, fork, call, put, select } from "redux-saga/effects";

import actions from "src/GoogleCrafter/redux/generations/actions";

import SuperFetch from "src/lib/helpers/superFetch";

import config from "src/GoogleCrafter/config/googleCrafter.config";


function* loadGenerations() {
  function* worker() {
    yield put(actions.setLoading(true));

    const { data, status } = yield call(SuperFetch.get, config.generationListUrl);
    yield put(actions.loadGenerationsSuccess(data));

    yield put(actions.setLoading(false));
  }

  yield takeEvery(actions.LOAD_GENERATIONS, worker);
}


export default function* rootSaga() {
  yield all([
    fork(loadGenerations),
  ]);
}
