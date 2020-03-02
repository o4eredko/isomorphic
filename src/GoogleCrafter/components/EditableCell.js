import React from "react";
import Button from "src/ui/Button";
import Input from "src/ui/Input";


const EditableCell = (props) => {
  const initialState = {changedValue: "", editable: false};
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

  if (state.editable) {
    return (
      <>
        <Input
          value={ state.changedValue }
          onChange={ handleChangeInput }
          onPressEnter={ save }
          autoFocus
          onBlur={ discard }
        />
        {/*<Button*/}
        {/*  className="crafterEditableCellBtn"*/}
        {/*  icon="save"*/}
        {/*  type="default"*/}
        {/*  onMouseDown={ save }*/}
        {/*/>*/}
      </>
    );
  }

  return (
    <p className="isoDataWrapper">
      { props.value || " " }
      {/*<Button*/}
      {/*  className="crafterEditableCellBtn"*/}
      {/*  icon="edit"*/}
      {/*  type="default"*/}
      {/*  onClick={ edit }*/}
      {/*/>*/}
    </p>
  );
};

export default EditableCell;
