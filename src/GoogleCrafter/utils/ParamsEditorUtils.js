import React from "react";

import Button from "src/ui/Button";

import EditableCell from "src/GoogleCrafter/components/EditableCell";
import Input from "../../ui/Input";


const readOnlyParams = [
  "id",
  "updated_at",
  "created_at",
  "sql_id",
];


const ignoredParams = [
  "stopWords",
];


const renderValueColumns = (value, record, index, state, handleInputChange) => {
  if (record.readOnly) {
    return value;
  }

  if (state[record.key].editable) {
    const value = state[record.key].value;
    return (
      <Input
        value={ value }
        onChange={ (e) => handleInputChange(record.key, e.target.value) }
        // onPressEnter={ save }
        autoFocus
        // onBlur={ discard }
      />
    );
  }

  return (
    <p className="isoDataWrapper">
      { state[record.key].value || " " }
    </p>
  );
};


const renderButtonColumns = (value, record, index, state, onClick, onSave) => {
  if (record.readOnly) {
    return;
  }

  if (state[record.key].editable) {
    return (
      <Button
        className="crafterEditableCellBtn"
        icon="save"
        type="default"
        onClick={ () => {
          onSave(record.key);
          onClick(record.key);
        }}
      />
    );
  }

  return (
    <Button
      className="crafterEditableCellBtn"
      icon="edit"
      type="default"
      onClick={ () => onClick(record.key) }
    />
  );
};


const createDataSource = (params) => {
  return Object.entries(params)
    .filter(([param, value]) => (!ignoredParams.includes(param)))
    .map(([param, value]) => ({
      "key": param,
      "value": value,
      "readOnly": readOnlyParams.includes(param)
    }));
};


const createInitialState = (dataSource) => {
  const state = {};
  for (const field of dataSource) {
    const { key, value, readOnly } = field;
    if (!readOnly) {
      state[key] = { value, editable: false };
    }
  }
  return state;
};


export { renderValueColumns, renderButtonColumns, createDataSource, createInitialState };
