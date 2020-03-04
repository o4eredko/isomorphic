import { all, takeEvery, takeLatest, fork, call, put, select } from "redux-saga/effects";

import actions from "src/GoogleCrafter/redux/generations/actions";
import { workerDecorator, getGenerationList } from "src/GoogleCrafter/utils/sagaUtils";

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


function* toggleProcessing() {
  function* worker({ payload }) {
    const generationList = yield select(getGenerationList);
    const toggleIndex = generationList.findIndex(({ id }) => id === payload);
    const generationToToggle = generationList[toggleIndex];
    const requestUrl = `${config.generationListUrl}${payload}`;
    const requestBody = {isPaused: !generationToToggle.isPaused};
    console.log("request", requestUrl, requestBody);

    yield call(SuperFetch, requestUrl, false, requestBody);

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
    fork(toggleProcessing),
  ]);
}
