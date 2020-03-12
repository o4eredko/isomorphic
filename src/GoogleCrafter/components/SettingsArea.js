import React from "react";

import Tabs, { TabPane } from "src/ui/Tabs";
import Button from "src/ui/Button";
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
    </>
  );
};


export default SettingsArea;
