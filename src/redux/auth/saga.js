import { all, call, takeEvery, put, fork } from 'redux-saga/effects';
import { createBrowserHistory }            from 'history';

import { getTokens, clearTokens } from '@iso/lib/helpers/utility';
import authHelper                 from '@iso/lib/helpers/authHelper';
import actions                    from './actions';

const history = createBrowserHistory();

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function* ({ payload }) {
    const { access, refresh } = payload;

    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    yield put({
      type: actions.LOGIN_SUCCESS,
      profile: 'Profile',
    });
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
    let tokenIsActive = true;
    const tokens = getTokens();
    const access = tokens.get('access');
    const refresh = tokens.get('refresh');
    if (!access || !refresh) return;

    try {
      authHelper.checkExpiration(access);
    } catch {
      tokenIsActive = yield call(authHelper.refreshToken);
    }
    if (tokenIsActive) yield put({ type: actions.LOGIN_SUCCESS })
  });
}

export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(logout),
  ]);
}
