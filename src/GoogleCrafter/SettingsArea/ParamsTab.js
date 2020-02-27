import React from "react";
import TableWrapper from "./AntTables.styles";
import Table from "src/components/uielements/table";
import Input from "src/components/uielements/input";
import {Icon} from "antd";
import Form from "src/components/uielements/form";


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
    changedValue: props.value,
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
  };

  const discard = () => {
    setState(initialState);
  };

  const edit = () => {
    setState({ ...state, editable: true });
  };

  const { changedValue, editable } = state;
  return (
    <div className="isoEditData">
      {editable ? (
        <div className="isoEditDataWrapper">
          <Form onSubmit={save} style={ {width: "60%"} }>
            <Form.Item onBlur={discard}>
              <Icon type="check" className="isoEditIcon" onMouseDown={save} />
              {/*<Button icon="check" onClick={save} />*/}
              <Input value={changedValue} onChange={handleChangeInput} autoFocus/>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <p className="isoDataWrapper">
          <Icon type="edit" className="isoEditIcon" onClick={edit} />
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
        render={(...args) => renderValueColumns(...args, onChange)}
      />
    </TableWrapper>
  );
};
