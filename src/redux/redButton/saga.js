import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { loadState, saveState }            from '@iso/lib/helpers/localStorage';
import message                             from '@iso/components/Feedback/Message';
import actions                             from './actions';

export function* fetchDataStart() {
  yield takeEvery(actions.FETCH_PLATFORM_DATA_START, function* ({ strategy }) {
    try {
      const response = yield call(strategy);
      yield put({ type: actions.FETCH_PLATFORM_DATA_SUCCESS, payload: response });
    } catch (e) {
      yield put({ type: actions.FETCH_PLATFORM_DATA_ERROR });
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
    yield put({ type: actions.INIT_SYNC, payload: sync[platformName] });
  })
}

export function* switchCampaigns() {
  yield takeEvery(actions.SWITCH_CAMPAIGNS_START, function* ({ strategy, platformName, record }) {
    const { switchCampaigns, getCurrentStatus } = strategy;
    try {
      yield call(switchCampaigns, !record.active, record.country);
      const sync = yield call(startSync, getCurrentStatus, platformName, record);
      yield put({
        type: actions.SWITCH_CAMPAIGNS_SUCCESS,
        record: { ...record, active: !record.active },
        sync: sync,
      });
      message.success(`Platform will be ${ !record.active ? 'enabled' : 'disabled' }.`);
    } catch (e) {
      yield message.error('Something went wrong. Try again later.');
    }
  })
}

export function* startSync(getCurrentStatus, platformName, record) {
  const sync = loadState('red-button-loading');
  sync[platformName][record.key] = yield call(getCurrentStatus, record.country);
  saveState('red-button-loading', sync);
  return sync[platformName];
}

export function* endSync() {
  yield takeEvery(actions.END_SYNC_START, function* ({ key, platformName }) {
    const sync = loadState('red-button-loading');
    delete sync[platformName][key];
    saveState('red-button-loading', sync);
    yield put({ type: actions.END_SYNC, payload: key });
  })
}

export default function* rootSaga() {
  yield all([
    fork(fetchDataStart),
    fork(initSync),
    fork(endSync),
    fork(switchCampaigns),
  ]);
}
