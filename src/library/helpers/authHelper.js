import jwtDecode       from 'jwt-decode';
import jwtConfig       from '@iso/config/jwt.config.js';
import SuperFetch      from './superFetch';
import { useSelector } from 'react-redux';

class AuthHelper {
  // login = userInfo => {
  //   return SuperFetch.post(`${ jwtConfig.fetchUrl }/login/`, userInfo).then(response =>
  //     this.checkExpiration(response.data.access)
  //   );
  // };

  // async checkDemoPage(token) {
  //   if (this.checkExpiration(token).error) {
  //     return { error: 'Token expired' };
  //   }
  //   return await SuperFetch.get('secret/test', { token })
  //     .then(response => ({
  //       status: '200',
  //       message: 'Success',
  //     }))
  //     .catch(error => ({ error: JSON.stringify(error) }));
  // }

  refreshToken = async () => {
    const fetchParams = {
      fetchUrl: `${ jwtConfig.fetchUrl }/refresh/`,
      authorization: false,
      fetchData: { refresh: localStorage.getItem('refresh_token') },
    };
    const response = await SuperFetch.post(...fetchParams);
    if (response.status !== 200) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
    localStorage.setItem('access_token', response.access);
  };

  checkExpiration = token => {
    if (!token) throw Error('Username and password do not match');
    const profile = jwtDecode(token);

    const expiredAt = profile.expiredAt || profile.exp * 1000;
    if (expiredAt > new Date().getTime()) {
      return {
        ...profile,
        token,
        expiredAt: new Date(expiredAt),
      };
    } else {
      throw Error('Token expired');
    }
  };
}

export default new AuthHelper();
