import { loadState } from '@iso/lib/helpers/localStorage';
import SuperFetch    from "../../../library/helpers/superFetch";

const fetchHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

class GoogleActions {
  apiUrl = 'http://localhost:8000/api';

  getDataList = async () => {
    const fetchUrl = `${ this.apiUrl }/${ 'countries/' }`;
    try {
      const response = await SuperFetch.get(fetchUrl, true);
      if (response.status !== 200) throw Error();
      return this.convertDataList(response.data);
    } catch (e) {
      console.log(e);
      return [{key: 0, country: 'SS'}];
    }
  };

  convertDataList = async countries => {
    // Create requests to get status for every country
    let statusPromises = countries.map(country =>
      SuperFetch.get(`${ this.apiUrl }/campaigns/${ country }/status/`, true)
        .then(response => response.json())
    );
    // Convert array of resolved promises to object with country: status values
    let statuses = {};
    for (const response of await Promise.all(statusPromises)) {
      const [[country, status]] = Object.entries(response);
      statuses[country] = status;
    }
    const currentLoading = loadState('red-button-loading') || {};
    return countries.map((country, index) => ({
      key: index,
      country: country.toUpperCase(),
      loaded: currentLoading[index] ? 0 : 100,
      active: statuses[country],
    }))
  };

  switchCampaign = async (active, record) => {
    const fetchUrl = `${ this.apiUrl }/campaigns/${ record.country }/`;
    const response = await SuperFetch.put(fetchUrl, true, { enable: active });
    if (!response.ok) throw Error(await response.text());
  };

  getCurrentStatus = country => {
    const fetchUrl = `${ this.apiUrl }/campaigns/${ country }/`;
    const fetchConfig = { method: 'GET', headers: fetchHeaders };
    return SuperFetch.get(fetchUrl, fetchConfig).then(res => res.data.result);
  };
}

export default new GoogleActions()
