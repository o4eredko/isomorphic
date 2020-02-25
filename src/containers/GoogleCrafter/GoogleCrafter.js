import React, { useEffect, useState } from "react";
import SuperFetch from "@iso/lib/helpers/superFetch";
import config from "@iso/config/googleCrafter.config";
import Notes from "./notes/Note";

export default function GoogleCrafter() {
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    async function initData() {
      // const { data, status } = await SuperFetch.get(config.settingsUrl);
      // if (status !== 200) {
      //   return console.warn("NA PIDLOHU BLET RUKI ZA HOLOVY");
      // }
      // setSettings(data);
    }
    initData();
  }, []);
  console.dir(settings);
  return <Notes />;
}
