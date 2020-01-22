import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { loadState, saveState }            from '@iso/lib/helpers/localStorage';
import message                             from '@iso/components/Feedback/Message';
import actions                             from './actions';

export function* fetchData() {
  yield takeEvery(actions.FETCH_PLATFORM_DATA_START, function* ({ platformName, strategy }) {
    try {
      const response = yield call(strategy);
      yield put({ type: actions.FETCH_PLATFORM_DATA_SUCCESS, platformName, payload: response });
    } catch (e) {
      yield put({ type: actions.FETCH_PLATFORM_DATA_ERROR, platformName });
    }
  })
}

export function* initSync() {
  yield takeEvery(actions.INIT_SYNC_START, function* ({ platformName }) {
    const sync = loadState('red-button-loading') || {};
    if (!(platformName in sync)) {
      sync[platformName] = {};
      saveState('red-button-loading', sync);
    }
    yield put({ type: actions.INIT_SYNC, payload: sync });
  })
}

export function* switchCampaigns() {
  yield takeEvery(actions.SWITCH_CAMPAIGNS_START, function* ({ platformName, strategy, record }) {
    const { switchCampaigns, getCurrentStatus } = strategy;
    const initialStatus = record.active;
    try {
      const sync = yield call(startSync, getCurrentStatus, platformName, record);
      yield put({ type: actions.INIT_SYNC, payload: sync });

      yield put({
        type: actions.SWITCH_CAMPAIGNS_END,
        record: { ...record, active: !record.active },
        platformName,
      });
      yield call(switchCampaigns, !initialStatus, record.country);
      message.success(`Platforms in ${ record.country } was successfully ${ !record.active ? 'enabled' : 'disabled' }.`);

    } catch (e) {
      yield message.error('Something went wrong. Try again later.');
      yield put({ type: actions.END_SYNC_START, key: record.key, platformName });
      yield put({
        type: actions.SWITCH_CAMPAIGNS_END,
        record: { ...record, active: initialStatus },
        platformName,
      });
    }
  })
}

export function* startSync(getCurrentStatus, platformName, record) {
  const sync = loadState('red-button-loading');
  sync[platformName][record.key] = yield call(getCurrentStatus, record.country);
  saveState('red-button-loading', sync);
  return sync;
}

export function* endSync() {
  yield takeEvery(actions.END_SYNC_START, function* ({ key, platformName }) {
    const sync = loadState('red-button-loading');
    delete sync[platformName][key];
    saveState('red-button-loading', sync);
    yield put({ type: actions.INIT_SYNC, payload: sync });
  })
}

export default function* rootSaga() {
  yield all([
    fork(fetchData),
    fork(initSync),
    fork(endSync),
    fork(switchCampaigns),
  ]);
}
