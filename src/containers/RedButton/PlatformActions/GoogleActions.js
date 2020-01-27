import SuperFetch from '@iso/lib/helpers/superFetch';

class GoogleActions {
  apiUrl = 'http://localhost:8000/api';

  getDataList = async () => {
    const fetchUrl = `${ this.apiUrl }/countries/`;
    const response = await SuperFetch.get(fetchUrl, true);
    return this.convertDataList(response.data);
  };
  
  getCurrentStatus = country => {
    const fetchUrl = `${ this.apiUrl }/campaigns/${ country }/`;
    return SuperFetch.get(fetchUrl, true).then(res => res.data.result);
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
      country: country.toUpperCase(),
      active: statuses[country],
    }))
  };

  switchCampaigns = (enable, country) => {
    const fetchUrl = `${ this.apiUrl }/campaigns/${ country }/`;
    return SuperFetch.put(fetchUrl, true, { enable });
  };
}

export default new GoogleActions()
