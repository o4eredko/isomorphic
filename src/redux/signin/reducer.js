import signInActions from '@iso/redux/signin/actions';

const initialState = {
  username: '',
  password: '',
};

export default function signinReducer(state = initialState, action) {
  switch (action.type) {
    case signInActions.CHANGE_INPUT_VALUE:
      return { ...state, [action.name]: action.payload };

    default:
      return state;
  }
}
