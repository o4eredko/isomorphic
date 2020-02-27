import React from "react";
import { connect } from "react-redux";
import { Layout } from "antd";

import "codemirror/mode/sql/sql";
import "codemirror/theme/zenburn.css";
import { Title } from "./Title.styles";

import CodeMirror from "./CodeMirror.styles";


const { Content } = Layout;
const basicOptions = {
  lineNumbers: true,
  readOnly: false,
  tabSize: 4,
  mode: "sql",
  theme: "zenburn",
};

function QueryTab({ sql }) {
  const [code, updateCode] = React.useState(sql);

  return (
    <Layout style={ { backgroundColor: "white", padding: 15 } }>
      <Title>
        Type in your SQL:
      </Title>
      <Content>
        <CodeMirror
          value={ code }
          onChange={ value => updateCode(value) }
          options={ basicOptions }
        />
      </Content>
    </Layout>
  );
}

export default connect(state => {
  const { selectedSettingsItem, sql } = state.googleCrafter;
  const sqlId = selectedSettingsItem["sql_id"];
  const selectedSql = sqlId ? sql[sqlId] : "";
  console.log(selectedSql);
  return { sql: selectedSql };
})(QueryTab);
