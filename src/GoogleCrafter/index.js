import React, { useEffect } from "react";
import { connect } from "react-redux";

import actions from "./redux/actions";

import SettingsArea from "src/GoogleCrafter/containers/SettingsArea";
import SettingsList from "src/GoogleCrafter/containers/SettingsList";

import GoogleCrafterWrapper from "src/GoogleCrafter/css/GoogleCrafter.styles";
import config from "src/config/googleCrafter.config";


function Index(props) {
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

export default connect(null, mapDispatchToProps)(Index);
