import React from "react";

import Button from "src/ui/Button";
import Input from "src/ui/Input";


const readOnlyParams = [
  "id",
  "updated_at",
  "created_at",
  "sql_id",
];


const ignoredParams = [
  "stopWords",
];


const createDataSource = (params) => {
  return Object.entries(params)
    .filter(([param, value]) => (!ignoredParams.includes(param)))
    .map(([param, value]) => ({
      "key": param,
      "value": value,
      "readOnly": readOnlyParams.includes(param)
    }));
};


const InputCell = ({ value, inputRef, onSave }) => {
  const [input, setInput] = React.useState(null);
  React.useEffect(() => setInput(value), [value]);

  return (
    <Input
      value={ input }
      onChange={ (e) => setInput(e.target.value) }
      ref={ inputRef }
      onPressEnter={ onSave }
      autoFocus
    />
  );
};


const DisplayCell = ({ value }) => {
  return (
    <p className="isoDataWrapper">
      { value || " " }
    </p>
  );
};


const CancelButton = ({ onCancel }) => {
  return (
    <Button
      className="crafterEditableCellBtn"
      type="default"
      onClick={ onCancel }
    >
      <i className="ion-ios-undo" />
    </Button>
  );
};


const SaveButton = ({ onSave }) => {
  return (
    <Button
      className="crafterEditableCellBtn"
      type="default"
      onClick={ onSave }
    >
      <i className="ion-android-done-all" />
    </Button>
  );
};


const EditButton = ({ onEdit }) => {
  return (
    <Button
      className="crafterEditableCellBtn"
      icon="edit"
      type="default"
      onClick={ onEdit }
    />
  );
};


export { createDataSource, DisplayCell, InputCell, EditButton, SaveButton, CancelButton };
