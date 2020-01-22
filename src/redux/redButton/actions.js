const redButtonActions = {
  FETCH_PLATFORM_DATA_START: 'FETCH_PLATFORM_DATA_START',
  FETCH_PLATFORM_DATA_SUCCESS: 'FETCH_PLATFORM_DATA_SUCCESS',
  FETCH_PLATFORM_DATA_ERROR: 'FETCH_PLATFORM_DATA_ERROR',

  INIT_SYNC_START: 'INIT_SYNC_START',
  INIT_SYNC: 'INIT_SYNC',
  END_SYNC_START: 'END_SYNC_START',
  END_SYNC: 'END_SYNC',

  SWITCH_CAMPAIGNS_START: 'SWITCH_CAMPAIGNS_START',
  SWITCH_CAMPAIGNS_END: 'SWITCH_CAMPAIGNS_END',

  fetchData: (platformName, strategy) => ({
    type: redButtonActions.FETCH_PLATFORM_DATA_START, platformName, strategy
  }),
  initSync: platformName => ({
    type: redButtonActions.INIT_SYNC_START, platformName
  }),
  endSync: (platformName, key) => ({
    type: redButtonActions.END_SYNC_START, platformName, key
  }),
  switchCampaigns: (platformName, strategy, record) => ({
    type: redButtonActions.SWITCH_CAMPAIGNS_START,
    platformName, strategy, record
  }),
};

export default redButtonActions;
