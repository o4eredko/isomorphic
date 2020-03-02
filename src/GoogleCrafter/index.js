import React, { useEffect } from "react";
import { connect } from "react-redux";

import actions from "./redux/actions";

import SettingsArea from "src/GoogleCrafter/containers/SettingsArea";
import SettingsList from "src/GoogleCrafter/containers/SettingsList";

import GoogleCrafterWrapper from "src/GoogleCrafter/css/GoogleCrafter.styles";
import config from "src/config/googleCrafter.config";
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
      </GoogleCrafterWrapper>
    </Spin>
  )
}


const mapDispatchToProps = dispatch => ({
  loadSettings: url => dispatch(actions.loadSettings(url))
});


const mapStateToProps = state => ({
  isLoading: state.googleCrafter.isLoading,
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
