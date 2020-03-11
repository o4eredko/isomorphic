const actions = {
  CHECK_AUTHORIZATION: "CHECK_AUTHORIZATION",
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGOUT: "LOGOUT",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",

  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
  login: (access = false, refresh = false) => ({
    type: actions.LOGIN_REQUEST,
    payload: { access, refresh },
  }),
  logout: () => ({
    type: actions.LOGOUT,
  }),
};
export default actions;
