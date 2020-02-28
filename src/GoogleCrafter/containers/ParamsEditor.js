import React from "react";

import Table from "src/ui/Table";
import EditableCell from "src/GoogleCrafter/components/EditableCell";


const readOnlyValues = [
  "id",
  "updated_at",
  "created_at",
  "sql_id",
];


const ignoreParams = [
  "stopWords",
];


const renderValueColumns = (value, record, index, onChange) => {
  if (readOnlyValues.includes(record.key)) {
    return value;
  }

  return (
    <EditableCell
      index={ index }
      columnsKey={ record.key }
      value={ value }
      onChange={ onChange }
    />
  );
};


const createDataSource = (params) => {
  return Object.entries(params)
    .filter(([param, value]) => (!ignoreParams.includes(param)))
    .map(([param, value]) => ({ "key": param, "value": value }));
};


const ParamsEditor = (props) => {
  const { params, onChange } = props;
  const dataSource = createDataSource(params);

  return (
    <Table
      pagination={ false }
      scroll={ { y: "calc(100vh - 290px)" } }
      dataSource={ dataSource }
    >
      <Table.Column
        title="Parameter"
        dataIndex="key"
        key="paramNames"
        width={ "20%" }
      />
      <Table.Column
        title="Value"
        dataIndex="value"
        key="paramValues"
        render={ (...args) => renderValueColumns(...args, onChange) }
      />
    </Table>
  );
};

export default ParamsEditor;
