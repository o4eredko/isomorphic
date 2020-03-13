import { connect } from "react-redux";

import QueryEditor from "src/GoogleCrafter/components/QueryEditor";


function mapStateToProps({ googleCrafter }) {
  const { selectedSettingsItem, sqlMap } = googleCrafter.settings;
  const sqlId = selectedSettingsItem && selectedSettingsItem["sql_id"];
  const selectedSql = sqlId ? sqlMap[sqlId] : "";

  return { sql: selectedSql };
}

export default connect(mapStateToProps)(QueryEditor);
