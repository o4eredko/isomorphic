import React from "react";

import { useMutation } from "@apollo/react-hooks";
import { CRAFT_ADS } from "src/FacebookCrafter/gql";

import { message, Drawer } from "antd";
import CodeMirror from "src/ui/CodeMirror";
import SourceForm from "src/FacebookCrafter/components/CraftForm";

import BoxTitle from "src/utility/boxTitle";
import { Wrapper } from "src/GoogleCrafter/css/AddSettingsItem.style";
import { TopBar } from "src/GoogleCrafter/css/AddSettingsItem.style";
import { IconSvg } from "src/GoogleCrafter/IconSvg";
import ArrowIcon from "src/assets/images/icon/04-icon.svg";
import { ContentWrapper } from "src/GoogleCrafter/css/AddSettingsItem.style";


export default function CraftAds({ drawerVisibility, toggleDrawer }) {
  const [csv, setCsv] = React.useState("");

  const [craftAds] = useMutation(CRAFT_ADS);

  async function handleSubmit(formData) {
    formData.csvData = csv;
    console.dir(formData);
    const { data, error } = await craftAds({ variables: formData });
    if (error)
      message.error(JSON.stringify(error, null, 2));
    else
      message.info(JSON.stringify(data, null, 2));
  }

  return (
    <Drawer
      placement="right"
      closable={ false }
      onClose={ () => toggleDrawer(false) }
      visible={ drawerVisibility }
      width={ "60%" }
      destroyOnClose={ false }
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
          Craft Ads
        </TopBar>
        <ContentWrapper style={ { maxHeight: "100%" } }>

          <BoxTitle title="Put your csv data here:" />
          <CodeMirror
            className="small"
            value={ csv }
            onBeforeChange={ (editor, data, value) => setCsv(value) }
          />
          <SourceForm submitCallback={ handleSubmit } />

        </ContentWrapper>
      </Wrapper>
    </Drawer>
  )
}