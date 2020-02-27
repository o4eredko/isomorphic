import ch from 'src/config/translation/conversion/raw/chenese.js';
import fr from 'src/config/translation/conversion/raw/fr.js';
import ital from 'src/config/translation/conversion/raw/ital.js';
import span from 'src/config/translation/conversion/raw/span.js';
import arab from 'src/config/translation/conversion/raw/arab.js';
import english from 'src/config/translation/conversion/raw/eng.js';

export function getKeys(object) {
  let keys = [];
  let variables = [];
  let text = '';
  Object.keys(object).forEach(key => {
    keys.push(key);
    variables.push(object[key]);
    text += object[key] + '\n';
  });
  // getValues(keys);
  return {
    keys,
    variables,
  };
}
export function getValues(enMessages) {
  const { keys, variables } = getKeys(enMessages);
  const langs = [english, ch, fr, ital, span, arab];
  const langsNm = ['eng', 'ch', 'fr', 'ital', 'span', 'arab'];
  langs.forEach((lang, ii) => {
    const translatedDAta = lang.split('\n');
    const obj = {};
    keys.forEach((key, index) => {
      obj[key] = translatedDAta[index + 1];
    });
    console.log(
      langsNm[ii],
      translatedDAta.length,
      keys.length,
      '\n',
      JSON.stringify(obj, null, 2)
    );
  });
}
