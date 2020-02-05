import SuperFetch      from '@iso/lib/helpers/superFetch';
import PlatformActions from './PlatformActions';

class YandexActions extends PlatformActions {
  apiUrl = `http://localhost:8001/api`;

  switchCampaigns = (country, enable) => {
    const fetchUrl = `${ this.apiUrl }/campaigns/${ country.toLowerCase() }/`;
    return SuperFetch.put(fetchUrl, true, { enable }).then(response => {
      if (response.status !== 200) {
        throw Error('detail' in response.data ? response.data.detail : null);
      }
    });
  };
}

export default new YandexActions()
