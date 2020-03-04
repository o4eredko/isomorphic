import { all, takeEvery, takeLatest, fork, call, put, select } from "redux-saga/effects";

import actions from "src/GoogleCrafter/redux/generations/actions";
import { workerDecorator, getGenerationList } from "src/GoogleCrafter/utils/sagaUtils";

import SuperFetch from "src/lib/helpers/superFetch";

import config from "src/GoogleCrafter/config/googleCrafter.config";


function* loadGenerations() {
  function* worker() {
    const { data } = yield call(SuperFetch.get, config.generationListUrl);
    data.reverse();
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


function* toggleProcessing() {
  function* worker({ payload }) {
    const generationList = yield select(getGenerationList);
    const toggleIndex = generationList.findIndex(({ id }) => id === payload);
    const generationToToggle = generationList[toggleIndex];
    const requestUrl = `${config.generationListUrl}${payload}`;
    const requestBody = {isPaused: !generationToToggle.isPaused};
    console.log("request", requestUrl, requestBody);

    yield call(SuperFetch.put, requestUrl, false, requestBody);

    const generationListCopy = [ ...generationList ];
    generationListCopy[toggleIndex].isPaused = !generationListCopy[toggleIndex].isPaused;
    yield put(actions.toggleProcessingSuccess(generationListCopy));
  }

  yield takeEvery(
    actions.TOGGLE_PROCESSING,
    workerDecorator("Toggle processing failed.", "Toggle success")(worker)
  );
}


export default function* rootSaga() {
  yield all([
    fork(loadGenerations),
    fork(startGeneration),
    fork(toggleProcessing),
  ]);
}
