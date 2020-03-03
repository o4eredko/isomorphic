import { all, takeEvery, fork, put, call, select } from "redux-saga/effects";

import actions from "./actions";

import { message } from "antd";
import SuperFetch from "src/lib/helpers/superFetch";

import config from "src/GoogleCrafter/config/googleCrafter.config";


function getSettingsData(formData, sql_id) {
  const [adGroup_bid_min, adGroup_bid_max] = formData["adGroup_bid_range"];
  let settingsData = { ...formData, sql_id, adGroup_bid_min, adGroup_bid_max };

  /* Convert dynamic fields to static fields */
  if ("dynamic" in settingsData) {
    for (const { key, value } of settingsData["dynamic"])
      settingsData[key] = value;
    delete settingsData["dynamic"];
  }

  /* delete unused values for API */
  delete settingsData["ad_group_bid_range"];
  delete settingsData["keys"];

  /* set useless params to not being block by CORS:) */
  settingsData["stopWords"] = "empty";
  settingsData["forbiddenCharacter"] = "empty";

  return settingsData;
}

const getAddItemData = (state) => state.googleCrafter.addItem;

function* uploadToServer() {

  function* worker() {
    let { sql, formData } = yield select(getAddItemData);
    const sqlData = { name: formData.name, value: sql };
    try {
      /* Upload sql to access sql_id */
      let response = yield call(SuperFetch.post, config.tipsUrl, false, sqlData);
      if (response.status !== 201)
        throw Error("Cannot upload sql");

      /* Upload settings */
      const settingsData = getSettingsData(formData, response.data.id);
      console.dir(settingsData);
      response = yield call(SuperFetch.post, config.settingsUrl, false, settingsData);
      if (response.status !== 201)
        throw Error("Cannot upload settings");
      yield put(actions.setUploadStatus("success"));
      // yield put(actions.setUploadStatus("error"));
    } catch (e) {
      console.error(e);
      yield put(actions.setUploadStatus("error"));
      message.error(e.toString());
    }
  }

  yield takeEvery(actions.UPLOAD_TO_SERVER, worker)
}


export default function* rootSaga() {
  yield all([
    fork(uploadToServer)
  ]);
}
