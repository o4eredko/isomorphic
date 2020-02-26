import React from "react";
import { connect } from "react-redux";
import Tabs, { TabPane }  from "src/components/uielements/tabs";
import Params from "./ParamsTab";
import QueryTab from "./QueryTab";


const SettingsArea = (props) => {
  const { params } = props;
  console.log("params", params);

  return (
    <Tabs>
      <TabPane key="params" tab="Parameters">
        {params && <Params params={params} />}
      </TabPane>
      <TabPane  key="query" tab="Query">
        <QueryTab />
      </TabPane>
    </Tabs>
  );
};


const mapStateToProps = (state) => {
  const { selectedId, settings } = state.googleCrafter;
  const [params] = settings.filter(s => s.id === selectedId);

  return {
    params,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {

  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsArea);
