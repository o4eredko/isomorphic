import React from "react";
import { Layout } from "antd";

import CodeMirror from "src/ui/CodeMirror";
import BoxTitle from "src/utility/boxTitle";
import Button from "src/ui/Button";


const headerStyles = {
  padding: 0,
  backgroundColor: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};


const QueryEditor = ({ sql, onSave }) => {
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
        onBeforeChange={(editor, data, value) => updateCode(value) }
      />
    </Layout>
  );
};


export default QueryEditor;
