import { all, takeEvery, takeLatest, fork, call, put, select } from "redux-saga/effects";

import actions from "src/GoogleCrafter/redux/generations/actions";

import SuperFetch from "src/lib/helpers/superFetch";

import config from "src/GoogleCrafter/config/googleCrafter.config";
import { workerDecorator } from "src/GoogleCrafter/utils/sagaUtils";


function* loadGenerations() {
  function* worker() {
    const { data } = yield call(SuperFetch.get, config.generationListUrl);
    yield put(actions.loadGenerationsSuccess(data));
  }

  yield takeEvery(
    actions.LOAD_GENERATIONS,
    workerDecorator("Loading Generation List failed.")(worker));
}


function* startGeneration() {
  function* worker({ payload }) {
    const { data: { id } } = yield call(SuperFetch.post, config.generatorUrl, false, payload);

    const url = config.generationListUrl + id.toString();
    const data = { name: payload.settings.name };
    yield call(SuperFetch.put, url, false, data);
    yield put(actions.loadGenerations());
  }

  yield takeEvery(
    actions.START_GENERATION,
    workerDecorator(
      "Generation failed.",
      "New Generation was started"
    )(worker)
  );
}


export default function* rootSaga() {
  yield all([
    fork(loadGenerations),
    fork(startGeneration),
  ]);
}
