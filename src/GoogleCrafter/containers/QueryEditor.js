import React from "react";

import { connect } from "react-redux";
import settingsActions from "src/GoogleCrafter/redux/settings/actions";

import { Layout } from "antd";
import CodeMirror from "src/ui/CodeMirror";
import BoxTitle from "src/utility/boxTitle";
import Button from "src/ui/Button";


const basicOptions = {
  lineNumbers: true,
  readOnly: false,
  tabSize: 4,
  mode: "sql",
  theme: "zenburn",
};
const headerStyles = {
  padding: 0,
  backgroundColor: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};


function QueryEditor({ sql, onSave }) {
  const [code, updateCode] = React.useState("");
  React.useEffect(() => updateCode(sql), [sql]);

  return (
    <Layout style={ { backgroundColor: "white", padding: "0 15px" } }>
      <Layout.Header style={ headerStyles }>
        <BoxTitle title="Type in your SQL:" />
        <Button type="danger" icon="accept" onClick={ onSave.bind(null, code) }>Apply Changes</Button>
      </Layout.Header>
      <CodeMirror
        value={ code }
        options={ basicOptions }
        onBeforeChange={(editor, data, value) => updateCode(value) }
      />
    </Layout>
  );
}

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
