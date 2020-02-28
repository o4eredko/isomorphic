import React from "react";
import { Table } from "antd";
import TableWrapper from "src/ui/Table";

// import EditableCell from "src/ui/Table/EditableCell";


const readOnlyValues = [
  "updated_at",
  "created_at",
  "sql_id",
];


const ignoreParams = [
  "stopWords",
];


const renderValueColumns = (value, record, index) => {
  if (readOnlyValues.includes(record.key)) {
    return value;
  }
  return (<div></div>
    // <EditableCell
    //   index={ index }
    //   columnsKey={ record.key }
    //   value={ value }
    //   onChange={ () => {
    //   } }
    // />
  );
};


const createDataSource = (params) => {
  // return [{ key: 1, value: 123 }]
  return Object.entries(params)
    .filter(([param, value]) => (!ignoreParams.includes(param)))
    .map(([param, value]) => ({ "key": param, "value": value }));
};


export const SettingsParamsView = (props) => {
  const { params } = props;
  const dataSource = createDataSource(params);

  return (
    <TableWrapper
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
        // render={ renderValueColumns }
      />
    </TableWrapper>
  );
};
