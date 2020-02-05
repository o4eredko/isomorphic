import SuperFetch from "@iso/lib/helpers/superFetch";

export default class PlatformActions {
  apiUrl = null;

  getDataList = async () => {
    const fetchUrl = `${ this.apiUrl }/countries/`;
    const response = await SuperFetch.get(fetchUrl, true);
    return this.convertDataList(response.data);
  };

  getProgress = () => {
    const fetchUrl = `${ this.apiUrl }/campaigns/progress/`;
    return SuperFetch.get(fetchUrl, true).then(res => res.data);
  };

  convertDataList = async countries => {
    // Create requests to get status for every country
    let statusPromises = countries.map(country =>
      SuperFetch.get(`${ this.apiUrl }/campaigns/${ country }/status/`, true)
    );
    // Convert array of resolved promises to object with country: status values
    let statuses = {};
    for (const response of await Promise.all(statusPromises)) {
      const [[country, status]] = Object.entries(response.data);
      statuses[country] = status;
    }
    return countries.map((country, index) => ({
      key: index,
      country: country,
      loaded: 100,
      active: statuses[country],
    }))
  };

  switchCampaigns = (country, enable) => {
    throw TypeError("Not Implemented");
  };
}
