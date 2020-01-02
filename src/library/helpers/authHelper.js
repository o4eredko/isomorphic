import jwtDecode  from 'jwt-decode';
import SuperFetch from './superFetch';

class AuthHelper {
  login = userInfo => {
    if (!userInfo.username || !userInfo.password) {
      return { error: 'please fill in the input' };
    }
    return SuperFetch.post('login/', userInfo).then(response =>
      this.checkExpiration(response.data.access)
    );
  };

  async checkDemoPage(token) {
    if (this.checkExpiration(token).error) {
      return { error: 'Token expired' };
    }
    return await SuperFetch.get('secret/test', { token })
      .then(response => ({
        status: '200',
        message: 'Success',
      }))
      .catch(error => ({ error: JSON.stringify(error) }));
  }

  checkExpiration = token => {
    if (!token) {
      return { error: 'Username and password do not match' };
    }
    try {
      const profile = jwtDecode(token);

      const expiredAt = profile.expiredAt || profile.exp * 1000;

      if (expiredAt > new Date().getTime()) {
        return {
          ...profile,
          token,
          expiredAt: new Date(expiredAt),
        };
      } else {
        return { error: 'Token expired' };
      }
    } catch (e) {
      console.log(e);

      return { error: 'Server Error' };
    }
  };
}

export default new AuthHelper();
