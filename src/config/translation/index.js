import Enlang from 'src/config/translation/entries/en-US';
import Zhlang from 'src/config/translation/entries/zh-Hans-CN';
import Salang from 'src/config/translation/entries/ar_SA';
import Itlang from 'src/config/translation/entries/it_IT';
import Eslang from 'src/config/translation/entries/es_ES';
import Frlang from 'src/config/translation/entries/fr_FR';
import { addLocaleData } from 'react-intl';

const AppLocale = {
  en: Enlang,
  zh: Zhlang,
  sa: Salang,
  it: Itlang,
  es: Eslang,
  fr: Frlang,
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.zh.data);
addLocaleData(AppLocale.sa.data);
addLocaleData(AppLocale.it.data);
addLocaleData(AppLocale.es.data);
addLocaleData(AppLocale.fr.data);

export default AppLocale;
