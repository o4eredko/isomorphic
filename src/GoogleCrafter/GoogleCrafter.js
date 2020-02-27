import React, { useEffect } from "react";
import { connect } from "react-redux";

import actions from "./redux/actions";

import SettingsArea from "./SettingsArea";
import SettingsList from "./SettingsList";

import GoogleCrafterWrapper from "src/GoogleCrafter/GoogleCrafter.styles";
import config from "src/config/googleCrafter.config";


function GoogleCrafter(props) {
  const { loadSettings } = props;

  useEffect(() => {
    loadSettings(config.settingsUrl);
  }, [loadSettings]);

  return (
    <GoogleCrafterWrapper className="googleCrafter">
      <SettingsList />
      <SettingsArea />
    </GoogleCrafterWrapper>
  )
}

const mapDispatchToProps = dispatch => ({
  loadSettings: url => dispatch(actions.loadSettings(url))
});

export default connect(null, mapDispatchToProps)(GoogleCrafter);
