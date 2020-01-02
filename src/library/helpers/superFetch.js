import jwtConfig from '@iso/config/jwt.config';

const customHeader = () => {
  const token = localStorage.getItem('id_token');
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: token ? `Bearer ${ token }` : '',
  }
};

const base = (method, url, data = {}) => {
  const params = {
    method,
    headers: customHeader(),
  };
  if (method !== 'get') params.body = JSON.stringify(data);
  return fetch(`${ jwtConfig.fetchUrl }${ url }`, params)
    .then(async response => ({ data: await response.json(), status: response.status }))
};

const SuperFetch = {};
['get', 'post', 'put', 'delete'].forEach(method => {
  SuperFetch[method] = base.bind(null, method);
});
export default SuperFetch;
