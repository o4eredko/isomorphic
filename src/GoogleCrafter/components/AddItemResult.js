import React from "react";
import { Result } from "antd";
import Button from "src/ui/Button";
import Hamster from "src/assets/images/hamster.gif";
import { Icon } from "antd";


const MESSAGE = {
  success: "You can generate new campaigns or add one more settings item",
  error: "Cannot upload data to server",
};

export default function AddItemResult({ status, firstStep, resetAll }) {
  if (status === "pending")
    return (
      <Result
        status="pending"
        icon={ <Icon style={ { fontSize: 36 } } type="cloud-upload" /> }
        title="Uploading..."
        extra={ [
          <img key="hamster" src={ Hamster } alt="Skyline" width={ "200px" } />
        ] }
      />
    );

  const successButtons = [
    <Button type="primary" key="generate" icon="rocket">
      Launch generation
    </Button>,
    <Button type="dashed" onClick={ resetAll } key="reset" icon="redo">
      Add new Settings Item
    </Button>
  ];
  const errorButtons = [
    <Button type="dashed" onClick={ firstStep } key="generate" icon="edit">
      Fix values
    </Button>,
    <Button type="danger" onClick={ resetAll } key="reset" icon="redo">
      Start from the beginning
    </Button>
  ];

  return (
    <Result
      status={ status }
      title={ MESSAGE[status] }
      extra={ [...(status === "success" ? successButtons : errorButtons)] }
    />
  )
}
