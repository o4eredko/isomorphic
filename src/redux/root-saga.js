import { all } from "redux-saga/effects";
import authSagas from "src/Authorization/redux/saga";
import googleCrafterSaga from "src/GoogleCrafter/redux/saga";


export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    googleCrafterSaga()
  ]);
}
