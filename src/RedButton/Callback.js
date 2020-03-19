import React from "react";
import { useLocation } from "react-router";


export default function Callback() {
  const location = useLocation();
  console.log("From iframe:");
  console.dir(location);
  return <div>Hello from Iframe</div>;
}