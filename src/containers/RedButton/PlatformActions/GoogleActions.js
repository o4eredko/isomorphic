import { loadState } from '@iso/lib/helpers/localStorage';

const fetchHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

class GoogleActions {
  apiUrl = 'http://localhost:8000/api';

  getDataList = () => {
    const fetchUrl = `${ this.apiUrl }/${ 'countries/' }`;
    const fetchConfig = { method: 'GET', headers: fetchHeaders };

    return fetch(fetchUrl, fetchConfig).then(async response => {
      if (response.status !== 200) throw Error('HEL`P ME');
      return this.convertDataList(await response.json());
    }).catch(() => []);
  };

  convertDataList = async countries => {
    // Create requests to get status for every country
    const fetchConfig = { method: 'GET', headers: fetchHeaders };
    let statusPromises = countries.map(country =>
      fetch(`${ this.apiUrl }/campaigns/${ country }/status/`, fetchConfig)
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
    const body = JSON.stringify({ enable: active });
    const fetchConfig = { method: 'PUT', headers: fetchHeaders, body };
    const response = await fetch(fetchUrl, fetchConfig);
    if (!response.ok) throw Error(await response.text());
  };

  getCurrentStatus = country => {
    const fetchUrl = `${ this.apiUrl }/campaigns/${ country }/`;
    const fetchConfig = { method: 'GET', headers: fetchHeaders };
    return fetch(fetchUrl, fetchConfig)
      .then(async response => (await response.json()).result);
  };
}

export default new GoogleActions()
