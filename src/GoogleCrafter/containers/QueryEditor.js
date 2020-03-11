import React from "react";

import { connect } from "react-redux";

import settingsActions from "src/GoogleCrafter/redux/settings/actions";
import QueryEditor from "src/GoogleCrafter/components/QueryEditor";


function mapStateToProps({ googleCrafter }) {
  const { selectedSettingsItem, sqlMap } = googleCrafter.settings;
  const sqlId = selectedSettingsItem && selectedSettingsItem["sql_id"];
  const selectedSql = sqlId ? sqlMap[sqlId] : "";

  return { sql: selectedSql };
}

function mapDispatchToProps(dispatch) {
  return {
    onSave: (sql) => dispatch(settingsActions.updateSql(sql)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueryEditor);
