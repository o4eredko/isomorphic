import authHelper from './authHelper';

const customHeader = authorization => {
  const access = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: authorization ? `Bearer ${ access }` : '',
  }
};

const checkToken = () => {
  const access = localStorage.getItem('access_token');
  try {
    authHelper.checkExpiration(access);
  } catch {
    return authHelper.refreshToken();
  }
};

const base = async (method, url, authorization=false, data = {}) => {
  if (authorization) await checkToken();
  const params = {
    method,
    headers: customHeader(authorization),
  };
  if (method !== 'get') params.body = JSON.stringify(data);
  return fetch(`${ url }`, params)
    .then(async response => ({ data: await response.json(), status: response.status }))
};

const SuperFetch = {};
['get', 'post', 'put', 'delete'].forEach(method => {
  SuperFetch[method] = base.bind(null, method);
});
export default SuperFetch;
