import React from "react";
import { connect } from "react-redux";

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

function QueryEditor({ sql }) {
  const [code, updateCode] = React.useState(sql);

  return (
    <Layout style={ { backgroundColor: "white", padding: "0 15px" } }>
      <Layout.Header style={ headerStyles }>
        <BoxTitle title="Type in your SQL:" />
        <Button type="danger" icon="accept">Apply Changes</Button>
      </Layout.Header>
      <CodeMirror
        value={ code }
        onChange={ value => updateCode(value) }
        options={ basicOptions }
      />
    </Layout>
  );
}

function mapStateToProps({ googleCrafter }) {
  const { selectedSettingsItem, sql } = googleCrafter;
  const sqlId = selectedSettingsItem && selectedSettingsItem["sql_id"];
  const selectedSql = sqlId ? sql[sqlId] : "";

  return { sql: selectedSql };
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueryEditor);
