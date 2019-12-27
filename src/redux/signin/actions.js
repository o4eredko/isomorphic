const signInActions = {
  CHANGE_INPUT_VALUE: 'CHANGE_INPUT_VALUE',

  changeInputValue: input => ({
    type: signInActions.CHANGE_INPUT_VALUE,
    name: input.name,
    payload: input.value,
  }),
};

export default signInActions;