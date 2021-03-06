import React from "react";
import { Popconfirm } from "antd";
import Button from "src/ui/Button/";


const NOTE_COLORS = ["#511E78", "#ff9009"];


export default function SettingsItem(
  { id, name, isActiveItem, hidden, onClick, onDelete }
) {
  return (
    <div
      hidden={ hidden }
      key={ id }
      className={ `isoList ${ isActiveItem ? "active" : "" }` }
    >
      <div
        className="isoNoteBGColor"
        style={ { width: "5px", backgroundColor: NOTE_COLORS[+isActiveItem] } }
      />
      <div className="isoNoteText" onClick={ onClick }>
        <h3>{ name }</h3>
      </div>
      <Popconfirm
        placement="right"
        title="Are you sure?"
        okText="Do it!"
        cancelText="No"
        onConfirm={ onDelete }
      >
        <Button className="isoDeleteBtn" icon="close" type="default" />
      </Popconfirm>
    </div>
  );
};