const actions = {
  SEND_REQUEST: "SEND_REQUEST",
  REQUEST_SUCCESS: "REQUEST_SUCCESS",
  REQUEST_FAILURE: "REQUEST_FAILURE",

  sendRequest: () => ({
    type: actions.SEND_REQUEST,
  }),
  requestSuccess: (prompt = "") => ({
    type: actions.REQUEST_SUCCESS,
    payload: prompt,
  }),
  requestFailure: (reason, details) => ({
    type: actions.REQUEST_FAILURE,
    payload: { reason, details },
  }),
};

export default actions;
