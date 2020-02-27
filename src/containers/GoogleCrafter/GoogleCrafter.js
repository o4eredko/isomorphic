import React, { useEffect } from "react";
import { connect } from "react-redux";

import GoogleCrafterWrapper from "src/containers/GoogleCrafter/GoogleCrafter.styles";

import actions from "src/redux/googleCrafter/actions";
import SettingsArea from "src/containers/GoogleCrafter/SettingsArea";
import SettingsList from "src/containers/GoogleCrafter/SettingsList";

import config from "src/config/googleCrafter.config";


function GoogleCrafter(props) {
  const { loadSettings } = props;

  useEffect(() => {
    loadSettings(config.settingsUrl);
  }, [loadSettings]);

  return (
    <GoogleCrafterWrapper className="isomorphicNoteComponent">
      <div style={ { width: "340px" } } className="isoNoteListSidebar">
        <SettingsList />
      </div>
      <SettingsArea />
    </GoogleCrafterWrapper>
  )
}

const mapDispatchToProps = dispatch => ({
  loadSettings: url => dispatch(actions.loadSettings(url))
});

export default connect(null, mapDispatchToProps)(GoogleCrafter);
