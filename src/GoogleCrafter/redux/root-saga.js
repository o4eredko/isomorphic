import { all } from "redux-saga/effects";
import settingsSaga from "src/GoogleCrafter/redux/settings/saga";
import addItemSaga from "src/GoogleCrafter/redux/addItem/saga";


export default function* rootSaga(getState) {
  yield all([
    settingsSaga(),
    addItemSaga(),
  ]);
}