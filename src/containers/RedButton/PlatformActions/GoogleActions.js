import { loadState } from '@iso/lib/helpers/localStorage';
import SuperFetch    from '@iso/lib/helpers/superFetch';

class GoogleActions {
  apiUrl = 'http://localhost:8000/api';

  getDataList = async () => {
    const fetchUrl = `${ this.apiUrl }/countries/`;
    try {
      const response = await SuperFetch.get(fetchUrl, true);
      if (response.status !== 200) throw Error();
      return this.convertDataList(response.data);
    } catch (e) {
      console.log(e);
      return [];
    }
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

  switchCampaign = async (active, record) => {
    const fetchUrl = `${ this.apiUrl }/campaigns/${ record.country }/`;
    const response = await SuperFetch.put(fetchUrl, true, { enable: active });
    if (response.status !== 200) throw Error(response.data);
  };

  getCurrentStatus = country => {
    const fetchUrl = `${ this.apiUrl }/campaigns/${ country }/`;
    return SuperFetch.get(fetchUrl, true).then(res => res.data.result);
  };
}

export default new GoogleActions()
