import jwtDecode from "jwt-decode";
import Notification from "src/ui/Notification";
import SuperFetch from "src/lib/helpers/superFetch";

import jwtConfig from "src/Authorization/jwt.config.js";


class AuthHelper {
  refreshToken = async () => {
    const fetchUrl = `${ jwtConfig.fetchUrl }/refresh/`;
    const authorization = false;
    const fetchData = { refresh: localStorage.getItem("refresh_token") };
    try {
      const response = await SuperFetch.post(fetchUrl, authorization, fetchData);
      if (response.status !== 200) throw Error();
      localStorage.setItem("access_token", response.data.access);
      return true
    } catch {
      Notification("warning", "You have to log in once again");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return false
    }
  };

  checkExpiration = token => {
    if (!token) throw Error("Username and password do not match");
    const profile = jwtDecode(token);

    const expiredAt = profile.expiredAt || profile.exp * 1000;
    if (expiredAt > new Date().getTime()) {
      return {
        ...profile,
        token,
        expiredAt: new Date(expiredAt),
      };
    } else {
      throw Error("Token expired");
    }
  };
}

export default new AuthHelper();
