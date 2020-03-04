const actions = {
  LOAD_GENERATIONS: "LOAD_GENERATIONS",
  LOAD_GENERATIONS_SUCCESS: "LOAD_GENERATIONS_SUCCESS",

  START_GENERATION: "START_GENERATION",

  loadGenerations: () => ({ type: actions.LOAD_GENERATIONS }),
  loadGenerationsSuccess: (payload) => ({
    type: actions.LOAD_GENERATIONS_SUCCESS,
    payload
  }),

  startGeneration: (payload) => ({ type: actions.START_GENERATION, payload }),
};

export default actions;
