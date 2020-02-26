import React from "react";
import Scrollbars from "src/components/utility/customScrollBar";
import { connect } from "react-redux";
import { InputSearch } from "src/components/uielements/input";
import { SettingsListWrapper } from "src/containers/GoogleCrafter/GoogleCrafter.styles";
import SettingsItem from "src/containers/GoogleCrafter/SettingsList/SettingsItem";
import actions from "src/redux/googleCrafter/actions";
import Button from "src/components/uielements/button";
import Form from "src/components/uielements/form";


function SettingsList(
  {
    settings,
    selectedId,
    selectSettingsItem,
    deleteSettingsItem,
  }) {
  const [search, setSearch] = React.useState("");

  return (
    <SettingsListWrapper className="isoNoteListWrapper">
      <Form>
        <InputSearch
          placeholder="Search Generations"
          className="isoSearchNotes"
          value={ search }
          onChange={ event => setSearch(event.target.value.toLowerCase()) }
        />
        <Button block type="primary" icon="plus" onClick={ () => {
        } }>
          Add settings item
        </Button>
      </Form>
      <div className="isoNoteList">
        { settings.length ? (
          <Scrollbars style={ { height: "calc(100vh - 70px)" } }>
            { settings.map(item =>
              <SettingsItem
                key={ item.id }
                hidden={ search && !item.name.toLowerCase().includes(search) }
                { ...item }
                isActiveItem={ selectedId === item.id }
                onClick={ () => selectSettingsItem(item.id) }
                onDelete={ () => deleteSettingsItem(item.id) }
              />
            ) }
          </Scrollbars>
        ) : <span className="isoNoResultMsg">No settings found</span> }
      </div>
    </SettingsListWrapper>
  )
}

const mapStateToProps = state => {
  let { settings, selectedId } = state.googleCrafter;
  settings = settings.map(settingsItem => (
    { id: settingsItem.id, name: settingsItem.name }
  ));
  return { settings, selectedId };
};

const mapDispatchToProps = dispatch => ({
    selectSettingsItem: id => dispatch(actions.selectSettingsItem(id)),
    deleteSettingsItem: id => dispatch(actions.deleteSettingsItem(id)),
  })
;

export default connect(mapStateToProps, mapDispatchToProps)(SettingsList);
