const redButtonActions = {
  FETCH_PLATFORM_DATA_START: 'FETCH_PLATFORM_DATA_START',
  FETCH_PLATFORM_DATA_SUCCESS: 'FETCH_PLATFORM_DATA_SUCCESS',
  FETCH_PLATFORM_DATA_ERROR: 'FETCH_PLATFORM_DATA_ERROR',

  INIT_SYNC_START: 'INIT_SYNC_START',
  INIT_SYNC: 'INIT_SYNC_SUCCESS',
  END_SYNC_START: 'END_SYNC_START',
  END_SYNC: 'END_SYNC',

  SWITCH_CAMPAIGNS_START: 'SWITCH_CAMPAIGNS_START',
  SWITCH_CAMPAIGNS_SUCCESS: 'SWITCH_CAMPAIGNS_SUCCESS',
  SWITCH_CAMPAIGNS_ERROR: 'SWITCH_CAMPAIGNS_ERROR',

  fetchData: strategy => ({ type: redButtonActions.FETCH_PLATFORM_DATA_START, strategy }),
  initSync: platformName => ({ type: redButtonActions.INIT_SYNC_START, platformName }),
  endSync: (key, platformName) => ({ type: redButtonActions.END_SYNC_START, key, platformName }),
  switchCampaigns: (strategy, platformName, record) => ({
    type: redButtonActions.SWITCH_CAMPAIGNS_START,
    strategy, platformName, record
  }),
};

export default redButtonActions;
