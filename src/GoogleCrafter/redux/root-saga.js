import { all } from "redux-saga/effects";
import loadingSaga from "src/GoogleCrafter/redux/loading/saga";
import settingsSaga from "src/GoogleCrafter/redux/settings/saga";
import addItemSaga from "src/GoogleCrafter/redux/addItem/saga";
import generationSaga from "src/GoogleCrafter/redux/generations/saga";


export default function* rootSaga(getState) {
  yield all([
    loadingSaga(),
    settingsSaga(),
    addItemSaga(),
    generationSaga(),
  ]);
}
