import { connect } from "react-redux";
import drawerActions from "src/Drawer/redux/drawer/actions";
import addItemActions from "src/GoogleCrafter/redux/addItem/actions";

import AddSettingsItem from "src/GoogleCrafter/components/AddSettingsItem";


const mapStateToProps = ({ drawer, googleCrafter }) => (
  {
    drawerVisibility: drawer.drawerVisibility,
    step: googleCrafter.addItem.step,
    sql: googleCrafter.addItem.sql,
    uploadStatus: googleCrafter.addItem.uploadStatus,
  }
);

function mapDispatchToProps(dispatch) {
  const DRAWER_TYPE = "ADD_SETTINGS_ITEM_DRAWER";

  return {
    toggleDrawer: show => dispatch(show
      ? drawerActions.openDrawer({ drawerType: DRAWER_TYPE })
      : drawerActions.closeDrawer()
    ),

    setStep: step => dispatch(addItemActions.setStep(step)),
    setSql: sql => dispatch(addItemActions.setSql(sql)),
    setFormData: data => dispatch(addItemActions.setFormData(data)),
    uploadToServer: () => dispatch(addItemActions.uploadToServer()),
    resetSteps: () => dispatch(addItemActions.resetAll()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSettingsItem);
