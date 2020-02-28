import React from "react";
import { Form } from "antd";
import Button from "src/ui/Button";
import Input from "src/ui/Input";


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
      { editable ? (
        <div>
          <Form onSubmit={ save } style={ { width: "60%" } }>
            <Form.Item onBlur={ discard }>
              <Button
                className="isoDeleteBtn"
                icon="save"
                type="default"
                onMouseDown={ save }
              />
              <Input value={ changedValue } onChange={ handleChangeInput } onPressEnter={ save }
                     autoFocus />
            </Form.Item>
          </Form>
        </div>
      ) : (
        <p className="isoDataWrapper">
          <Button
            className="isoEditBtn"
            icon="edit"
            type="default"
            onClick={ edit }
          />
          { props.value || " " }
        </p>
      ) }
    </div>
  );
};

export default EditableCell;
