import io         from "socket.io-client";
import config     from "@iso/config/feedmaker.config";
import authHelper from "@iso/lib/helpers/authHelper";


export default async function socketConnect() {
  try {
    authHelper.checkExpiration(localStorage.getItem("access_token"));
  } catch {
    if (!(await authHelper.refreshToken()))
      throw Error("Cannot connect to WS");
  }
  const access_token = localStorage.getItem("access_token");
  const socketOptions = {
    transportOptions: {
      polling: {
        extraHeaders: { "Authorization": `Bearer ${ access_token }` }
      }
    }
  };
  return io(config.apiUrl, socketOptions);
}
