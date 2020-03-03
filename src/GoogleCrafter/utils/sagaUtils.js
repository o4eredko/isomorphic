import { put } from "redux-saga/effects";

import settingsActions from "src/GoogleCrafter/redux/actions";


const workerDecorator = (errorMsg, successMsg) => (workerGenerator) => function* (action) {
  yield put(settingsActions.sendRequest());
  try {
    yield* workerGenerator(action);
    yield put(settingsActions.requestSuccess(successMsg));
  } catch (e) {
    yield put(settingsActions.requestFailure(errorMsg, e));
  }
};


export default workerDecorator;
