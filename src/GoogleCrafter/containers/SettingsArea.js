import React from "react";

import { connect } from "react-redux";
import drawerActions from "src/Drawer/redux/drawer/actions";
import settingsActions from "src/GoogleCrafter/redux/settings/actions";

import Tabs, { TabPane } from "src/ui/Tabs";

import Button from "src/ui/Button";
import { Drawer } from "antd";
import ParamsEditor from "src/GoogleCrafter/components/ParamsEditor";
import QueryEditor from "src/GoogleCrafter/containers/QueryEditor";


const SettingsArea = (
  { params, onChangeValueCell, drawerVisibility, toggleDrawer }
) => {
  const addButton = (
    <Button type="primary" icon="plus" onClick={ () => toggleDrawer(true) }>
      Add settings item
    </Button>
  );

  return (
    <>
      <Tabs
        style={ { width: "100%", backgroundColor: "white", padding: "10px" } }
        tabBarExtraContent={ addButton }
      >
        <TabPane key="params" tab="Parameters">
          { params && <ParamsEditor onChangeValueCell={ onChangeValueCell } params={ params } /> }
        </TabPane>
        <TabPane key="query" tab="Query">
          <QueryEditor />
        </TabPane>
      </Tabs>
      <Drawer
        placement="right"
        closable={ true }
        onClose={ () => toggleDrawer(false) }
        visible={ drawerVisibility }
        width={ 700 }
        destroyOnClose={ true }
      >

      </Drawer>
    </>
  );
};


const mapStateToProps = (state) => {
  const { selectedSettingsItem } = state.googleCrafter.settings;

  return {
    params: selectedSettingsItem || {},
    drawerVisibility: state.drawer.drawerVisibility,
  };
};


const mapDispatchToProps = (dispatch) => {
  const DRAWER_TYPE = "ADD_SETTINGS_ITEM_DRAWER";

  return {
    toggleDrawer: show => dispatch(show
      ? drawerActions.openDrawer({ drawerType: DRAWER_TYPE })
      : drawerActions.closeDrawer()
    ),
    onChangeValueCell: (key, value) => {
      dispatch(settingsActions.updateSelectedItem(key, value))
    },
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsArea);