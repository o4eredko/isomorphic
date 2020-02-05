import SuperFetch      from '@iso/lib/helpers/superFetch';
import PlatformActions from "./PlatformActions";

class GoogleActions extends PlatformActions {
  apiUrl = 'http://localhost:8000/api';

  switchCampaigns = (country, enable) => {
    const fetchUrl = `${ this.apiUrl }/campaigns/${ country }/`;
    return SuperFetch.put(fetchUrl, true, { enable });
  };
}

export default new GoogleActions()
