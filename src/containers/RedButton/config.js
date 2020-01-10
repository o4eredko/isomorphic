import GoogleActions from './PlatformActions/GoogleActions';

const platforms = [
  {
    name: 'Google Ads',
    disabled: false,
    handler: GoogleActions,
  },
  {
    name: 'Yandex Direct',
    disabled: true,
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
