import React, { useEffect } from "react";

import { connect } from "react-redux";
import settingsActions from "src/GoogleCrafter/redux/settings/actions";

import SettingsArea from "src/GoogleCrafter/containers/SettingsArea";
import SettingsList from "src/GoogleCrafter/containers/SettingsList";
import AddSettingsItem from "./containers/AddSettingsItem";


import GoogleCrafterWrapper from "src/GoogleCrafter/css/GoogleCrafter.styles";
import config from "src/GoogleCrafter/config/googleCrafter.config";
import { Spin } from "antd";


function Index(props) {
  const { loadSettings, isLoading } = props;

  useEffect(() => {
    loadSettings(config.settingsUrl);
  }, [loadSettings]);

  return (
    <Spin spinning={ isLoading }>
      <GoogleCrafterWrapper className="googleCrafter">
        <SettingsList />
        <SettingsArea />
        <AddSettingsItem />
      </GoogleCrafterWrapper>
    </Spin>
  )
}


const mapDispatchToProps = dispatch => ({
  loadSettings: url => dispatch(settingsActions.loadSettings(url))
});


const mapStateToProps = state => ({
  isLoading: state.googleCrafter.settings.isLoading,
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
