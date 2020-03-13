import { connect } from "react-redux";

import settingsActions from "src/GoogleCrafter/redux/settings/actions";
import SettingsList from "src/GoogleCrafter/components/SettingsList";


const mapStateToProps = state => {
  const { settingsList, selectedSettingsItem } = state.googleCrafter.settings;
  return { settingsList, selectedSettingsItem };
};

const mapDispatchToProps = dispatch => ({
  selectSettingsItem: item => dispatch(settingsActions.selectSettingsItem(item)),
  deleteSettingsItem: id => dispatch(settingsActions.deleteSettingsItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsList);
