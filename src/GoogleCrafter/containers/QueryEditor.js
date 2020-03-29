import { connect } from "react-redux";

import QueryEditor from "src/GoogleCrafter/components/QueryEditor";
import settingsActions from "../redux/settings/actions";


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
