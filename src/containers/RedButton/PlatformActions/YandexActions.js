import SuperFetch from '@iso/lib/helpers/superFetch';

class YandexActions {
  apiUrl = 'http://localhost:8001/api';
  status = 0;

  getDataList = async () => {
    const fetchUrl = `${ this.apiUrl }/countries/`;
    const response = await SuperFetch.get(fetchUrl, true);
    return this.convertDataList(response.data);
  };

  getCurrentStatus = country => {
    return this.status;
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
    const fetchUrl = `${ this.apiUrl }/campaigns/${ country.toLowerCase() }/`;
    this.status = 100;
    return SuperFetch.put(fetchUrl, true, { enable }).then(response => {
      if (response.status !== 200)
        throw Error();
      this.status = 0;
    });
  };
}

export default new YandexActions()
