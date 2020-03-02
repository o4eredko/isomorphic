import React from "react";

import Table from "src/ui/Table";
import {
  renderValueColumns,
  renderButtonColumns,
  createDataSource,
  createInitialState
} from "src/GoogleCrafter/utils/ParamsEditorUtils";


const ParamsEditor = (props) => {
  const { params, onChangeValueCell } = props;
  const dataSource = createDataSource(params);
  // const initialState = createInitialState(dataSource);
  const [state, setState] = React.useState({ editableId: null });


  const toggleEditable = (key) => {
    setState({ editableId:  });
    // const rowState = state[key];
    // setState({ ...state, [key]: { ...rowState, editable: !rowState.editable } });
  };

  const saveRow = (key) => {
    onChangeValueCell(key, state[key].value);
  };

  const changeValue = (key, newValue) => {
    const rowState = state[key];
    setState({ ...state, [key]: { ...rowState, value: newValue } });
  };

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
        width={ "30%" }
      />
      <Table.Column
        className="crafterEditableCell"
        title="Value"
        dataIndex="value"
        key="paramValues"
        render={ (...args) => renderValueColumns(...args, state, changeValue) }
      />
      <Table.Column
        key="buttons"
        render={ (...args) => renderButtonColumns(...args, state, toggleEditable, saveRow) }
      />
    </Table>
  );
};

export default ParamsEditor;
