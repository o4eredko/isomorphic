// React imports
import React from "react";
// UI components
import { Drawer } from "antd";
import BoxTitle from "src/utility/boxTitle";
import CodeMirror from "src/ui/CodeMirror";
import AddItemForm from "src/GoogleCrafter/components/AddItemForm";
import AddItemSteps from "src/GoogleCrafter/components/AddItemSteps";
import AddItemResult from "src/GoogleCrafter/components/AddItemResult";
// Assets
import { Wrapper, TopBar, ContentWrapper } from "src/GoogleCrafter/css/AddSettingsItem.style";
import { IconSvg } from "src/GoogleCrafter/IconSvg";
import ArrowIcon from "src/assets/images/icon/04-icon.svg"


function AddSettingsItem(
  {
    drawerVisibility, toggleDrawer,
    step, setStep,
    sql, setSql,
    setFormData,
    uploadToServer,
    uploadStatus,
    resetSteps
  }) {
  const formRef = React.createRef();

  const nextStep = () => setStep(step + 1);

  function submitSecondStep() {
    formRef.current.validateFields((err, values) => {
      if (err) return;
      setFormData(values);
      uploadToServer();
      nextStep();
    })
  }

  function resetAll() {
    resetSteps();
    formRef.current.resetFields();
  }

  return (
    <Drawer
      placement="right"
      closable={ false }
      onClose={ () => toggleDrawer(false) }
      visible={ drawerVisibility }
      width={ "60%" }
      destroyOnClose={ true }
    >
      <Wrapper>
        <TopBar>
          <IconSvg
            src={ ArrowIcon }
            border="none"
            padding={ 0 }
            alt="Arrow Icon"
            style={ { transform: "rotateY(180deg)" } }
            onClick={ () => toggleDrawer(false) }
          />
          Add Settings Item
        </TopBar>
        <ContentWrapper>

          { !step && (<>
            <BoxTitle title="Type your SQL here:" />
            <CodeMirror
              value={ sql }
              onBeforeChange={ (editor, data, value) => setSql(value) }
            />
          </>) }

          <AddItemForm hidden={ step !== 1 } ref={ formRef } />

          { step === 2 && (
            <AddItemResult
              status={ uploadStatus }
              firstStep={ () => setStep(0) }
              resetAll={ resetAll }
            />
          ) }

        </ContentWrapper>
        <AddItemSteps
          step={ step } setStep={ setStep }
          submitStep={ [nextStep, submitSecondStep] }
        />
      </Wrapper>
    </Drawer>
  )
}


export default AddSettingsItem;
