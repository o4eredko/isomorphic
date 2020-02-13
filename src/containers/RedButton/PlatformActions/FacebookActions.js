import SuperFetch      from '@iso/lib/helpers/superFetch';
import PlatformActions from './PlatformActions';

class FacebookActions extends PlatformActions {
    apiUrl = `http://localhost:8002/api`;

    switchCampaigns = (country, enable) => {
        const fetchUrl = `${ this.apiUrl }/campaigns/${ country.toLowerCase() }/`;

        return SuperFetch.put(fetchUrl, true, { enable })
    };
}

export default new FacebookActions()
