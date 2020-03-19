import React from "react";
import { useLocation } from "react-router";


export default function BingTable() {
  const location = useLocation();
  const url =
    "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?" +
    "client_id=6a18e453-8652-442b-9733-913913cc6a6a&" +
    "scope=https://ads.microsoft.com/ads.manage offline_access&" +
    "response_type=code&" +
    "redirect_uri=http://localhost:3000/dashboard/red-button";

  // https://login.microsoftonline.com/common/oauth2/v2.0/authorize?
  // client_id=6a18e453-8652-442b-9733-913913cc6a6a&
  // scope=https%3A%2F%2Fads.microsoft.com%2Fads.manage%20offline_access&
  // response_type=code&
  // redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard%2Fcallback

  return (
    <>
      <a href={ url }>Click</a>
      {/*<iframe title="microsoft" src={ url2 } />*/ }
    </>
  )
}