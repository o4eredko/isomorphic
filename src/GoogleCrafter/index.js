import React, { useEffect } from "react";
import { connect } from "react-redux";

import actions from "./redux/actions";

import SettingsArea from "./containers/SettingsArea";
import SettingsList from "./containers/SettingsList";
import AddSettingsItem from "./containers/AddSettingsItem";

import GoogleCrafterWrapper from "./css/GoogleCrafter.styles";
import config from "./config/googleCrafter.config";


function Index(props) {
  const { loadSettings } = props;

  useEffect(() => {
    loadSettings(config.settingsUrl);
  }, [loadSettings]);

  return (
    <GoogleCrafterWrapper className="googleCrafter">
      <SettingsList />
      <SettingsArea />
      <AddSettingsItem />
    </GoogleCrafterWrapper>
  )
}

const mapDispatchToProps = dispatch => ({
  loadSettings: url => dispatch(actions.loadSettings(url))
});

export default connect(null, mapDispatchToProps)(Index);
