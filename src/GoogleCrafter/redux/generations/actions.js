const actions = {
  LOAD_GENERATIONS: "LOAD_GENERATIONS",
  LOAD_GENERATIONS_SUCCESS: "LOAD_GENERATIONS_SUCCESS",
  SET_LOADING: "SET_LOADING",


  setLoading: (payload) => ({ type: actions.SET_LOADING, payload }),
  loadGenerations: () => ({ type: actions.LOAD_GENERATIONS }),
  loadGenerationsSuccess: (payload) => ({
    type: actions.LOAD_GENERATIONS_SUCCESS,
    payload
  }),
};

export default actions;
