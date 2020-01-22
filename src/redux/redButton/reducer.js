import actions from './actions';

const initState = {
  data: {},
  loading: true,
  sync: {},
};

export default function redButtonReducer(state = initState, action) {
  const platform = action.platformName;

  switch (action.type) {
    case actions.FETCH_PLATFORM_DATA_SUCCESS:
      return {
        ...state,
        data: { ...state.data, [platform]: action.payload },
        loading: false,
      };
    case actions.FETCH_PLATFORM_DATA_ERROR:
      return {
        ...state,
        data: { ...state.data, [platform]: [] },
        loading: false,
      };

    case actions.INIT_SYNC:
      return { ...state, sync: action.payload };

    case actions.SWITCH_CAMPAIGNS_END:
      const { record } = action;
      const data = { ...state.data };
      data[platform] = [...data[platform]];
      data[platform][record.key] = record;
      return { ...state, data };

    default:
      return state;
  }
}
