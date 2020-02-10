import GoogleActions from './PlatformActions/GoogleActions';
import YandexActions from './PlatformActions/YandexActions';
import FacebookActions from './PlatformActions/FacebookActions';

const platforms = [
  {
    name: 'Google Ads',
    disabled: false,
    handler: GoogleActions,
  },
  {
    name: 'Yandex Direct',
    disabled: false,
    handler: YandexActions,
  },
  {
    name: 'Facebook Ads',
    disabled: false,
    handler: FacebookActions
  },
  {
    name: 'Bing Ads',
    disabled: true,
  },
];

export default platforms
