import GoogleActions from './PlatformActions/GoogleActions';
import YandexActions from './PlatformActions/YandexActions';

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
    name: 'Bing Ads',
    disabled: true,
  },
  {
    name: 'Facebook Ads',
    disabled: true,
  },
];

export default platforms
