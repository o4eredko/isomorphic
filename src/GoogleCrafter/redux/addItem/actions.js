const actions = {
  SET_STEP: "SET_STEP",
  SET_SQL: "SET_SQL",
  SET_FORM_DATA: "SET_FORM_DATA",
  SET_UPLOAD_STATUS: "SET_UPLOAD_STATUS",
  UPLOAD_TO_SERVER: "UPLOAD_TO_SERVER",
  RESET_ALL: "RESET_ALL",

  setStep: (step) => ({ type: actions.SET_STEP, payload: step }),
  setSql: (sql) => ({ type: actions.SET_SQL, payload: sql }),
  setFormData: (data) => ({ type: actions.SET_FORM_DATA, payload: data }),
  setUploadStatus: (status) => ({ type: actions.SET_UPLOAD_STATUS, payload: status }),
  resetAll: () => ({ type: actions.RESET_ALL }),
  uploadToServer: () => ({ type: actions.UPLOAD_TO_SERVER }),
};

export default actions;
