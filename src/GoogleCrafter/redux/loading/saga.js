import { all, takeEvery, takeLatest, fork, call, put, select } from "redux-saga/effects";
import { message } from "antd";

import actions from "./actions";


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


export default function* rootSaga() {
  yield all([
    fork(requestSuccess),
    fork(requestFailure),
  ]);
}
