import actions from './actions';

const initState = {
  data: [],
  loading: true,
  sync: {},
};

export default function redButtonReducer(state = initState, action) {
  switch (action.type) {
    case actions.FETCH_PLATFORM_DATA_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case actions.FETCH_PLATFORM_DATA_ERROR:
      return { ...state, loading: false };

    case actions.INIT_SYNC:
      return { ...state, sync: action.payload };
    case actions.END_SYNC:
      const sync = { ...state.sync };
      delete sync[action.payload];
      return { ...state, sync };

    case actions.SWITCH_CAMPAIGNS_SUCCESS:
      const data = [...state.data];
      data[action.record.key] = action.record;
      return { ...state, data, sync: action.sync };

    default:
      return state;
  }
}
