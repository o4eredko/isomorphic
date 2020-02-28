import React from "react";
import { connect } from "react-redux";
import { Drawer, Layout } from "antd";
import drawerActions from "src/Drawer/redux/drawer/actions";
import { Wrapper, TopBar, Heading } from "src/GoogleCrafter/css/AddSettingsItem.style";


const { Header, Content } = Layout;

function AddSettingsItem({ drawerVisibility, toggleDrawer }) {
  return (
    <Drawer
      placement="right"
      closable={ true }
      onClose={ () => toggleDrawer(false) }
      visible={ drawerVisibility }
      width={ 700 }
      destroyOnClose={ true }
    >
      <Wrapper>
        <TopBar>
          <Heading>Title</Heading>

        </TopBar>
      </Wrapper>
    </Drawer>
  )
}

function mapStateToProps({ drawer }) {
  return {
    drawerVisibility: drawer.drawerVisibility,
  };
};

function mapDispatchToProps(dispatch) {
  const DRAWER_TYPE = "ADD_SETTINGS_ITEM_DRAWER";

  return {
    toggleDrawer: show => dispatch(show
      ? drawerActions.openDrawer({ drawerType: DRAWER_TYPE })
      : drawerActions.closeDrawer()
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSettingsItem);
