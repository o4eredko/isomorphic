import React from "react";

import { connect } from "react-redux";
import crafterActions from "src/GoogleCrafter/redux/actions";

import Scrollbars from "src/utility/customScrollBar";
import { InputSearch } from "src/ui/Input";
import SettingsItem from "src/GoogleCrafter/components/SettingsItem";

import { SettingsListStyles } from "src/GoogleCrafter/css/GoogleCrafter.styles";


function SettingsList(
  {
    settings,
    selectedSettingsItem,
    selectSettingsItem,
    deleteSettingsItem,
  }) {
  const [search, setSearch] = React.useState("");

  return (
    <SettingsListStyles>
      <InputSearch
        placeholder="Search Generations"
        className="isoSearchNotes"
        value={ search }
        onChange={ event => setSearch(event.target.value.toLowerCase()) }
      />
      <div className="isoNoteList">
        <Scrollbars style={ { height: "calc(100vh - 70px)" } }>
          { settings.map(item =>
            <SettingsItem
              key={ item.id }
              hidden={ search && !item.name.toLowerCase().includes(search) }
              { ...item }
              isActiveItem={ selectedSettingsItem === item }
              onClick={ () => selectSettingsItem(item) }
              onDelete={ () => deleteSettingsItem(item.id) }
            />
          ) }
        </Scrollbars>
      </div>
    </SettingsListStyles>
  )
}

const mapStateToProps = state => {
  const { settings, selectedSettingsItem } = state.googleCrafter;
  return { settings, selectedSettingsItem };
};

const mapDispatchToProps = dispatch => ({
  selectSettingsItem: item => dispatch(crafterActions.selectSettingsItem(item)),
  deleteSettingsItem: id => dispatch(crafterActions.deleteSettingsItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsList);
