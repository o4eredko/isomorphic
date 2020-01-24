import jwtDecode    from 'jwt-decode';
import jwtConfig    from '@iso/config/jwt.config.js';
import SuperFetch   from './superFetch';
import Notification from '@iso/components/Notification';

class AuthHelper {
  refreshToken = async () => {
    const fetchUrl = `${ jwtConfig.fetchUrl }/refresh/`;
    const authorization = false;
    const fetchData = { refresh: localStorage.getItem('refresh_token') };
    try {
      const response = await SuperFetch.post(fetchUrl, authorization, fetchData);
      if (response.status !== 200) throw Error();
      localStorage.setItem('access_token', response.data.access);
    } catch {
      Notification('warning', 'You have to log in once again');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
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
