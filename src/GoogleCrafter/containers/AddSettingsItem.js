// React imports
import React from "react";
// Redux imports
import { connect } from "react-redux";
import drawerActions from "src/Drawer/redux/drawer/actions";
import crafterActions from "src/GoogleCrafter/redux/settings/actions";
// UI components
import { Drawer, Result } from "antd";
import BoxTitle from "src/utility/boxTitle";
import Button from "src/ui/Button";
import CodeMirror from "src/ui/CodeMirror";
import AddItemForm from "src/GoogleCrafter/containers/AddItemForm";
// Assets
import {
  Wrapper, TopBar, ContentWrapper, codeMirrorOptions
} from "src/GoogleCrafter/css/AddSettingsItem.style";
import { IconSvg } from "src/GoogleCrafter/IconSvg";
import ArrowIcon from "src/assets/images/icon/04-icon.svg"
import AddItemSteps from "src/GoogleCrafter/components/AddItemSteps";
import SuperFetch from "src/lib/helpers/superFetch";
import config from "src/GoogleCrafter/config/googleCrafter.config";


function AddSettingsItem(
  { drawerVisibility, toggleDrawer, submittedStep, uiStep, setSubmittedStep, setUIStep }
) {
  const [sql, updateSql] = React.useState("SELECT * FROM table;");
  const addItemFormRef = React.createRef();

  async function submitFirstStep() {
    const data = { name: "new_sql", value: sql };
    try {
      const resp = await SuperFetch.post(config.tipsUrl, false, data);
      console.dir(resp);
    } catch (err) {
      console.dir(err);
      return;
    }
    setSubmittedStep(1);
  }

  function submitSecondStep() {
    addItemFormRef.current.submitForm();
    setSubmittedStep(2);
  }

  function renderContent() {
    return [
      (<>
        <BoxTitle title="Type your SQL here:" />
        <CodeMirror
          value={ sql } options={ codeMirrorOptions }
          onChange={ value => updateSql(value) }
        />
      </>),
      <AddItemForm wrappedComponentRef={ addItemFormRef } />,
      (<Result
        status="success" title="Successfully Uploaded to server"
        subTitle="You can now create new generation from the following page"
        extra={ [<Button type="primary" key="uploaded">Create new Generation</Button>] }
      />)
    ][uiStep];
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
          { renderContent() }
        </ContentWrapper>
        <AddItemSteps
          step={ uiStep }
          setUIStep={ setUIStep }
          submitStep={ [submitFirstStep, submitSecondStep] }
        />
      </Wrapper>
    </Drawer>
  )
}

const mapStateToProps = ({ drawer, googleCrafter }) => (
  {
    drawerVisibility: drawer.drawerVisibility,
    submittedStep: googleCrafter.addItemSubmittedStep,
    uiStep: googleCrafter.addItemUIStep,
  }
);

function mapDispatchToProps(dispatch) {
  const DRAWER_TYPE = "ADD_SETTINGS_ITEM_DRAWER";

  return {
    toggleDrawer: show => dispatch(show
      ? drawerActions.openDrawer({ drawerType: DRAWER_TYPE })
      : drawerActions.closeDrawer()
    ),
    setSubmittedStep: step => dispatch(crafterActions.setSubmittedStep(step)),
    setUIStep: step => dispatch(crafterActions.setUIStep(step)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSettingsItem);
