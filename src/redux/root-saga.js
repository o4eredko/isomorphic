import { all } from "redux-saga/effects";
import authSagas from "src/Authorization/redux/saga";
import googleCrafterSagas from "src/GoogleCrafter/redux/root-saga";


export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    googleCrafterSagas()
  ]);
}
