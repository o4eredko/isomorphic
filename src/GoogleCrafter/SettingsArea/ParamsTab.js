import React from "react";
import Table from "src/ui/Table";
import Input from "src/ui/Input";
import { Form } from "antd";
import Button from "src/ui/Button";



const readOnlyValues = [
  "id",
  "updated_at",
  "created_at",
  "sql_id",
];


const ignoreParams = [
  "stopWords",
];


const EditableCell = (props) => {
  const initialState = {
    changedValue: "",
    editable: false,
  };
  const [state, setState] = React.useState(initialState);

  const handleChangeInput = (event) => {
    const value = event.target.value;
    setState({ ...state, changedValue: value });
  };

  const save = () => {
    setState({ ...state, editable: false });
    if (props.onChange) {
      props.onChange(props.columnsKey, state.changedValue);
    }
    discard();
  };

  const discard = () => {
    setState(initialState);
  };

  const edit = () => {
    setState({ ...state, changedValue: props.value, editable: true });
  };

  const { changedValue, editable } = state;
  return (
    <div>
      {editable ? (
        <div>
          <Form onSubmit={save} style={ {width: "60%"} }>
            <Form.Item onBlur={discard}>
              <Button
                className="isoDeleteBtn"
                icon="save"
                type="default"
                onMouseDown={save}
              />
              <Input value={changedValue} onChange={handleChangeInput} onPressEnter={save} autoFocus/>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <p className="isoDataWrapper">
          <Button
            className="isoEditBtn"
            icon="edit"
            type="default"
            onClick={edit}
          />
          {props.value || ' '}
        </p>
      )}
    </div>
  );
};


const renderValueColumns = (value, record, index, onChange) => {
  if (readOnlyValues.includes(record.key)) {
    return value;
  }

  return (
    <EditableCell
      index={index}
      columnsKey={record.key}
      value={value}
      onChange={onChange}
    />
  );
};


const createDataSource = (params) => {
  return Object.entries(params)
    .filter(([param, value]) => (!ignoreParams.includes(param)))
    .map(([param, value]) => ({"key": param, "value":  value}));
};


export const SettingsParamsView = (props) => {
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
        render={(...args) => renderValueColumns(...args, onChange)}
      />
    </Table>
  );
};
