import actions from './actions';

const initState = { accessToken: null, refreshToken: null };

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        accessToken: action.payload.access,
        refreshToken: action.payload.refresh,
      };

    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
