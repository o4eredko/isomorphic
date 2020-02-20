import io         from "socket.io-client";
import config     from "@iso/config/feedmaker.config";
import authHelper from "@iso/lib/helpers/authHelper";


export default async function socketConnect() {
  const access_token = localStorage.getItem("access_token");
  const socketOptions = {
    transportOptions: {
      polling: {
        extraHeaders: { "Authorization": `Bearer ${ access_token }` }
      }
    }
  };
  try {
    authHelper.checkExpiration(access_token);
  } catch {
    await authHelper.refreshToken();
  }
  return io(config.apiUrl, socketOptions);
}
