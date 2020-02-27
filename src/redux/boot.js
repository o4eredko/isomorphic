import { store } from "./store";
import authActions from "src/Authorization/redux/actions";


export default () =>
  new Promise(() => {
    store.dispatch(authActions.checkAuthorization());
  });
