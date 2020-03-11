import actions from "./actions";


const initState = {
  step: 0,
  sql: "",
  formData: null,
  uploadStatus: "pending",
};


export default function addItemReducer(state = initState, action) {
  switch (action.type) {

    case actions.SET_STEP:
      return { ...state, step: action.payload };

    case actions.SET_SQL:
      return { ...state, sql: action.payload };

    case actions.SET_FORM_DATA:
      return { ...state, formData: action.payload };

    case actions.SET_UPLOAD_STATUS:
      return { ...state, uploadStatus: action.payload };

    case actions.RESET_ALL:
      return initState;

    default:
      return state;
  }
}
