import React, { useEffect } from "react";
import { connect } from "react-redux";
import actions from "src/redux/googleCrafter/actions";
import { Layout } from "antd";
import SettingsArea         from "src/containers/GoogleCrafter/SettingsArea";
import SettingsList from "src/containers/GoogleCrafter/SettingsList";
import GoogleCrafterWrapper from "src/containers/GoogleCrafter/GoogleCrafter.styles";


const { Header, Content } = Layout;

function GoogleCrafter({ loadSettings }) {

  useEffect(() => {
    loadSettings()
  }, [loadSettings]);

  return (
    <GoogleCrafterWrapper className="isomorphicNoteComponent">
      <div style={ { width: "340px" } } className="isoNoteListSidebar">
        <SettingsList />
      </div>
      <Layout className="isoNotepadWrapper">
        <Header className="isoHeader">
          Header
        </Header>
        <Content className="isoNoteEditingArea">
          <SettingsArea />
        </Content>
      </Layout>
    </GoogleCrafterWrapper>
  )
}

const mapDispatchToProps = dispatch => ({
  loadSettings: () => dispatch(actions.loadSettings())
});

export default connect(null, mapDispatchToProps)(GoogleCrafter);
