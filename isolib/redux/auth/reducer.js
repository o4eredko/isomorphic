import actions from './actions';

const initState = { isLoggedIn: false };

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return { isLoggedIn: true };
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
