import React from "react";

import Table from "src/ui/Table";
import Scrollbars from "src/utility/customScrollBar";

import {
  createDataSource, CancelButton, DisplayCell,
  EditButton, InputCell, SaveButton
} from "src/GoogleCrafter/utils/ParamsEditorUtils";


const ParamsEditor = ({ params, onChangeValueCell }) => {
  const dataSource = createDataSource(params);
  const [editable, setEditable] = React.useState(null);
  const inputRef = React.createRef();

  const discardEditable = () => setEditable(null);
  const handleEdit = (key) => setEditable(key);
  const getInput = () => inputRef.current.input.value.trim();
  const handleSave = (key) => onChangeValueCell(key, getInput());

  React.useEffect(discardEditable, [params]);

  const renderValueColumns = (value, record) => {
    if (editable !== record.key) {
      return <DisplayCell value={ value } />;
    }

    return (
      <InputCell
        value={ value }
        inputRef={ inputRef }
        onSave={ handleSave.bind(null, record.key) }
      />
    );
  };


  const renderButtonColumns = (value, record) => {
    if (record.readOnly) {
      return;
    }

    if (editable !== record.key) {
      return <EditButton onEdit={ handleEdit.bind(this, record.key) }/>;
    }

    return (
      <React.Fragment>
        <CancelButton onCancel={ discardEditable }/>
        <SaveButton onSave={ handleSave.bind(null, record.key) }/>
      </React.Fragment>
    );
  };

  return (
    <Scrollbars style={ { height: "calc(100vh - 240px)" } }>
      <Table
        pagination={ false }
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
          render={ renderValueColumns }
        />
        <Table.Column
          className="crafterButtonCell"
          key="buttons"
          render={ renderButtonColumns }
        />
      </Table>
    </Scrollbars>
  );
};


export default ParamsEditor;
