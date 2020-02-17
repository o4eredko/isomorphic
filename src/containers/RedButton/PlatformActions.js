import SuperFetch from '@iso/lib/helpers/superFetch';

export default class PlatformActions {

  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.urlTable = null;
  }

  initUrlTable = async () => {
    this.urlTable = (await SuperFetch.get(this.apiUrl, true)).data;
  };

  getDataList = async () => {
    const syncUrl = this.urlTable.countries;
    const response = await SuperFetch.get(syncUrl, true);

    return Object.entries(response.data).map(([country, isActive]) => ({
      key: country,
      country,
      loaded: 100,
      active: isActive
    }));
  };

  getProgress = () => {
    const fetchUrl = this.urlTable.progress;
    return SuperFetch.get(fetchUrl, true).then(res => res.data);
  };

  switchCampaigns = async (country, enable) => {
    const fetchUrl = this.urlTable.campaigns;
    const campaigns = (await SuperFetch.get(fetchUrl, true)).data;
    const switchUrl = campaigns[country];
    return SuperFetch.put(switchUrl, true, { enable }).then(({ data, status }) => {
      if (status >= 400)
        throw Error(data.detail)
    })
  };
}
