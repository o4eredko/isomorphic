import React from "react";
import { connect } from "react-redux";

import Tabs, { TabPane } from "isolib/components/uielements/tabs";
import Button from "isolib/components/uielements/button";

import { SettingsParamsView } from "./ParamsTab";
import QueryTab from "./QueryTab";
import drawerActions from "src/Drawer/redux/drawer/actions";
import { Drawer } from "antd";


const SettingsArea = (
  { params, drawerVisibility, toggleDrawer }
) => {
  const addButton = (
    <Button
      type="primary"
      icon="plus"
      onClick={ () => toggleDrawer(true) }
    >
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
          { params && <SettingsParamsView params={ params } /> }
        </TabPane>
        <TabPane key="query" tab="Query">
          <QueryTab />
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
        Hello world
      </Drawer>
    </>
  );
};


const mapStateToProps = (state) => {
  const { selectedSettingsItem } = state.googleCrafter;
  console.log("selectedSettingsItem", selectedSettingsItem)

  return {
    params: selectedSettingsItem,
    drawerVisibility: state.drawer.drawerVisibility,
  };
};


const mapDispatchToProps = (dispatch) => {
  const DRAWER_TYPE = "ADD_SETTINGS_ITEM_DRAWER";

  return {
    toggleDrawer: show => dispatch(show
      ? drawerActions.openDrawer({ drawerType: DRAWER_TYPE })
      : drawerActions.closeDrawer()
    )
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsArea);
