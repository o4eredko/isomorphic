const actions = {
  LOAD_GENERATIONS: "LOAD_GENERATIONS",
  LOAD_GENERATIONS_SUCCESS: "LOAD_GENERATIONS_SUCCESS",

  TOGGLE_PROCESSING: "TOGGLE_PROCESSING",
  TOGGLE_PROCESSING_SUCCESS: "TOGGLE_PROCESSING_SUCCESS",
  START_GENERATION: "START_GENERATION",

  loadGenerations: () => ({ type: actions.LOAD_GENERATIONS }),
  loadGenerationsSuccess: (payload) => ({
    type: actions.LOAD_GENERATIONS_SUCCESS,
    payload
  }),

  startGeneration: (payload) => ({ type: actions.START_GENERATION, payload }),
  toggleProcessing: (id) => ({ type: actions.TOGGLE_PROCESSING, payload: id }),
  toggleProcessingSuccess: (payload) => ({ type: actions.TOGGLE_PROCESSING_SUCCESS, payload }),
};

export default actions;
