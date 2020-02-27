import io         from "socket.io-client";
import config     from "@iso/config/feedmaker.config";
import authHelper from "@iso/lib/helpers/authHelper";

async function getToken() {
  try {
    authHelper.checkExpiration(localStorage.getItem("access_token"));
  } catch {
    if (!(await authHelper.refreshToken()))
      throw Error("Cannot connect to WS");
  }
  return localStorage.getItem("access_token");
}


export default async function socketConnect() {
  const socket = io(config.apiUrl, {
    query: { token: await getToken() }
  });
  socket.on('reconnect_attempt', async () => {
    socket.io.opts.query = { token: await getToken() }
  });
  return socket;
}
