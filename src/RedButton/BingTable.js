import React from "react";
import { useAuth0 } from "./auth0-spa";


const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <img src={ user.picture } alt="Profile" />

      <h2>{ user.name }</h2>
      <p>{ user.email }</p>
      <code>{ JSON.stringify(user, null, 2) }</code>
    </>
  );
};

export default function BingTable() {
  const { isAuthenticated, loginWithRedirect, logout, getTokenSilently } = useAuth0();

  if (isAuthenticated)
    getTokenSilently().then(r => console.dir(r));

  return (
    <>
      { !isAuthenticated && <button onClick={ () => loginWithRedirect({}) }>Log in</button> }
      { isAuthenticated && <button onClick={ () => logout() }>Log out</button> }
      <Profile />
    </>
  )
}