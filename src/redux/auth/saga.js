import { all, takeEvery, put, fork } from 'redux-saga/effects';
import { createBrowserHistory }      from 'history';

import { getTokens, clearTokens } from '@iso/lib/helpers/utility';
import actions                    from './actions';

const history = createBrowserHistory();

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function* ({ payload }) {
    const { access, refresh } = payload;
    if (!access || !refresh)
      yield put({ type: actions.LOGIN_ERROR });

    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    yield put({
      type: actions.LOGIN_SUCCESS,
      profile: 'Profile',
    });
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* () {
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function* () {
  });
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    yield clearTokens();
    history.push('/');
  });
}

export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    const tokens = getTokens();
    const access = tokens.get('access');
    const refresh = tokens.get('refresh');
    if (access && refresh) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        profile: 'Profile',
      });
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}
