import React from "react";

import Scrollbars from "src/utility/customScrollBar";
import { InputSearch } from "src/ui/Input";
import SettingsItem from "src/GoogleCrafter/components/SettingsItem";

import { SettingsListStyles } from "src/GoogleCrafter/css/GoogleCrafter.styles";


const SettingsList = ({
    settingsList, selectedSettingsItem,
    selectSettingsItem, deleteSettingsItem,
  }) => {
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
          { settingsList.map(item =>
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
};


export default SettingsList;