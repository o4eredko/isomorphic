import { connect } from "react-redux";
import drawerActions from "src/Drawer/redux/drawer/actions";
import settingsActions from "src/GoogleCrafter/redux/settings/actions";
import SettingsArea from "src/GoogleCrafter/components/SettingsArea";




const mapStateToProps = (state) => {
  const { selectedSettingsItem } = state.googleCrafter.settings;

  return {
    params: selectedSettingsItem || {},
    drawerVisibility: state.drawer.drawerVisibility,
  };
};


const mapDispatchToProps = (dispatch) => {
  const DRAWER_TYPE = "ADD_SETTINGS_ITEM_DRAWER";

  return {
    toggleDrawer: show => dispatch(show
      ? drawerActions.openDrawer({ drawerType: DRAWER_TYPE })
      : drawerActions.closeDrawer()
    ),
    onChangeValueCell: (key, value) => {
      dispatch(settingsActions.updateSelectedItem(key, value))
    },
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsArea);
